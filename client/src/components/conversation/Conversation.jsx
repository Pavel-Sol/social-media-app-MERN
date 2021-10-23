import "./conversation.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Conversation = React.memo(
  ({conversation, currentUser}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState(null)
    
    useEffect(() => {
       const friendId = conversation.members.find((m) => m !== currentUser._id);
   
       const getUser = async () => {
         try {
           const res = await axios("/users?userId=" + friendId);
           setUser(res.data);
         } catch (err) {
           console.log(err);
         }
       };
       getUser();
     }, [currentUser, conversation]);
    return(
       <div className="conversation">
          <img className="conversationImg" src={
                     user?.profilePicture
                       ? PF + user.profilePicture
                       : PF + "assets/noAvatar.jpg"
                   } alt="" />
          <span className="conversationName">{user?.username}</span>
       </div>
    )
 }
)

export default Conversation