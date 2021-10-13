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
   const [currentChat, setCurrentChat] = useState(null)
   const [messages, setMessages] = useState([])
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

   useEffect(() => {
      const getMessages = async () => {
         try {
            const result = await axios.get(`/messages/${currentChat?._id}`)
            setMessages(result.data)
            console.log(result.data)
         } catch (error) {
            console.log(error)
         }
      }
      getMessages()
   },[currentChat])

   return (
      <>
          <Topbar />
          <div className="messenger">
             <div className="chatMenu">
                <div className="chatMenuWrapper">
                  <input placeholder="Найти чат" className="chatMenuInput" />
                  {
                     conversations.map((c)=>{
                        return <div onClick={() => setCurrentChat(c)} key={c._id}>
                           <Conversation conversation={c} currentUser={user}/>
                        </div>
                     })
                  }
                </div>
             </div>
             <div className="chatBox">
                <div className="chatBoxWrapper">
                   {
                     currentChat
                     ? <>
                     <div className="chatBoxTop">
                        {
                           messages.length > 0
                           ? messages.map((m) => {
                              return <Message message={m} key={m._id} own={m.sender === user._id}/>
                           })
                           : <div>нет сообщений</div>
                        }
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
                   </>
                   : <div>начните чат</div>
                   }
                   
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