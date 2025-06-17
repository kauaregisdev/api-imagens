from django.db.models.signals import post_migrate
from django.contrib.auth import get_user_model
from django.dispatch import receiver

@receiver(post_migrate)
def create_default_admin(sender, **kwargs):
    User = get_user_model()
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'admin123')