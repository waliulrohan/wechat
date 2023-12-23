import React from 'react';
import '../mystyle.css'
import { useNavigate } from 'react-router-dom';
const ConversationItem = ({conversations}) => {

    const navigate = useNavigate();

    return (
        <div  onClick={()=>navigate(`chat/${conversations._id}`)}  className='conversation-container'>
            <p className="con-icon">{conversations.name[0]}</p>
            <p className="con-title">{conversations.name}</p>
            <p className="con-last-message">{conversations.email}</p>


        </div>
    );
};

export default ConversationItem;