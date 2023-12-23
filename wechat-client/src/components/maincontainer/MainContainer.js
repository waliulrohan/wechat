import React, { useContext, useEffect, useState } from 'react';
import './main-container.css'
import Sidebar from '../sidebar/Sidebar';
import Welcome from '../welcome/Welcome';
import CreateGroup from '../creategroup/CreateGroup';
import Groups from '../groups/Groups';
import OnlineUsers from '../onlineusers/OnlineUsers';
import { Outlet } from 'react-router-dom';
import { MyContext } from '../../App';

const MainContainer = () => {
    const { allUsers, setAllUsers } = useContext(MyContext);

  const [users,setUsers] = useState([])
  useEffect(()=>{
    fetch("http://localhost:5000/users/allUser")
    .then(res => res.json())
    .then(data => {
        setUsers(data);
        setAllUsers(data)
    })
  },[])

    return (
        <div className='main-container'>
            <Sidebar users={users}></Sidebar>

            <Outlet></Outlet>
            
        </div>
    );
};

export default MainContainer;