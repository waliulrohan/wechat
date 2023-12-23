import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './components/loginPage/LoginPage';
import MainContainer from './components/maincontainer/MainContainer';
import Welcome from './components/welcome/Welcome';
import Chatarea from './components/chatarea/Chatarea';
import CreateGroup from './components/creategroup/CreateGroup';
import Groups from './components/groups/Groups';
import OnlineUsers from './components/onlineusers/OnlineUsers';
import { createContext, useState } from 'react';
import PrivateOutlet from './components/privateOutlet/PrivateOutlet';


export const MyContext = createContext();


function App() {

const [allUsers,setAllUsers] = useState();


  return (
    <div className="App">

      <MyContext.Provider value={{allUsers,setAllUsers}}>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
      <Route path="/" element={<PrivateOutlet />}>

                <Route exact path="/" element={<MainContainer />}>
          <Route path='' element={<Welcome />} />
          <Route path='chat/:id' element={<Chatarea />} />
          <Route path='create-group' element={<CreateGroup />} />
          <Route path='groups' element={<Groups />} />
          <Route path='online-users' element={<OnlineUsers />} />
        </Route>
        </Route>

      </Routes>
      </MyContext.Provider>

    </div>
  );
}

export default App;




