from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from users.models import CustomUser
from .models import ChatModel
from .serializers import GetChatMessages

# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_chat_messages(request, username):
    try:
        user = CustomUser.objects.get(username=username)
        user_ids = [int(request.user.id), int(user.id)]
        user_ids = sorted(user_ids)
        group_name = f'chat_{user_ids[0]}--{user_ids[1]}'
        group_messages = ChatModel.objects.filter(group_name=group_name)
        print(group_messages)
        serializer = GetChatMessages(group_messages, many=True)
        return Response({"status":"Success", "data":serializer.data})
    except Exception as e:
        return Response({"status":"Error", "data":str(e)})