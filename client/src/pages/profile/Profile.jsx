import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';

import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

const Profile = () => {
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {username} = useParams()

  

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      // console.log(res.data)
      setUser(res.data);
    };
    fetchUser();
  }, [username]);


  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture || `${PF}assets/noCover.jpg`}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture || `${PF}assets/noAvatar.jpg`}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username='jhon' />
            <Rightbar user={user}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile