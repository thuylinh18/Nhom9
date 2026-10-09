import json
import logging
import urllib.request
import urllib.error
from typing import Any, Dict, List, Optional
from django.conf import settings

logger = logging.getLogger(__name__)


class GeminiAIError(Exception):
    """Custom exception raised when Gemini API call or validation fails."""
    pass


def build_analysis_prompt(feedbacks: List[Dict[str, str]]) -> str:
    """
    Constructs the prompt adhering to AI Feature Specification (Section 5 & 6).
    Enforces strict JSON schema, factual accuracy, and no hallucinations.
    """
    feedbacks_formatted = json.dumps(
        [{"id": f.get("id", str(idx + 1)), "text": f.get("text", "")} for idx, f in enumerate(feedbacks)],
        ensure_ascii=False,
        indent=2
    )

    prompt = f"""
Bạn là chuyên gia phân tích phản hồi khách hàng (AI Customer Feedback Analyst) của nền tảng InsightFlow.

Dữ liệu đầu vào gồm {len(feedbacks)} phản hồi của khách hàng:
{feedbacks_formatted}

NHIỆM VỤ CỦA BẠN (Tuân thủ nghiêm ngặt theo đặc tả AI Feature Specification):
1. Phân loại cảm xúc của từng phản hồi thành một trong ba nhãn: "positive", "neutral", "negative".
2. Đếm số lượng phản hồi cho từng nhóm cảm xúc: positive, neutral, negative.
3. Xác định cảm xúc chủ đạo (dominant_sentiment): Chọn chính xác một trong ba giá trị: "Positive", "Neutral", "Negative".
4. Nhận diện các chủ đề chính (topics) xuất hiện trong phản hồi (ví dụ: "Dịch vụ khách hàng", "Thời gian chờ", "Thái độ nhân viên", "Chất lượng sản phẩm", "Giá cả", "Hỗ trợ kỹ thuật"...) kèm số lần xuất hiện (count >= 1).
5. Viết một đoạn tóm tắt ngắn gọn (summary) bằng tiếng Việt (từ 2 đến 4 câu) phản ánh trung thực ý kiến, điểm tích cực, vấn đề cần cải thiện từ phản hồi thực tế.

QUY TẮC BẢO TOÀN DỮ LIỆU & AN TOÀN:
- CHỈ phân tích dữ liệu phản hồi được cung cấp ở trên.
- KHÔNG bịa đặt sự kiện, số liệu hoặc chủ đề không có trong dữ liệu.
- KHÔNG thay đổi hoặc chỉnh sửa nội dung phản hồi gốc.

ĐỊNH DẠNG ĐẦU RA BẮT BUỘC (DUY NHẤT một chuỗi JSON hợp lệ, không kèm markdown thừa):
{{
  "feedback_count": {len(feedbacks)},
  "sentiment_distribution": {{
    "positive": 0,
    "neutral": 0,
    "negative": 0
  }},
  "dominant_sentiment": "Positive",
  "topics": [
    {{"name": "Tên chủ đề", "count": 1}}
  ],
  "summary": "Bản tóm tắt phản hồi khách hàng..."
}}
"""
    return prompt.strip()


def validate_gemini_output(data: Dict[str, Any], expected_count: int) -> Dict[str, Any]:
    """
    Validates AI output against AI Feature Specification (Section 6 & 7).
    Ensures correct types, valid bounds, consistency, and extracts breakdown percentages.
    """
    if not isinstance(data, dict):
        raise GeminiAIError("Output must be a JSON object.")

    # 1. Check sentiment_distribution
    sentiment_dist = data.get("sentiment_distribution", {})
    if not isinstance(sentiment_dist, dict):
        raise GeminiAIError("sentiment_distribution must be an object.")

    pos = int(sentiment_dist.get("positive", 0))
    neu = int(sentiment_dist.get("neutral", 0))
    neg = int(sentiment_dist.get("negative", 0))

    if pos < 0 or neu < 0 or neg < 0:
        raise GeminiAIError("Sentiment counts must be non-negative integers.")

    total_sentiment = pos + neu + neg
    if total_sentiment == 0:
        # Avoid division by zero, normalize to expected count
        pos, neu, neg = 0, expected_count, 0
        total_sentiment = expected_count

    # Compute percentages
    pos_pct = round((pos / total_sentiment) * 100)
    neg_pct = round((neg / total_sentiment) * 100)
    neu_pct = max(0, 100 - (pos_pct + neg_pct))

    # 2. Check dominant_sentiment
    dominant = str(data.get("dominant_sentiment", "")).strip()
    dominant_lower = dominant.lower()
    if "pos" in dominant_lower:
        dominant_norm = "Positive"
    elif "neg" in dominant_lower:
        dominant_norm = "Negative"
    else:
        dominant_norm = "Neutral"

    # Fallback dominant check based on highest count if ambiguous
    if pos > neg and pos >= neu:
        dominant_norm = "Positive"
    elif neg > pos and neg >= neu:
        dominant_norm = "Negative"
    elif neu > pos and neu > neg:
        dominant_norm = "Neutral"

    # 3. Check topics
    raw_topics = data.get("topics", [])
    topics_list = []
    if isinstance(raw_topics, list):
        for item in raw_topics:
            if isinstance(item, dict) and "name" in item:
                name = str(item["name"]).strip()
                if name:
                    topics_list.append(name)
            elif isinstance(item, str) and item.strip():
                topics_list.append(item.strip())

    if not topics_list:
        topics_list = ["Chất lượng dịch vụ"]

    # 4. Check summary
    summary = str(data.get("summary", "")).strip()
    if not summary:
        summary = f"Tổng hợp {expected_count} phản hồi: Các ý kiến thảo luận chính xoay quanh {', '.join(topics_list)}."

    return {
        "feedback_count": expected_count,
        "sentiment_distribution": {
            "positive": pos,
            "neutral": neu,
            "negative": neg,
        },
        "sentiment_breakdown": {
            "positive": pos_pct,
            "neutral": neu_pct,
            "negative": neg_pct,
        },
        "dominant_sentiment": dominant_norm,
        "topics": topics_list,
        "summary": summary,
    }


def call_gemini_api(feedbacks: List[Dict[str, str]]) -> Dict[str, Any]:
    """
    Sends feedbacks to Google Gemini AI via REST API.
    Returns validated structured results according to AI Feature Specification.
    """
    api_key = getattr(settings, "GEMINI_API_KEY", "")
    if not api_key:
        raise GeminiAIError("GEMINI_API_KEY is not configured in backend settings.")

    models_to_try = [
        getattr(settings, "GEMINI_MODEL", "gemini-3.5-flash"),
        "gemini-3.7-flash",
    ]
    # Remove duplicates preserving order
    models_to_try = list(dict.fromkeys(models_to_try))

    prompt = build_analysis_prompt(feedbacks)
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "responseMimeType": "application/json",
            "temperature": 0.1,
        },
    }
    encoded_payload = json.dumps(payload).encode("utf-8")
    timeout = getattr(settings, "GEMINI_TIMEOUT_SECONDS", 8)

    last_error: Optional[Exception] = None

    for model_name in models_to_try:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={api_key}"
        req = urllib.request.Request(
            url,
            data=encoded_payload,
            headers={"Content-Type": "application/json"}
        )

        try:
            with urllib.request.urlopen(req, timeout=timeout) as response:
                body = json.loads(response.read().decode("utf-8"))
                candidates = body.get("candidates", [])
                if not candidates:
                    raise GeminiAIError("Gemini returned empty candidates.")
                
                parts = candidates[0].get("content", {}).get("parts", [])
                if not parts:
                    raise GeminiAIError("Gemini returned empty content parts.")
                
                raw_text = parts[0].get("text", "").strip()
                parsed_json = json.loads(raw_text)
                validated = validate_gemini_output(parsed_json, len(feedbacks))
                logger.info(f"Successfully generated AI analysis using model '{model_name}'.")
                return validated
        except urllib.error.HTTPError as e:
            logger.warning(f"Gemini API HTTP {e.code} for model {model_name}: {e.reason}")
            last_error = e
            continue
        except Exception as e:
            logger.warning(f"Gemini API error with model {model_name}: {str(e)}")
            last_error = e
            continue

    raise GeminiAIError(f"All Gemini models failed. Last error: {last_error}")
