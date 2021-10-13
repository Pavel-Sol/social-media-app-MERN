import { useContext, useEffect, useState } from 'react';
import axios from 'axios'

import "./messenger.css";
import Topbar from './../../components/topbar/Topbar'
import Conversation from './../../components/conversation/Conversation'
import Message from './../../components/message/Message'
import ChatOnline from './../../components/chatOnline/ChatOnline'
import { AuthContext } from './../../context/AuthContext'

const Messenger = () => {
   const [conversations, setConversations] = useState([])
   const {user} = useContext(AuthContext)

   useEffect(() => {
      const getConversations = async() => {
         try {
            const response = await axios.get(`/conversations/${user?._id}`)
            setConversations(response.data)
         } catch (error) {
            console.log(error.message)
         }
      }
      getConversations()
   },[user?._id])

   return (
      <>
          <Topbar />
          <div className="messenger">
             <div className="chatMenu">
                <div className="chatMenuWrapper">
                  <input placeholder="Найти чат" className="chatMenuInput" />
                  {
                     conversations.map((c)=>{
                        return <Conversation conversation={c} key={c._id} currentUser={user}/>
                     })
                  }
                </div>
             </div>
             <div className="chatBox">
                <div className="chatBoxWrapper">
                   <div className="chatBoxTop">
                      <Message/>
                      <Message own={true}/>
                      <Message/>
                      <Message own={true}/>
                      <Message/>
                      <Message/>
                   </div>
                   <div className="chatBoxBottom">
                     <textarea
                        className="chatMessageInput"
                        placeholder="напишите сообщение..."
                     ></textarea>
                     <button className="chatSubmitButton">
                           Отправить
                     </button>
                   </div>
                </div>
             </div>
             <div className="chatOnline">
                <div className="chatOnlineWrapper">
                   <ChatOnline/>
                   <ChatOnline/>
                   <ChatOnline/>
                </div>
             </div>
          </div>
      </>
   )
}

export default Messenger