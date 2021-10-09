import "./message.css";

const Message = ({own}) => {
   return (
      <div className={own ? "message own" : "message"}>
         <div className="messageTop">
            <img className="messageImg" src="https://i05.fotocdn.net/s124/8210e700e43d71f5/gallery_xl/2822506642.jpg" alt="" />
            <p className="messageText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum aliquid voluptate? </p>
         </div>
         <div className="messageBottom">1 час назад</div>
      </div>
   )
}

export default Message