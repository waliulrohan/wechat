import React, { useState } from 'react';
import '../mystyle.css'
import { IconButton } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import YardIcon from '@mui/icons-material/Yard';
import SearchIcon from '@mui/icons-material/Search';
import ConversationItem from '../convervationItem/ConversationItem';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';

// drawer imports
import Drawer from 'react-modern-drawer'
import CloseIcon from '@mui/icons-material/Close';
import 'react-modern-drawer/dist/index.css'


const Sidebar = ({users}) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    const [conversations , setConversations] = useState([
        {
            name:"talukdar",
            lastMessage:"hi how are you?",
            timeStamp:"Today"
        },
        {
            name:"joe",
            lastMessage:"hey bro?",
            timeStamp:"Today"
        },
        {
            name:"martha",
            lastMessage:"good byeeeee?",
            timeStamp:"yesterday"
        },
        {
            name:"Juliet",
            lastMessage:"hmmmmm",
            timeStamp:"1 year ago"
        },
        {
            name:"Hanks",
            lastMessage:"life is like a box of chocolate",
            timeStamp:"001sec ago"
        },
        {
            name:"joe",
            lastMessage:"hey bro?",
            timeStamp:"Today"
        },


        {
            name:"joe",
            lastMessage:"hey bro?",
            timeStamp:"Today"
        },
        {
            name:"joe",
            lastMessage:"hey bro?",
            timeStamp:"Today"
        },
        {
            name:"joe",
            lastMessage:"hey bro?",
            timeStamp:"Today"
        },
        {
            name:"joe",
            lastMessage:"hey bro?",
            timeStamp:"Today"
        },
        {
            name:"joe",
            lastMessage:"hey bro?",
            timeStamp:"Today"
        },
        {
            name:"joe",
            lastMessage:"hey bro?",
            timeStamp:"Today"
        }

    ]);











    return (
        <div className='sidebar-container'>

 {/* drawer
 */}

<Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='left'
                className='bla bla bla'
            >
                <div className='drawer-container'>
                    <IconButton  onClick={toggleDrawer}>
                        <CloseIcon></CloseIcon>
                    </IconButton>

                <div className="drawer-conversations">

                {
                   users.map(conversations => <ConversationItem conversations={conversations} key={conversations._id} ></ConversationItem>)
                }
            </div>
                </div>
            </Drawer>




            <div className='sb-header'> 
                <div>
                    <IconButton className='header-leftside-icons'>
                        <AccountCircleOutlinedIcon></AccountCircleOutlinedIcon>  
                    </IconButton>
                </div>
                <div className='header-rightside-icons'>
                    <div className="users-drawer-btn">
                <IconButton onClick={toggleDrawer} >
                        <PeopleIcon />

                           </IconButton>


                    </div>

                    <IconButton onClick={()=>navigate('groups')}>
                        <GroupAddOutlinedIcon />               
                    </IconButton>

                    <IconButton  onClick={()=>navigate('create-group')}>
                                <AddCircleOutlinedIcon></AddCircleOutlinedIcon>    
                    </IconButton>

                    <IconButton>
                        <YardIcon />                
                    </IconButton>
                </div>
            </div>
            <div className="sb-search">
                <div className="search-icon">
                       <IconButton>
                              <SearchIcon />
                       </IconButton>
                </div>
             
                <input type="text" name="" id="search-input" placeholder='search' />
            </div>

            <div className="sb-conversations">
                {
                   users.map(conversations => <ConversationItem conversations={conversations} key={conversations._id} ></ConversationItem>)
                }
            </div>

        </div>
    );
};

export default Sidebar;