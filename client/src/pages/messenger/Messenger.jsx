import { useContext, useEffect, useState, useRef} from 'react';
import axios from 'axios'

import "./messenger.css";
import Topbar from './../../components/topbar/Topbar'
import Conversation from './../../components/conversation/Conversation'
import Message from './../../components/message/Message'
import ChatOnline from './../../components/chatOnline/ChatOnline'
import { AuthContext } from './../../context/AuthContext'
import {useInput} from './../../hooks/useInput'

const Messenger = () => {
   const [conversations, setConversations] = useState([])
   const [currentChat, setCurrentChat] = useState(null)
   const [messages, setMessages] = useState([])
   const newMessage = useInput('')
   const {user} = useContext(AuthContext)
   const scrollRef = useRef();


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
         } catch (error) {
            console.log(error)
         }
      }
      getMessages()
   },[currentChat])

   useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

   const handleSubmit = async () => {
      const message = {
         text: newMessage.value,
         sender: user._id,
         conversationId: currentChat._id
      }

      try {
         const res = await axios.post("/messages", message);
         setMessages([...messages, res.data]);
         newMessage.reset()
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <>
          <Topbar />
          <div className="messenger">
             <div className="chatMenu">
                <div className="chatMenuWrapper">
                  <input placeholder="?????????? ??????" className="chatMenuInput" />
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
                              return <div key={m._id} ref={scrollRef}>
                                 <Message message={m} own={m.sender === user._id}/>
                              </div>
                           })
                           : <div>?????? ??????????????????</div>
                        }
                     </div>
                     <div className="chatBoxBottom">
                        <textarea
                           value={newMessage.value}
                           onChange={newMessage.onChange}
                           className="chatMessageInput"
                           placeholder="???????????????? ??????????????????..."
                        ></textarea>
                        <button 
                           className="chatSubmitButton"
                           onClick={handleSubmit}>
                              ??????????????????
                        </button>
                     </div>
                   </>
                   : <div>?????????????? ??????</div>
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