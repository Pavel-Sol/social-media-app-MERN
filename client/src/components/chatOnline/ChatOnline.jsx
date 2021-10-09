import "./chatOnline.css";

const ChatOnline = () => {
   return (
      <div className="chatOnline">
         <div className="chatOnlineFriend">
            <div className="chatOnlineImgContainer">
               <img className="chatOnlineImg" src="https://i05.fotocdn.net/s124/8210e700e43d71f5/gallery_xl/2822506642.jpg" alt="" />
               <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">Владимир</span>
         </div>
      </div>
   )
}

export default ChatOnline