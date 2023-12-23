import React, { useState } from 'react';
import './loginPage.css'
import wechatLogo from '../../assets/wechat-logo.png'
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
  

  const navigate = useNavigate()

    const [newUser,setNewUser] = useState(false);
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
     
function handleCreateData(data) {


setNewUser(false)
}
  function handleLogin(){
    if(newUser){
      if (email && name && password) {

        fetch('http://localhost:5000/users/addUser',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
          name: name,
            email:email,
            password:password,
          })
        }).then(res => res.json() ).then(data => handleCreateData(data))


      }else{
            alert("Please give info")
      }
     
    }
  if(!newUser){
    if (email && password) {



      fetch('http://localhost:5000/login', {

        method: 'POST',
        headers: {
          
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then(data => {

          sessionStorage.setItem('myId',data.id)
          sessionStorage.setItem('token',data.token)
           navigate("/")
        })
        .catch(error => {

          alert("There was a problem with your request: " + error.message);
        });
      


    }else{
          alert("Please give info")
    }

  }



  }






    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText('#fff'),
        backgroundColor: '#fff',
        '&:hover': {
          backgroundColor: "#eee",
        },
      }));


    return (
        <div className='login-page-container'>
            <div className="login-sidebar">
                <div>
                     <img className='login-sb-logo' src={wechatLogo} alt="" />
                </div>
                
            </div>

            
            <div className="login-area">
                  <h2>{ !newUser ? "Login To Your Account" : "Create Your Account" }</h2>

                  {
                    newUser ?
                    <TextField
                    id="outlined-textarea"
                    label="Enter Your Name"
                    placeholder="Name"
                    onBlur={(e)=> setName(e.target.value)}
                    multiline
                    required
                    sx={{
    
                    }}
                /> :
                <p></p>

                  }
                  <TextField
                id="outlined-textarea"
                label="Enter Valid Email"
                placeholder="Email"
                multiline
                onBlur={(e)=> setEmail(e.target.value)}
                required
                sx={{

                }}
            />
             <TextField
                id="outlined-textarea"
                label="Enter Your Password"
                placeholder="Password"
                onBlur={(e)=> setPassword(e.target.value)}
                required
                multiline
                sx={{

                }}
            />
            <p id="error"></p>
    

         <button  onClick={()=>handleLogin()} className="login-btn">{!newUser ?"Login":"Create"}</button>
         <button  onClick={()=>setNewUser(!newUser)} className="newUser">{!newUser ? "Don't have a account":"Already have a account"}</button>

            </div>
        </div>
    );
};

export default LoginPage;