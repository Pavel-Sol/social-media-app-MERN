import "./message.css";
import { format } from "timeago.js";
import React from "react";


const Message = React.memo(
   ({own, message}) => {
    
      return (
         <div className={own ? "message own" : "message"}>
            <div className="messageTop">
               <img className="messageImg" src='https://i02.fotocdn.net/s125/5bd6feab3ff61725/user_xl/2847911616.jpg' alt="" />
               <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
         </div>
      )
   }
)
export default Message