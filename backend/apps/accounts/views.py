from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .permissions import IsAdmin
from .models import User
from .serializers import (
    UserLoginSerializer,
    UserRegistrationSerializer,
    UserSerializer,
    UserRoleUpdateSerializer,
)


@extend_schema(tags=['Authentication'])
class RegisterView(generics.CreateAPIView):
    """
    Register a new user with email, password, and designated role (Researcher, Respondent, Manager, Admin).
    """
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]


@extend_schema(tags=['Authentication'])
class LoginView(TokenObtainPairView):
    """
    Authenticate with email and password to receive JWT access and refresh tokens.
    """
    serializer_class = UserLoginSerializer
    permission_classes = [permissions.AllowAny]


@extend_schema(tags=['Authentication'])
class RefreshTokenView(TokenRefreshView):
    """
    Refresh an expired access token using a valid refresh token.
    """
    permission_classes = [permissions.AllowAny]


@extend_schema(tags=['Authentication'])
class CurrentUserView(APIView):
    """
    Retrieve profile and role information for the currently authenticated user.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


@extend_schema(tags=['User Management'])
class UserListView(generics.ListAPIView):
    """
    List all registered users in the system for Admin management (Discovery Spec).
    Supports search and role filtering.
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    def get_queryset(self):
        queryset = User.objects.all().order_by('-created_at')
        role_param = self.request.query_params.get('role')
        search_param = self.request.query_params.get('search')

        if role_param:
            queryset = queryset.filter(role__iexact=role_param)
        if search_param:
            queryset = queryset.filter(email__icontains=search_param) | queryset.filter(full_name__icontains=search_param)

        return queryset


@extend_schema(tags=['User Management'])
class UserAdminDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update role, or delete user account (Discovery Admin Spec).
    """
    queryset = User.objects.all()
    serializer_class = UserRoleUpdateSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]
    lookup_field = 'id'

