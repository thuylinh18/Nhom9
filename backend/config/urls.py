"""
Main URL Configuration for backend.
"""

from django.contrib import admin
from django.urls import include, path
from django.views.generic import RedirectView
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

urlpatterns = [
    # Redirect root path to Swagger UI
    path('', RedirectView.as_view(url='/api/schema/swagger-ui/', permanent=False), name='root-redirect'),

    path('admin/', admin.site.urls),

    # API Documentation (OpenAPI / Swagger)
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

    # API v1 Endpoints
    path('api/v1/auth/', include('apps.accounts.urls')),
    path('api/v1/surveys/', include('apps.surveys.urls')),
    path('api/v1/responses/', include('apps.responses.urls')),
    path('api/v1/', include('apps.analytics.urls')),
]
