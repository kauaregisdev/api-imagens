from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ImageViewSet, ImageDownloadView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'images', ImageViewSet, basename='image')

urlpatterns = [
    path('', include(router.urls)),
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('images/<int:id>/download/', ImageDownloadView.as_view(), name='image-download')
]