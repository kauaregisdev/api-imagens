from django.urls import path
from .views import *

urlpatterns = [
    path('images/', image_list, name='image-list')
]