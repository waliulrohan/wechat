import React from 'react';
import './message.css';
const MessageOfMe = ({text}) => {
    return (
        <div className='my-message'>
            <p>{text}</p>
        </div>
    );
};

export default MessageOfMe;