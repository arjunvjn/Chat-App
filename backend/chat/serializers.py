from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import ChatModel
    
class GetChatMessages(serializers.ModelSerializer):
    
    class Meta:
        model = ChatModel
        fields = ['sender', 'message']