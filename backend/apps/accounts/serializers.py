from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User, Role


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'full_name', 'role', 'created_at']
        read_only_fields = ['id', 'created_at']


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'username', 'full_name', 'role']
        read_only_fields = ['id']

    def create(self, validated_data):
        password = validated_data.pop('password')
        role = validated_data.get('role', Role.RESPONDENT)
        user = User.objects.create_user(password=password, **validated_data)
        return user


class UserLoginSerializer(TokenObtainPairSerializer):
    """
    Custom JWT login serializer returning user details alongside access & refresh tokens.
    """
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = {
            'id': str(self.user.id),
            'email': self.user.email,
            'username': self.user.username,
            'full_name': self.user.full_name,
            'role': self.user.role,
        }
        return data


class UserRoleUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for Admin updating user roles.
    """
    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'role']
        read_only_fields = ['id', 'email', 'full_name']



class UserRoleUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for Admin updating user roles.
    """
    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'role']
        read_only_fields = ['id', 'email', 'full_name']



class UserRoleUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for Admin updating user roles.
    """
    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'role']
        read_only_fields = ['id', 'email', 'full_name']

