from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Image

class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(max_length=60, required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

class ImageSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=60)
    description = serializers.CharField(max_length=250, allow_blank=True)
    image = serializers.FileField()
    created_at = serializers.DateTimeField(read_only=True)