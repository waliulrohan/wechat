import React, { useContext, useEffect, useRef, useState } from 'react';
import '../mystyle.css'
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MessageOfOthers from '../messages/MessageOfOthers';
import MessageOfMe from '../messages/MessageOfMe';
import { useParams } from 'react-router-dom';
import { MyContext } from '../../App';
import io from "socket.io-client";


const ENDPOINT = "http://localhost:5000";


var socket;
function Chatarea(props) {
const [sent , setSent] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [theConv, settheConv] = useState();
  const theConvId = useRef(null);

  const myId = sessionStorage.getItem("myId");
  const { id } = useParams();
  const [noConv, setNoConv] = useState(true);

  const { allUsers, setAllUsers } = useContext(MyContext);

  const [convUser, setConvUser] = useState(null);

  async function findUser() {
    const foundedUser = allUsers.find(user => user._id === id);
    setConvUser(foundedUser);
  }

  useEffect(() => {
    if (allUsers && allUsers.length > 0) {
      findUser();
    }
  }, [id, conversation]);


  async function fetchData() {
    if (conversation && id && myId) {
      let zzzConversation = conversation.find(
        (z) =>
          (z.creator.id === myId && z.participant.id === id) ||
          (z.creator.id === id && z.participant.id === myId)
      );
      if (zzzConversation) {
        settheConv(zzzConversation);
        theConvId.current = zzzConversation._id; // Update the value using useRef

        setNoConv(false);
      } else {
        setNoConv(true);

      }
    } else {

    }
  }

  useEffect(() => {
    async function fetchAllConversation() {
      const response = await fetch('http://localhost:5000/inbox/allConversations');
      const data = await response.json();
      setConversation(data);

    }

    if (id) {
      fetchAllConversation();
    }
  }, [id]);


  useEffect(() => {
    if (conversation && id && myId) {
      fetchData();
    }


  }, [conversation, id]);
  


  const token = sessionStorage.getItem('token')






  function createConversation() {


    if (noConv) {
      fetch('http://localhost:5000/inbox/conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          participant: convUser.name,
          id: convUser._id,
          token: token,
        }),
      }).then(res => res.json()).then(data => {

        window.location.reload();
      });
    }


  }


  // sending message 

  const [message, setMessage] = useState("");


  function getInputText() {
    let value = document.getElementById('message-input').value;
    setMessage(value);

  }

  function sendMessage() {

    const receiverName = convUser.name;
    const receiverId = convUser._id;
    if (message && theConv) {
    const conversationId = theConv._id;

      fetch('http://localhost:5000/inbox/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: token,
          message,
          receiverId,
          receiverName,
          conversationId

        }),
      }).then(res => res.json()).then(data => {
        document.getElementById('message-input').value = "";
        setMessage("")
         setSent(false)


      });
    } else {

      alert('please write something')
    }  
    
  }  
  
  
  
  // socket connect
  
  useEffect(()=>{
    socket = io(ENDPOINT);
 
  
  },[])
  
  



  // getMessages
const [allMessages , setAllMessages] =  useState({});  
const [messagesFeched,setMessagesFeched] = useState(false);
const [chats ,setChats] = useState([])

useEffect(()=>{
  setMessagesFeched(false)
},[id]);  

  useEffect(() => {


  
      if (!noConv) {
            const conversationId = theConvId.current;
        fetch(`http://localhost:5000/inbox/allMessages`, {  
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },  
          body: JSON.stringify({
            token: token,
                 
            conversationId,



          }),  
        }).then(res => res.json()).then(data => {
                setAllMessages(data)
                  setChats(data.data.messages)
                setMessagesFeched(true);
   


        });  
      }    

  }, [theConv])   

  useEffect(() => {
    const handleSumit = (data) => {
      if (theConvId.current && data.message.conversationId === theConvId.current) {
        setChats((prevChats) => [...prevChats, data.message]);
        setSent(true);
  
        const messagesContainer = document.getElementById("messages-container");
        if (messagesContainer && sent === true) {
          messagesContainer.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }
    };
  
    socket.on("sumit", handleSumit);
  
    return () => {
      socket.off("sumit", handleSumit);
    };
  }, [theConvId.current, sent]);
  
  

// always scroll to bottom
useEffect(()=>{
    const messagesContainer = document.getElementById("messages-container");
  if (messagesContainer) {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

},[chats])









  if (!convUser) {
    return <div className='loading'>
      <h2>Loading.....</h2>
    </div>
  }






  return (
    <div className='chatarea-container'>

      <div className="chatarea-header">
        <div className='conversation-container'>
          <p className="con-icon">{convUser.name[0]}</p>
          <p className="con-title">{convUser.name}</p>
          <p className="con-last-message">{convUser.email}</p>
        </div>
      </div>


      {noConv ?
        <div className='loading'>
          <h2>There is no conversation with this person</h2>

          <button className="startConv" onClick={() => { createConversation() }} >Start Chat</button>


        </div>
        :
        <>
          <div id='messages-container' className="messages-container">

            {
                messagesFeched ?

                
                            chats.length > 0 ?
                  chats.map(mess =>{
                    if(mess.sender.id === myId){
                      return <MessageOfMe text={mess.text}></MessageOfMe>
                    }else if(mess.sender.id === id){
                      return <MessageOfOthers text={mess.text} ></MessageOfOthers>
                    }
                  })
                  :"no message"
                
                :"loading..."

            }


          </div>


          <div className="text-input-area">
            <textarea type="text" id='message-input' placeholder='Type a message' onBlur={() => getInputText()} />
            <IconButton onClick={() => sendMessage()} >
              <SendIcon></SendIcon>
            </IconButton>
          </div>
        </>



      }

    </div>
  );
}

export default Chatarea;