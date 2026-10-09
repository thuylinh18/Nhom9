import pytest
from django.urls import reverse
from rest_framework import status
from apps.accounts.models import Role, User
from apps.surveys.models import Question, QuestionType, Survey, SurveyStatus
from apps.responses.models import Answer, Feedback, Response
from apps.analytics.models import AIAnalysisResult, SentimentType
from apps.analytics.services import perform_ai_analysis, get_dashboard_overview, get_survey_results


@pytest.mark.django_db
class TestFunctionalCases:
    """
    Automated Functional Test Suite mapped 1-to-1 to project Functional Test Cases:
    TC-001 through TC-041 (from TESTCASE/Untitled.md) + Admin User Management.
    """

    # -------------------------------------------------------------
    # TC-001 -> TC-005: Authentication & Login
    # -------------------------------------------------------------
    def test_tc001_login_valid_credentials(self, api_client, researcher_user):
        """TC-001: Đăng nhập với thông tin hợp lệ -> 200 OK + JWT tokens"""
        url = reverse('auth-login')
        res = api_client.post(url, {'email': researcher_user.email, 'password': 'testpassword123'}, format='json')
        assert res.status_code == status.HTTP_200_OK
        assert 'access' in res.data
        assert 'refresh' in res.data
        assert res.data['user']['role'] == Role.RESEARCHER

    def test_tc002_login_nonexistent_email(self, api_client):
        """TC-002: Đăng nhập với email không tồn tại -> 401 Unauthorized"""
        url = reverse('auth-login')
        res = api_client.post(url, {'email': 'unknown@example.com', 'password': 'password123'}, format='json')
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    def test_tc003_login_wrong_password(self, api_client, researcher_user):
        """TC-003: Đăng nhập với password sai -> 401 Unauthorized"""
        url = reverse('auth-login')
        res = api_client.post(url, {'email': researcher_user.email, 'password': 'incorrect_password'}, format='json')
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    def test_tc004_login_empty_email(self, api_client):
        """TC-004: Đăng nhập khi bỏ trống Email -> 400 Validation Error"""
        url = reverse('auth-login')
        res = api_client.post(url, {'email': '', 'password': 'testpassword123'}, format='json')
        assert res.status_code == status.HTTP_400_BAD_REQUEST

    def test_tc005_login_empty_password(self, api_client, researcher_user):
        """TC-005: Đăng nhập khi bỏ trống Password -> 400 Validation Error"""
        url = reverse('auth-login')
        res = api_client.post(url, {'email': researcher_user.email, 'password': ''}, format='json')
        assert res.status_code == status.HTTP_400_BAD_REQUEST

    # -------------------------------------------------------------
    # TC-006 -> TC-009: Survey Creation & Editing
    # -------------------------------------------------------------
    def test_tc006_create_survey_success(self, auth_client, researcher_user):
        """TC-006: Researcher tạo survey thành công -> 201 Created, status=DRAFT"""
        client = auth_client(researcher_user)
        url = reverse('survey-list-create')
        res = client.post(url, {'title': 'Customer Feedback Q3', 'description': 'Quarterly feedback'}, format='json')
        assert res.status_code == status.HTTP_201_CREATED
        assert res.data['title'] == 'Customer Feedback Q3'
        assert res.data['status'] == SurveyStatus.DRAFT

    def test_tc007_create_survey_missing_title(self, auth_client, researcher_user):
        """TC-007: Tạo survey thiếu title bắt buộc -> 400 Bad Request"""
        client = auth_client(researcher_user)
        url = reverse('survey-list-create')
        res = client.post(url, {'title': '', 'description': 'No title survey'}, format='json')
        assert res.status_code == status.HTTP_400_BAD_REQUEST

    def test_tc008_edit_survey_before_publish(self, auth_client, researcher_user, sample_survey):
        """TC-008: Chỉnh sửa survey trước Publish -> 200 OK, title được cập nhật"""
        client = auth_client(researcher_user)
        url = reverse('survey-detail', kwargs={'id': sample_survey.id})
        res = client.put(url, {'title': 'Updated Pre-Publish Title', 'description': 'New desc'}, format='json')
        assert res.status_code == status.HTTP_200_OK
        assert res.data['title'] == 'Updated Pre-Publish Title'

    def test_tc009_edit_survey_after_publish_fails(self, auth_client, researcher_user, published_survey):
        """TC-009: Chỉnh sửa survey sau Publish -> 400 Bad Request (BR-001)"""
        client = auth_client(researcher_user)
        url = reverse('survey-detail', kwargs={'id': published_survey.id})
        res = client.put(url, {'title': 'Illegal Edit'}, format='json')
        assert res.status_code == status.HTTP_400_BAD_REQUEST
        assert 'detail' in res.data

    # -------------------------------------------------------------
    # TC-010 -> TC-012: Question Management
    # -------------------------------------------------------------
    def test_tc010_add_question_to_survey(self, auth_client, researcher_user, sample_survey):
        """TC-010: Thêm question vào survey -> 201 Created"""
        client = auth_client(researcher_user)
        url = reverse('question-list-create', kwargs={'survey_id': sample_survey.id})
        payload = {
            'text': 'Overall service rating?',
            'question_type': 'Rating',
            'required': True,
            'order': 3,
        }
        res = client.post(url, payload, format='json')
        assert res.status_code == status.HTTP_201_CREATED
        assert res.data['text'] == 'Overall service rating?'

    def test_tc011_edit_question_in_survey(self, auth_client, researcher_user, sample_survey):
        """TC-011: Chỉnh sửa question trong survey -> 200 OK"""
        client = auth_client(researcher_user)
        q = sample_survey.questions.first()
        url = reverse('question-detail', kwargs={'survey_id': sample_survey.id, 'id': q.id})
        res = client.put(url, {
            'text': 'Updated: How satisfied were you with the response speed?',
            'question_type': q.question_type,
            'required': True,
            'order': 1,
        }, format='json')
        assert res.status_code == status.HTTP_200_OK
        assert res.data['text'] == 'Updated: How satisfied were you with the response speed?'

    def test_tc012_add_question_empty_text_fails(self, auth_client, researcher_user, sample_survey):
        """TC-012: Thêm question để trống nội dung -> 400 Bad Request"""
        client = auth_client(researcher_user)
        url = reverse('question-list-create', kwargs={'survey_id': sample_survey.id})
        res = client.post(url, {'text': '', 'question_type': 'Rating', 'required': False}, format='json')
        assert res.status_code == status.HTTP_400_BAD_REQUEST

    # -------------------------------------------------------------
    # TC-013 -> TC-016: Publish & Close Lifecycle
    # -------------------------------------------------------------
    def test_tc013_publish_survey_success(self, auth_client, researcher_user, sample_survey):
        """TC-013: Publish survey có câu hỏi thành công -> 200 OK, status=PUBLISHED"""
        client = auth_client(researcher_user)
        url = reverse('survey-publish', kwargs={'id': sample_survey.id})
        res = client.post(url)
        assert res.status_code == status.HTTP_200_OK
        assert res.data['status'] == SurveyStatus.PUBLISHED
        assert res.data['published_at'] is not None

    def test_tc014_publish_survey_without_questions_fails(self, auth_client, researcher_user):
        """TC-014: Publish survey chưa có question -> 400 Bad Request (BR-003)"""
        client = auth_client(researcher_user)
        empty_s = Survey.objects.create(title='Empty Survey', creator=researcher_user, status=SurveyStatus.DRAFT)
        url = reverse('survey-publish', kwargs={'id': empty_s.id})
        res = client.post(url)
        assert res.status_code == status.HTTP_400_BAD_REQUEST
        assert 'detail' in res.data

    def test_tc015_close_survey_success(self, auth_client, researcher_user, published_survey):
        """TC-015: Close survey đang hoạt động -> 200 OK, status=CLOSED"""
        client = auth_client(researcher_user)
        url = reverse('survey-close', kwargs={'id': published_survey.id})
        res = client.post(url)
        assert res.status_code == status.HTTP_200_OK
        assert res.data['status'] == SurveyStatus.CLOSED
        assert res.data['closed_at'] is not None

    def test_tc016_answer_closed_survey_rejected(self, auth_client, respondent_user, published_survey):
        """TC-016: Trả lời survey đã Closed -> 400 Bad Request"""
        published_survey.status = SurveyStatus.CLOSED
        published_survey.save()

        client = auth_client(respondent_user)
        url = reverse('survey-submit-response', kwargs={'survey_id': published_survey.id})
        q1 = published_survey.questions.first()
        res = client.post(url, {
            'answers': [{'question_id': str(q1.id), 'rating_value': 4}],
            'feedback_text': 'Attempting on closed survey',
        }, format='json')
        assert res.status_code == status.HTTP_400_BAD_REQUEST

    # -------------------------------------------------------------
    # TC-017 -> TC-024: Respondent Flow & Response Submission
    # -------------------------------------------------------------
    def test_tc017_respondent_view_published_surveys(self, auth_client, respondent_user, published_survey):
        """TC-017: Respondent xem danh sách Published Survey -> 200 OK"""
        client = auth_client(respondent_user)
        url = reverse('survey-available-list')
        res = client.get(url)
        assert res.status_code == status.HTTP_200_OK
        ids = [item['id'] for item in res.data['results']]
        assert str(published_survey.id) in ids

    def test_tc018_respondent_view_survey_detail_with_questions(self, auth_client, respondent_user, published_survey):
        """TC-018: Respondent xem chi tiết survey -> 200 OK, trả về questions"""
        client = auth_client(respondent_user)
        url = reverse('survey-detail', kwargs={'id': published_survey.id})
        res = client.get(url)
        assert res.status_code == status.HTTP_200_OK
        assert res.data['title'] == published_survey.title
        assert len(res.data['questions']) >= 2

    def test_tc019_and_tc021_submit_valid_response(self, auth_client, respondent_user, published_survey):
        """TC-019 & TC-021: Respondent trả lời & Submit response thành công -> 201 Created"""
        client = auth_client(respondent_user)
        url = reverse('survey-submit-response', kwargs={'survey_id': published_survey.id})
        q1, q2 = published_survey.questions.all()[:2]
        payload = {
            'answers': [
                {'question_id': str(q1.id), 'rating_value': 5},
                {'question_id': str(q2.id), 'selected_option': 'Good'},
            ],
            'feedback_text': 'The staff was friendly and the service was fast!',
        }
        res = client.post(url, payload, format='json')
        assert res.status_code == status.HTTP_201_CREATED
        assert res.data['status'] == 'SUBMITTED'

    def test_tc020_submit_missing_required_question(self, auth_client, respondent_user, published_survey):
        """TC-020: Bỏ trống required question -> 400 Bad Request"""
        client = auth_client(respondent_user)
        url = reverse('survey-submit-response', kwargs={'survey_id': published_survey.id})
        q1 = published_survey.questions.first()
        res = client.post(url, {
            'answers': [{'question_id': str(q1.id), 'rating_value': 5}],  # missing q2 which is required
            'feedback_text': 'Missing answers',
        }, format='json')
        assert res.status_code == status.HTTP_400_BAD_REQUEST
        assert 'detail' in res.data

    def test_tc022_submit_response_when_survey_closed(self, auth_client, respondent_user, published_survey):
        """TC-022: Submit response khi survey đã Closed -> 400 Bad Request"""
        published_survey.status = SurveyStatus.CLOSED
        published_survey.save()

        client = auth_client(respondent_user)
        url = reverse('survey-submit-response', kwargs={'survey_id': published_survey.id})
        res = client.post(url, {'answers': [], 'feedback_text': 'Late submit'}, format='json')
        assert res.status_code == status.HTTP_400_BAD_REQUEST

    def test_tc023_and_tc024_response_and_feedback_integrity(self, auth_client, respondent_user, published_survey):
        """TC-023 & TC-024: Tính toàn vẹn dữ liệu (Data Integrity) lưu trữ trong database"""
        client = auth_client(respondent_user)
        url = reverse('survey-submit-response', kwargs={'survey_id': published_survey.id})
        q1, q2 = published_survey.questions.all()[:2]
        feedback_str = 'Reliability test feedback.'
        res = client.post(url, {
            'answers': [
                {'question_id': str(q1.id), 'rating_value': 4},
                {'question_id': str(q2.id), 'selected_option': 'Good'},
            ],
            'feedback_text': feedback_str,
        }, format='json')
        assert res.status_code == status.HTTP_201_CREATED

        # Database queries to verify relational integrity
        saved_resp = Response.objects.get(id=res.data['id'])
        assert saved_resp.survey == published_survey
        assert saved_resp.respondent == respondent_user
        assert saved_resp.answers.count() == 2
        assert Feedback.objects.filter(survey=published_survey, text=feedback_str).exists()

    # -------------------------------------------------------------
    # TC-025 -> TC-028: Manager View Results & Feedback
    # -------------------------------------------------------------
    def test_tc025_manager_view_survey_results(self, auth_client, manager_user, published_survey):
        """TC-025: Manager xem kết quả survey có response -> 200 OK + aggregated stats"""
        q1 = published_survey.questions.first()
        r = Response.objects.create(survey=published_survey, status='SUBMITTED')
        Answer.objects.create(response=r, question=q1, rating_value=4)

        client = auth_client(manager_user)
        url = reverse('survey-results', kwargs={'id': published_survey.id})
        res = client.get(url)
        assert res.status_code == status.HTTP_200_OK
        assert res.data['total_responses'] == 1
        assert res.data['average_rating'] == 4.0

    def test_tc026_manager_view_results_empty_survey_boundary(self, auth_client, manager_user, published_survey):
        """TC-026: Manager xem kết quả survey chưa có response (Boundary: 0 responses) -> 0.0 rating"""
        client = auth_client(manager_user)
        url = reverse('survey-results', kwargs={'id': published_survey.id})
        res = client.get(url)
        assert res.status_code == status.HTTP_200_OK
        assert res.data['total_responses'] == 0
        assert res.data['average_rating'] == 0.0

    def test_tc027_manager_view_feedback_list(self, auth_client, manager_user, published_survey):
        """TC-027: Manager xem danh sách feedback của survey -> 200 OK"""
        r = Response.objects.create(survey=published_survey, status='SUBMITTED')
        Feedback.objects.create(response=r, survey=published_survey, text='Helpful staff')

        client = auth_client(manager_user)
        url = reverse('survey-feedback', kwargs={'id': published_survey.id})
        res = client.get(url)
        assert res.status_code == status.HTTP_200_OK
        assert res.data['total_feedback'] == 1
        assert res.data['feedbacks'][0]['text'] == 'Helpful staff'

    def test_tc028_manager_view_feedback_empty_boundary(self, auth_client, manager_user, published_survey):
        """TC-028: Manager xem feedback khi survey chưa có feedback -> 200 OK, total_feedback=0"""
        client = auth_client(manager_user)
        url = reverse('survey-feedback', kwargs={'id': published_survey.id})
        res = client.get(url)
        assert res.status_code == status.HTTP_200_OK
        assert res.data['total_feedback'] == 0
        assert res.data['feedbacks'] == []

    # -------------------------------------------------------------
    # TC-029 -> TC-036: AI Analysis (Sentiment, Topics, Summary)
    # -------------------------------------------------------------
    def test_tc029_ai_sentiment_positive(self, published_survey):
        """TC-029: AI phân tích sentiment tích cực"""
        r = Response.objects.create(survey=published_survey, status='SUBMITTED')
        Feedback.objects.create(response=r, survey=published_survey, text='The customer service was very helpful and friendly.')
        res = perform_ai_analysis(published_survey)
        assert res.sentiment == SentimentType.POSITIVE
        assert res.sentiment_breakdown['positive'] > 0

    def test_tc030_ai_sentiment_negative(self, published_survey):
        """TC-030: AI phân tích sentiment tiêu cực"""
        r = Response.objects.create(survey=published_survey, status='SUBMITTED')
        Feedback.objects.create(response=r, survey=published_survey, text='The response time was slow and wait was terrible with bad experience.')
        res = perform_ai_analysis(published_survey)
        assert res.sentiment == SentimentType.NEGATIVE
        assert res.sentiment_breakdown['negative'] > 0

    def test_tc031_ai_topic_extraction(self, published_survey):
        """TC-031: AI phân tích topic chính liên quan đến feedback"""
        r = Response.objects.create(survey=published_survey, status='SUBMITTED')
        Feedback.objects.create(response=r, survey=published_survey, text='The waiting time was too long and response was slow.')
        res = perform_ai_analysis(published_survey)
        assert 'Response Time' in res.topics

    def test_tc032_ai_summary_generation_br004_br005(self, published_survey):
        """TC-032: AI tạo summary mà không làm biến đổi nội dung feedback gốc (BR-004, BR-005)"""
        original_text = 'Staff was polite, but response speed needs improvement.'
        r = Response.objects.create(survey=published_survey, status='SUBMITTED')
        fb = Feedback.objects.create(response=r, survey=published_survey, text=original_text)

        res = perform_ai_analysis(published_survey)
        assert len(res.summary) > 0
        # Check original feedback is untouched
        fb.refresh_from_db()
        assert fb.text == original_text

    def test_tc033_ai_handling_zero_feedback_boundary(self, published_survey):
        """TC-033: AI xử lý an toàn khi survey không có feedback (0 feedback)"""
        res = perform_ai_analysis(published_survey)
        assert res.sentiment == SentimentType.NEUTRAL
        assert res.sentiment_breakdown['neutral'] == 100
        assert "No customer feedback has been submitted" in res.summary

    def test_tc034_and_tc035_manager_view_ai_analysis(self, auth_client, manager_user, published_survey):
        """TC-034 & TC-035: Manager xem kết quả AI Analysis -> 200 OK với sentiment, topics, summary"""
        r = Response.objects.create(survey=published_survey, status='SUBMITTED')
        Feedback.objects.create(response=r, survey=published_survey, text='Excellent assistance and very fast delivery.')

        client = auth_client(manager_user)
        url = reverse('survey-ai-analysis', kwargs={'id': published_survey.id})
        res = client.get(url)
        assert res.status_code == status.HTTP_200_OK
        assert 'sentiment' in res.data
        assert 'topics' in res.data
        assert 'summary' in res.data

    def test_tc036_manager_trigger_ai_analysis(self, auth_client, manager_user, published_survey):
        """TC-036: Manager trigger tính toán lại AI Analysis -> 201 Created"""
        r = Response.objects.create(survey=published_survey, status='SUBMITTED')
        Feedback.objects.create(response=r, survey=published_survey, text='Great experience overall!')

        client = auth_client(manager_user)
        url = reverse('survey-ai-analysis', kwargs={'id': published_survey.id})
        res = client.post(url)
        assert res.status_code == status.HTTP_201_CREATED
        assert res.data['sentiment'] == SentimentType.POSITIVE

    # -------------------------------------------------------------
    # TC-037 & TC-038: Dashboard Overview & Consistency
    # -------------------------------------------------------------
    def test_tc037_manager_view_dashboard(self, auth_client, manager_user, published_survey):
        """TC-037: Manager xem Survey Dashboard Overview -> 200 OK"""
        client = auth_client(manager_user)
        url = reverse('dashboard-overview')
        res = client.get(url)
        assert res.status_code == status.HTTP_200_OK
        assert 'total_surveys' in res.data
        assert 'total_responses' in res.data
        assert 'average_rating' in res.data

    def test_tc038_dashboard_data_consistency_on_new_response(self, published_survey, respondent_user):
        """TC-038: Dashboard cập nhật nhất quán khi có response mới (Data Consistency)"""
        m1 = get_dashboard_overview()
        initial_resp_count = m1['total_responses']

        # Add new response
        r = Response.objects.create(survey=published_survey, respondent=respondent_user, status='SUBMITTED')
        q = published_survey.questions.first()
        Answer.objects.create(response=r, question=q, rating_value=5)

        m2 = get_dashboard_overview()
        assert m2['total_responses'] == initial_resp_count + 1

    # -------------------------------------------------------------
    # TC-039 -> TC-041: Role-Based Authorization
    # -------------------------------------------------------------
    def test_tc039_researcher_authorization(self, auth_client, respondent_user, researcher_user):
        """TC-039: Phân quyền Researcher (Researcher tạo được survey, Respondent bị chặn 403)"""
        url = reverse('survey-list-create')
        # Respondent blocked
        res_respondent = auth_client(respondent_user).post(url, {'title': 'Unauthorized'}, format='json')
        assert res_respondent.status_code == status.HTTP_403_FORBIDDEN
        # Researcher allowed
        res_researcher = auth_client(researcher_user).post(url, {'title': 'Authorized'}, format='json')
        assert res_researcher.status_code == status.HTTP_201_CREATED

    def test_tc040_respondent_cannot_access_manager_analytics(self, auth_client, respondent_user, published_survey):
        """TC-040: Phân quyền Respondent (Respondent bị chặn 403 khi truy cập kết quả của Manager)"""
        client = auth_client(respondent_user)
        url_results = reverse('survey-results', kwargs={'id': published_survey.id})
        assert client.get(url_results).status_code == status.HTTP_403_FORBIDDEN

        url_dashboard = reverse('dashboard-overview')
        assert client.get(url_dashboard).status_code == status.HTTP_403_FORBIDDEN

    def test_tc041_manager_cannot_create_surveys(self, auth_client, manager_user):
        """TC-041: Phân quyền Manager (Manager bị chặn 403 khi cố tạo survey)"""
        client = auth_client(manager_user)
        url = reverse('survey-list-create')
        res = client.post(url, {'title': 'Manager Survey'}, format='json')
        assert res.status_code == status.HTTP_403_FORBIDDEN

    # -------------------------------------------------------------
    # Admin User Management
    # -------------------------------------------------------------
    def test_admin_user_crud_management(self, auth_client, admin_user, respondent_user):
        """Admin CRUD User Management: List, Search, Role update, Delete"""
        client = auth_client(admin_user)

        # 1. List users
        url_list = reverse('auth-user-list')
        res_list = client.get(url_list)
        assert res_list.status_code == status.HTTP_200_OK
        users_list = res_list.data.get('results', res_list.data)
        assert len(users_list) >= 1

        # 2. Search users
        res_search = client.get(f"{url_list}?search={respondent_user.email}")
        assert res_search.status_code == status.HTTP_200_OK
        search_results = res_search.data.get('results', res_search.data)
        assert any(u['email'] == respondent_user.email for u in search_results)

        # 3. Update user role
        url_detail = reverse('auth-user-detail', kwargs={'id': respondent_user.id})
        res_patch = client.patch(url_detail, {'role': Role.MANAGER}, format='json')
        assert res_patch.status_code == status.HTTP_200_OK
        assert res_patch.data['role'] == Role.MANAGER

        # 4. Delete user
        res_del = client.delete(url_detail)
        assert res_del.status_code == status.HTTP_204_NO_CONTENT
        assert not User.objects.filter(id=respondent_user.id).exists()
