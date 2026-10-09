from django.urls import path
from .views import (
    CurrentUserView,
    LoginView,
    RefreshTokenView,
    RegisterView,
    UserAdminDetailView,
    UserListView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='auth-register'),
    path('login/', LoginView.as_view(), name='auth-login'),
    path('refresh/', RefreshTokenView.as_view(), name='auth-refresh'),
    path('me/', CurrentUserView.as_view(), name='auth-me'),
    path('users/', UserListView.as_view(), name='auth-user-list'),
    path('users/<uuid:id>/', UserAdminDetailView.as_view(), name='auth-user-detail'),
]
