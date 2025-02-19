from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import ChatModel
import json

class PersonalChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        sender = self.scope['sender']
        reciever = self.scope['receiver']
        user_ids = [int(sender.id), int(reciever.id)]
        user_ids = sorted(user_ids)
        self.room_group_name = f"chat_{user_ids[0]}--{user_ids[1]}"
        self.sender = sender.username
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def receive(self, text_data=None, bytes_data=None):
        print(text_data)
        data = json.loads(text_data)
        message = data['message']
        username = self.sender
        await save_message(username, message, self.room_group_name)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "message":message,
                "username": username
            }
        )

    async def disconnect(self, code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def chat_message(self, event):
        print(event)
        message = event['message']
        username = event['username']
        await self.send(text_data=json.dumps({
            "message": message,
            "username": username
        }))

@database_sync_to_async
def save_message(sender, message, group_name):
    ChatModel.objects.create(sender=sender, message=message, group_name=group_name)