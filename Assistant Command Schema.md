## - Assistant Command Schema (Danh sách những hành động mà AI Assistant được phép yêu cầu hệ thống thực hiện.)

| Assistant Command Schema |
|---|
| ```typescript
type AssistantCommand =
  | {
      type: "GET_SURVEY";
      surveyId: string;
    }
  | {
      type: "LIST_PUBLISHED_SURVEYS";
    }
  | {
      type: "CREATE_SURVEY";
      title: string;
      description?: string;
    }
  | {
      type: "UPDATE_SURVEY";
      surveyId: string;
      title?: string;
      description?: string;
    }
  | {
      type: "ADD_QUESTION";
      surveyId: string;
      text: string;
      questionType: string;
      isRequired: boolean;
    }
  | {
      type: "PUBLISH_SURVEY";
      surveyId: string;
    }
  | {
      type: "CLOSE_SURVEY";
      surveyId: string;
    }
  | {
      type: "GET_SURVEY_RESULTS";
      surveyId: string;
    }
  | {
      type: "GET_FEEDBACK";
      surveyId: string;
    }
  | {
      type: "ANALYZE_FEEDBACK";
      surveyId: string;
    }
  | {
      type: "GET_AI_ANALYSIS";
      surveyId: string;
    }
  | {
      type: "GET_SURVEY_DASHBOARD";
      surveyId?: string;
    }
  | {
      type: "CLARIFY";
      question: string;
      candidates?: string[];
    };


### Validation rules

- `GET_SURVEY`: `surveyId` phải tồn tại.
- `CREATE_SURVEY`: chỉ `RESEARCHER` được sử dụng.
- `UPDATE_SURVEY`: chỉ `RESEARCHER` được sử dụng và Survey phải ở trạng thái `DRAFT`.
- `ADD_QUESTION`: chỉ `RESEARCHER` được sử dụng và Survey phải ở trạng thái `DRAFT`.
- `PUBLISH_SURVEY`: Survey phải ở trạng thái `DRAFT` và có ít nhất một Question.
- `CLOSE_SURVEY`: Survey phải ở trạng thái `PUBLISHED`.
- `GET_SURVEY_RESULTS`: chỉ `MANAGER` được sử dụng.
- `GET_FEEDBACK`: chỉ `MANAGER` được sử dụng.
- `ANALYZE_FEEDBACK`: chỉ thực hiện khi Feedback đã được lưu trữ.
- `GET_AI_ANALYSIS`: chỉ `MANAGER` được xem kết quả AI.
- `GET_SURVEY_DASHBOARD`: chỉ `MANAGER` được sử dụng.
- `LIST_PUBLISHED_SURVEYS`: chỉ trả về Survey có trạng thái `PUBLISHED`.
- AI Analysis không được thay đổi `Response` hoặc `Feedback` gốc.
- Command phải kiểm tra quyền ở Backend, không chỉ kiểm tra trên giao diện.
- Unknown/low-confidence intent → `CLARIFY`, không tự đoán hành động quan trọng.