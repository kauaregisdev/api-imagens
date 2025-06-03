from django.http import FileResponse, Http404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Image
from .serializers import ImageSerializer

# ignorar erros de tipagem
class ImageViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ImageSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return Image.objects.all()

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

    def update(self, request, id, *args, **kwargs):
        try:
            image = Image.objects.get(id=id)
        except Image.DoesNotExist:
            return Response({'error': 'Image not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(image, data=request.data, partial=True)
        if serializer.is_valid():
            if 'title' in serializer.validated_data:
                image.title = serializer.validated_data['title']
            if 'description' in serializer.validated_data:
                image.description = serializer.validated_data['description']
            if 'image' in request.FILES:
                image.image.replace(request.FILES['image'])
            image.save()
            return Response(ImageSerializer(image).data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, *args, **kwargs):
        image = self.get_object()
        image.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ImageDownloadView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, id):
        try:
            image = Image.objects.get(id=id)
        except Image.DoesNotExist:
            raise Http404('Image not found')
        
        if not image.image:
            raise Http404('No file associated with this image')
        
        return FileResponse(image.image, as_attachment=True, filename=f'{image.title}.jpg')