from django.urls import path
from .views import SubmitResponseView

urlpatterns = [
    path('submit/<uuid:survey_id>/', SubmitResponseView.as_view(), name='response-submit'),
]
