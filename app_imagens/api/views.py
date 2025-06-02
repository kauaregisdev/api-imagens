from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Image
from .serializers import ImageSerializer

class ImageViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

    @action(detail=False, methods=['get'], url_path='random')
    def random_image(self, request):
        image = Image.objects.order_by('?').first()
        if image:
            serializer = self.get_serializer(image)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'detail': 'No images found.'}, status=status.HTTP_404_NOT_FOUND)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            image = Image(
                title=serializer.validated_data['title'],
                description=serializer.validated_data.get('description', ''),
            )
            image.image.put(request.FILES['image'])
            image.save()
            return Response(ImageSerializer(image).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            image = self.get_object()
            image.title = serializer.validated_data['title']
            image.description = serializer.validated_data.get('description', '')
            if 'image' in request.FILES:
                image.image.put(request.FILES['image'])
            image.save()
            return Response(ImageSerializer(image).data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, *args, **kwargs):
        image = self.get_object()
        image.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)