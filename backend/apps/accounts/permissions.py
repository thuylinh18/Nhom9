from rest_framework import permissions
from .models import Role


class IsResearcher(permissions.BasePermission):
    """
    Permission check for Researcher role.
    """
    message = "Only Researchers are authorized to perform this action."

    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role == Role.RESEARCHER
        )


class IsRespondent(permissions.BasePermission):
    """
    Permission check for Respondent role.
    """
    message = "Only Respondents are authorized to perform this action."

    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role == Role.RESPONDENT
        )


class IsManager(permissions.BasePermission):
    """
    Permission check for Manager role.
    """
    message = "Only Managers are authorized to view these results."

    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role == Role.MANAGER
        )


class IsAdmin(permissions.BasePermission):
    """
    Permission check for Admin or Staff user.
    """
    message = "Administrator privileges are required."

    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            (request.user.is_staff or request.user.role == Role.ADMIN)
        )


class IsSurveyOwnerOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to allow only owners of a survey to edit or manage it.
    """
    message = "You do not have permission to modify this survey."

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        # For Survey model
        if hasattr(obj, 'creator'):
            return obj.creator == request.user
        # For Question model
        if hasattr(obj, 'survey'):
            return obj.survey.creator == request.user
        return False
