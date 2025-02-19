from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from .serializers import CreateUserSerializer, ListUserSerializer, MyTokenObtainPairSerializer
from .models import CustomUser
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated


# Create your views here.
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def createAccount(request):
    try:
        serializer = CreateUserSerializer(data=request.data)
        if serializer.is_valid():
            CustomUser.objects.create_user(**serializer.validated_data)
            return Response({"status":"Success", "data":serializer.data})
        return Response({"status":"Error", "data":serializer.errors})
    except Exception as e:
        return Response({"status":"Error", "data":str(e)})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        refresh_token = request.data["refresh_token"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({"status":"Success", "data":"User is logged out"})
    except Exception as e:
        return Response({"status":"Error", "data":str(e)})
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_users(request):
    try:
        print(request.user)
        get_chat_users = CustomUser.objects.exclude(id=request.user.id)
        serializer = ListUserSerializer(get_chat_users, many=True)
        return Response({"status":"Success", "data":serializer.data})
    except Exception as e:
        return Response({"status":"Error", "data":str(e)})