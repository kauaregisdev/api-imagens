from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ImageViewSet, ImageDownloadView

router = DefaultRouter()
router.register(r'images', ImageViewSet, basename='image')

urlpatterns = [
    path('', include(router.urls)),
    path('images/<int:id>/download/', ImageDownloadView.as_view(), name='image-download')
]