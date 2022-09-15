import React,{useState} from 'react'
import { Avatar,IconButton } from '@mui/material';
import { Add, Home, Message, PeopleAlt } from '@mui/icons-material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import './Sidebar.css'
import { SearchOutlined } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
const Sidebar = ({page,user}) => {

  const [menu,setMenu] = useState(1);

  const SignOut = () => {
    signOut(auth)
  }

  let Nav;
  if(page.isMobile){
    Nav = NavLink;
  }else{
    Nav = props => (
      <div className={`${props.activeClass ? 'sidebar__menu--selected' : ''}`} onClick={props.onClick}>
          {props.children}
      </div>
    )
  }

  return (
    <div className='sidebar' style={{minHeight : page.isMobile ? page.height : 'auto'}}>
      <div className='sidebar__header'>
        <div className='sidebar__header--left'>
          <Avatar src={user?.photoURL}/>
          <h4>{user?.displayName}</h4>
        </div>
          <div className='sidebar__header--right'>
            <IconButton onClick={SignOut}><ExitToAppIcon/></IconButton>
          </div>
          
      </div>

      <div className='sidebar__search'>
        <form className='sidebar__search--container'>
          <SearchOutlined/>
          <input
            placeholder='search for users pr rooms'
            type='text'
            id='search'
          />

        </form>

      </div>

      <div className='sidebar__menu'>
        <Nav to='/chats' onClick={() => setMenu(1)} activeClass={menu === 1} activeClassName='sidebar__menu--selected'>
          <div className='sidebar__menu--home'>
            <Home/>
            <div className='sidebar__menu--line'>

            </div>
          </div>
        </Nav>

        <Nav to='/rooms' onClick={() => setMenu(2)} activeClass={menu === 2} activeClassName='sidebar__menu--selected'>
          <div className='sidebar__menu--rooms'>
            <Message/>
            <div className='sidebar__menu--line'>

            </div>
          </div>
        </Nav>

        <Nav to='/users' onClick={() => setMenu(3)} activeClass={menu === 3} activeClassName='sidebar__menu--selected'>
          <div className='sidebar__menu--users'>
            <PeopleAlt/>
            <div className='sidebar__menu--line'>

            </div>
          </div>
        </Nav>

      </div>

      <div className='sidebar__chat--addRoom'>
      <IconButton>
        <Add/>
      </IconButton>

      </div>


    </div>
  )
}

export default Sidebar