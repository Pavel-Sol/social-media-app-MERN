import "./sidebar.css"
import {
   RssFeed,
   Chat,
   PlayCircleFilledOutlined,
   Group
 } from "@material-ui/icons";
 import { Users } from "../../dummyData";
 import CloseFriend from "./../closeFriend/CloseFriend";


const Sidebar = () => {
   return (
      <div className="sidebar">
        <div className="sidebarWrapper">
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">Лента</span>
            </li>
            <li className="sidebarListItem">
              <Chat className="sidebarIcon" />
              <span className="sidebarListItemText">Мессенджер</span>
            </li>
            <li className="sidebarListItem">
              <PlayCircleFilledOutlined className="sidebarIcon" />
              <span className="sidebarListItemText">Видео</span>
            </li>
            <li className="sidebarListItem">
              <Group className="sidebarIcon" />
              <span className="sidebarListItemText">Группы</span>
            </li>
          </ul>
          <button className="sidebarButton">Показать больше</button>
          <hr className="sidebarHr" />
          <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
        </div>
      </div>
    );
}

export default Sidebar