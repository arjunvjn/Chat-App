from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import CustomUser

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = {}
        token = super().get_token(user)
        
        # These are claims, you can add custom claims
        token['username'] = user.username
        # ...
        
        return token
    
class CreateUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('__all__')
        
    def validate_phone_number(self, value):
        if not value.isnumeric():
            raise serializers.ValidationError("Phone number must be numeric")
        if len(value) != 10:
            raise serializers.ValidationError("Phone number must be 10 digits")
        return value
    
class ListUserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'phone_number']