from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None and response.data is not None:
        response.data['status_code'] = response.status_code
        response.data['detail'] = response.data.get('detail', 'An error occurred.')
    else:
        response = Response(
            {'error': 'An unexpected error occurred.'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    return response

def bad_request(request, exception):
    return JsonResponse({'error': 'Bad Request', 'message': str(exception)}, status=400)

def forbidden(request, exception):
    return JsonResponse({'error': 'Forbidden', 'message': str(exception)}, status=403)

def not_found(request, exception):
    return JsonResponse({'error': 'Not Found', 'message': str(exception)}, status=404)

def internal_error(request):
    return JsonResponse({'error': 'Internal Server Error', 'message': 'An unexpected error occurred.'}, status=500)