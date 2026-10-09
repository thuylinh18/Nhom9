import pytest
from django.urls import reverse
from rest_framework import status


@pytest.mark.django_db
class TestAuthentication:
    def test_register_user_success(self, api_client):
        url = reverse('auth-register')
        data = {
            'email': 'newuser@example.com',
            'password': 'strongpassword123',
            'role': 'RESEARCHER',
            'full_name': 'New Researcher',
        }
        response = api_client.post(url, data, format='json')
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['email'] == 'newuser@example.com'
        assert response.data['role'] == 'RESEARCHER'

    def test_register_duplicate_email_fails(self, api_client, researcher_user):
        url = reverse('auth-register')
        data = {
            'email': researcher_user.email,
            'password': 'somepassword',
            'role': 'RESPONDENT',
        }
        response = api_client.post(url, data, format='json')
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_login_valid_credentials(self, api_client, researcher_user):
        url = reverse('auth-login')
        data = {
            'email': researcher_user.email,
            'password': 'testpassword123',
        }
        response = api_client.post(url, data, format='json')
        assert response.status_code == status.HTTP_200_OK
        assert 'access' in response.data
        assert 'refresh' in response.data
        assert response.data['user']['role'] == 'RESEARCHER'
        assert response.data['user']['email'] == researcher_user.email

    def test_login_invalid_credentials_rejected(self, api_client, researcher_user):
        url = reverse('auth-login')
        data = {
            'email': researcher_user.email,
            'password': 'wrongpassword',
        }
        response = api_client.post(url, data, format='json')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_get_current_user_profile(self, auth_client, researcher_user):
        client = auth_client(researcher_user)
        url = reverse('auth-me')
        response = client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert response.data['email'] == researcher_user.email
        assert response.data['role'] == 'RESEARCHER'

    def test_unauthenticated_request_rejected(self, api_client):
        url = reverse('auth-me')
        response = api_client.get(url)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_admin_can_list_users(self, auth_client, admin_user):
        client = auth_client(admin_user)
        url = reverse('auth-user-list')
        response = client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) >= 1

    def test_non_admin_cannot_list_users(self, auth_client, researcher_user):
        client = auth_client(researcher_user)
        url = reverse('auth-user-list')
        response = client.get(url)
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_admin_can_update_user_role(self, auth_client, admin_user, respondent_user):
        client = auth_client(admin_user)
        url = reverse('auth-user-detail', kwargs={'id': respondent_user.id})
        response = client.patch(url, {'role': 'RESEARCHER'}, format='json')
        assert response.status_code == status.HTTP_200_OK
        assert response.data['role'] == 'RESEARCHER'

