from django.urls import path
from . import views

urlpatterns = [
    path('<str:username>', views.get_chat_messages, name='get_chats')
]