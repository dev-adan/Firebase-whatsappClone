import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@mui/material";
import { Add, Home, Message, PeopleAlt } from "@mui/icons-material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/config";
import "./Sidebar.css";
import { SearchOutlined } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import SidebarList from "./SidebarList";

import { Routes, Route } from "react-router-dom";
import {
  addDoc,
  collection,
  serverTimestamp,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import useRooms from "../hooks/useRooms";
import useUsers from "../hooks/useUsers";
import useChats from "../hooks/useChats";

const Sidebar = ({ page, user }) => {
  useEffect(() => {
    //  useChats(user);
  }, []);

  const rooms = useRooms();
  const users = useUsers(user);
  // const chats = useChats(user);

  const [menu, setMenu] = useState(1);
  const [searchResults, setSearchResults] = useState([]);

  const SignOut = () => {
    signOut(auth);
  };

  const createRoom = async () => {
    const roomName = prompt("Type the name of your room");

    if (roomName.trim()) {
      const ref = collection(db, "rooms");

      await addDoc(ref, {
        name: roomName,
        timestamp: serverTimestamp(),
      });
    }
  };

  const searchUsersAndRooms = async (e) => {
    e.preventDefault();
    const queryValue = e.target.elements.search.value;

    const userData = query(
      collection(db, "users"),
      where("name", "==", queryValue)
    );
    const roomData = query(
      collection(db, "rooms"),
      where("name", "==", queryValue)
    );

    const userSnapshot = await getDocs(userData);
    const roomSnapshot = await getDocs(roomData);

    let userResults = [];
    let roomResults = [];

    if (userSnapshot.empty) {
    } else {
      userResults = userSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    }

  

    if (roomSnapshot.empty) {

    } else {
      roomResults = roomSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    }

    const searchResults = [...userResults, ...roomResults];

    setMenu(4);
    setSearchResults(searchResults);
  };

  let Nav;
  if (page.isMobile) {
    Nav = NavLink;
  } else {
    Nav = (props) => (
      <div
        className={`${props.activeClass ? "sidebar__menu--selected" : ""}`}
        onClick={props.onClick}
      >
        {props.children}
      </div>
    );
  }

  return (
    <div
      className="sidebar"
      style={{ minHeight: page.isMobile ? page.height : "auto" }}
    >
      <div className="sidebar__header">
        <div className="sidebar__header--left">
          <Avatar src={user?.photoURL} />
          <h4>{user?.displayName}</h4>
        </div>
        <div className="sidebar__header--right">
          <IconButton onClick={SignOut}>
            <ExitToAppIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <form
          onSubmit={searchUsersAndRooms}
          className="sidebar__search--container"
        >
          <SearchOutlined />
          <input
            placeholder="search for users pr rooms"
            type="text"
            id="search"
          />
        </form>
      </div>

      <div className="sidebar__menu">
        <Nav
          to="/chats"
          onClick={() => setMenu(1)}
          activeClass={menu === 1}
          activeClassName="sidebar__menu--selected"
        >
          <div className="sidebar__menu--home">
            <Home />
            <div className="sidebar__menu--line"></div>
          </div>
        </Nav>

        <Nav
          to="/rooms"
          onClick={() => setMenu(2)}
          activeClass={menu === 2}
          activeClassName="sidebar__menu--selected"
        >
          <div className="sidebar__menu--rooms">
            <Message />
            <div className="sidebar__menu--line"></div>
          </div>
        </Nav>

        <Nav
          to="/users"
          onClick={() => setMenu(3)}
          activeClass={menu === 3}
          activeClassName="sidebar__menu--selected"
        >
          <div className="sidebar__menu--users">
            <PeopleAlt />
            <div className="sidebar__menu--line"></div>
          </div>
        </Nav>
      </div>

      {page.isMobile ? (
        <Routes>
          <Route
            path="/chats"
            element={<SidebarList title="chats" data={[]} />}
          />
          <Route
            path="/rooms"
            element={<SidebarList title="rooms" data={rooms} />}
          />
          <Route
            path="/users"
            element={<SidebarList title="users" data={users} />}
          />
          <Route
            path="/search"
            element={<SidebarList title="search results" data={[]} />}
          />
        </Routes>
      ) : menu === 1 ? (
        <SidebarList title="chats" data={[]} />
      ) : menu == 2 ? (
        <SidebarList title="rooms" data={rooms} />
      ) : menu === 3 ? (
        <SidebarList title="users" data={users} />
      ) : menu === 4 ? (
        <SidebarList title="search results" data={searchResults} />
      ) : null}

      <div className="sidebar__chat--addRoom">
        <IconButton onClick={createRoom}>
          <Add />
        </IconButton>
      </div>
    </div>
  );
};

export default Sidebar;
