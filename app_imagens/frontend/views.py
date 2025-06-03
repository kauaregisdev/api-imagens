from django.shortcuts import render
import requests

def image_list(request):
    response = requests.post('http://localhost:8000/token', json={'username': 'admin', 'password': 'admin123'})
    data = response.json()
    token = data.get('access')
    headers = {'Authorization': f"Bearer {token}"}
    response = requests.get('http://localhost:8000/api/images/', headers=headers)
    images = response.json()
    return render(request, 'frontend/image_list.html', {'images': images})
