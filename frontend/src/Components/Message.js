import React from "react";

export default function Message({text, isSent}) {
    return (
        <div className={`message ${isSent ? 'sent' : 'recieved'}`}>
            <div className="message-bubble">{text}</div>
        </div>
    )
}