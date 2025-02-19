import { useEffect, useState } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ChatArea() {

    const { username } = useParams();

    const [chatMessageObject, setChatMessageObject] = useState(null);

    // for(let i = 0; i < 1; i++)
    // window.location.reload();

    console.log("username-->", username)

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }

    async function getChatMessages() {
        await axios.get(`http://localhost:8000/chat/${username}`, {
            headers: headers
        }).then((res) => {
            console.log(res)
            setChatMessageObject(res.data.data)
            console.log(chatMessageObject)
        })
            .catch((err) => {
                console.log(err)
                setChatMessageObject(null)
            })
    }

    useEffect(() => {
        if(username !== 'None')
            getChatMessages()
    }, [])

    return (
        <div className="chat-area">
            <div className="chat-header">
                {username !== 'None' && username}
            </div>

            {username !== 'None' && chatMessageObject &&
                <>
                    <div className="messages">
                        {chatMessageObject.length > 0 && chatMessageObject.map((messageObj, index) =>
                        (
                            <Message key={index} text={messageObj.message} isSent={messageObj.sender === localStorage.getItem('username')} />
                        ))}
                    </div>
                    <MessageInput />
                </>
            }
        </div>
    )
}