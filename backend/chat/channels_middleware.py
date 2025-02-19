from channels.middleware import BaseMiddleware
from django.db import close_old_connections
from channels.db import database_sync_to_async
from users.models import CustomUser

class JWTWebsocketMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        close_old_connections()

        query_string=scope['query_string'].decode('utf-8')
        print(query_string)

        key_val = {query.split('=')[0] : query.split('=')[1] for query in query_string.split('&')}
        print(key_val)

        scope['sender'] = await get_user_id(key_val['sender'])
        scope['receiver'] = await get_user_id(key_val['receiver'])

        if scope['sender'] and scope['receiver']:
            return await super().__call__(scope, receive, send)
        await send({
            "type": "websocket.close",
            "code": 4000
        })
    
@database_sync_to_async
def get_user_id(username):
    try:
        user = CustomUser.objects.get(username=username)
        return user
    except:
        return None