from django.db import models
from users.models import CustomUser

# Create your models here.
class ChatModel(models.Model):
    sender = models.CharField(max_length=150)
    message = models.CharField(max_length=200)
    group_name = models.CharField(max_length=20)

    def __str__(self):
        return self.group_name