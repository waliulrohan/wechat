import React from 'react';
import './message.css';
const MessageOfOthers = ({text}) => {
    return (
        <div className='others-message'>
            <p>{text}</p>
        </div>
    );
};

export default MessageOfOthers;