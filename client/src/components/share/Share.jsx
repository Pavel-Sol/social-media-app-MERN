import './share.css';
import { PermMedia, Label, Room, EmojiEmotions } from '@material-ui/icons';
import { useState, useContext } from 'react';
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';
const Share = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [desc, setDesc] = useState('')
  const [file, setFile] = useState(null);

  const handleForm = async (e) => {
    e.preventDefault()
    
    const newPost = {
      userId: user._id,
      desc
    };

    // загрузка фото
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }


    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" 
            src={user.profilePicture ? PF + user.profilePicture : `${PF}assets/noAvatar.jpg`} alt="" />
          <input
            type='text'
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder={`${user.username}, поделитесь своими мыслями`} 
            className="shareInput" />
        </div>
        <hr className="shareHr" />
        <form 
          onSubmit={handleForm}
          className="shareBottom">
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }} 
                onChange={(e) => setFile(e.target.files[0])}
                id='file' type="file" accept='.png,.jpeg,.jpg'/>
            </label>
            <div className="shareOption">
              <Label className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button type='submit' className="shareButton">Share</button>
        </form>
      </div>
    </div>
  );
};

export default Share;
