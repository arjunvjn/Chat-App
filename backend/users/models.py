from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from .managers import CustomUserManager

# Create your models here.
class CustomUser(AbstractBaseUser, PermissionsMixin):
        
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)
    phone_number = models.CharField(max_length=13, unique=True)
    
    USERNAME_FIELD = "username"
    
    objects = CustomUserManager()
    
    def __str__(self):
        return self.username
    