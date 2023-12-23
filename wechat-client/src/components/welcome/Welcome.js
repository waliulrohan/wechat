import React from 'react';
import '../mystyle.css'
import wechatLogo from '../../assets/wechat-logo.png'
const Welcome = () => {
    return (
        <div className='welcome-container'>
          <img src={wechatLogo} alt="Logo......" />
          <p className="welcome-title">Welcome To Wechat</p>
          <p className="welcome-message">Here You Can Chat with Your Friends</p>
        </div>
    );
};

export default Welcome;