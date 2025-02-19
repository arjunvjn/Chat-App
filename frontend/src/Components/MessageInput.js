import { Button, TextareaAutosize } from "@mui/material";
import { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useParams } from "react-router-dom";

export default function MessageInput() {

    const { username } = useParams();

    const socketURL = "ws://127.0.0.1:8000/ws/chat"

    const [inputValue, setInputValue] = useState('');

    const [socketURLWithQuery, setSocketURLWithQuery] = useState();

    useEffect(()=>{
        let urlWithQuery = socketURL + `?sender=${localStorage.getItem('username')}&receiver=${username}`
        setSocketURLWithQuery(urlWithQuery)
    },[username])

    const { sendMessage, lastMessage, readyState } = useWebSocket(socketURLWithQuery);

    function handleClickSendMessage () { 
        sendMessage(JSON.stringify({"message":inputValue}))
        window.location.reload();
    }

    return (
        <div className="message-input">
            <TextareaAutosize 
                placeholder="Type your message" 
                value={inputValue} 
                onChange={(e)=>setInputValue(e.target.value)}
            />
            <Button onClick={()=> handleClickSendMessage()}
        disabled={readyState !== ReadyState.OPEN}>Send</Button>
        </div>
    )
}