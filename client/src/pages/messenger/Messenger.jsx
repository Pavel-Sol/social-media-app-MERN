import "./messenger.css";
import Topbar from './../../components/topbar/Topbar'
import Conversation from './../../components/conversation/Conversation'
import Message from './../../components/message/Message'
import ChatOnline from './../../components/chatOnline/ChatOnline'

const Messenger = () => {
   return (
      <>
          <Topbar />
          <div className="messenger">
             <div className="chatMenu">
                <div className="chatMenuWrapper">
                  <input placeholder="Найти чат" className="chatMenuInput" />
                  <Conversation/>
                  <Conversation/>
                  <Conversation/>
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