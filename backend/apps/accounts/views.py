from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .models import User
from .serializers import (
    UserLoginSerializer,
    UserRegistrationSerializer,
    UserSerializer,
)


@extend_schema(tags=['Authentication'])
class RegisterView(generics.CreateAPIView):
    """
    Register a new user with email, password, and designated role (Researcher, Respondent, Manager).
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
