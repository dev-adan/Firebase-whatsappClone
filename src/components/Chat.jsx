import { Avatar, Icon, IconButton, Menu, MenuItem } from '@mui/material';
import React,{useState} from 'react'
import { useParams } from 'react-router-dom'
import useRoom from '../hooks/useRooms'
import { useNavigate } from 'react-router-dom';
import { AddPhotoAlternate, ArrowBack, MoreVert } from '@mui/icons-material';
import ChatMessages from './ChatMessages'
import ChatFooter from './ChatFooter'
import MediaPreview from './MediaPreview'
import './Chat.css'

const Chat = ({user,page}) => {
   const {roomId} = useParams();
    const room = useRoom(roomId,user.uid);
   const navigate= useNavigate();

   const [image,setImage] = useState(null);
   const [src,setSrc] = useState('')
    
  return (
  
    <div className="chat">
      <div style={{ height: page.height }} className="chat__background" />

      <div className="chat__header">
        {page.isMobile && (
          <IconButton onClick={navigate('/')}>
            <ArrowBack />
          </IconButton>
        )}

        <div className="avatar__container">
          <Avatar src={room?.photoURL} />
        </div>

        <div className="chat__header--info">
          <h3 style={{ width: page.isMobile && page.width - 165 }}>
            {room?.name}
          </h3>
        </div>

        <div className="chat__header--right">
          <input
            id="image"
            style={{ display: "none" }}
            accept="image/*"
            type="file"
           
          />
          <IconButton>
            <label style={{ cursor: "pointer", height: 24 }} htmlFor="image">
              <AddPhotoAlternate />
            </label>
          </IconButton>
          <IconButton onClick={(event) => setOpenMenu(event.currentTarget)}>
            <MoreVert />
          </IconButton>
          <Menu
            id="menu"
            keepMounted
            open={false}
          >
            <MenuItem>Delete Room</MenuItem>
          </Menu>
        </div>
      </div>

      <div className="chat__body--container">
        <div className="chat__body" style={{ height: page.height - 68 }}>
          <ChatMessages/>
        </div>
      </div>

      <MediaPreview/>

      <ChatFooter/>
    </div>
  )
}

export default Chat