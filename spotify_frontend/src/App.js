import './App.css';
import {BrowserRouter, Routes, Route, Link, Navigate} from "react-router-dom";
import LoginComponent from "./routes/Login";
import SignupComponent from "./routes/Signup";
import HomeComponent from "./routes/Home";
import LoggedInHome from "./routes/LoggedInHome";
import UploadSong from "./routes/UploadSong";
import { useCookies } from 'react-cookie';
import Mymusic from './routes/Mymusic';
import songContext from './contexts/songContext';
import { useState } from 'react';
function App() {
  const [cookie, setCookie] = useCookies(["token"]);
  const [currentSong, setCurrentSong]=useState(null);
  console.log(cookie.token);
  return (
    <div className='w-screen h-screen font-poppins'>
    <BrowserRouter>
      {cookie.token ?(
        <songContext.Provider value={{currentSong, setCurrentSong}}>
          <Routes>
          <Route 
            path="/home" 
            element={<LoggedInHome />} 
          />
          <Route 
            path="/uploadsong" 
            element={<UploadSong />} 
          />
          <Route 
            path="/mymusic" 
            element={<Mymusic />} 
          />
          <Route 
            path="*" 
            element={<Navigate to ="/home"/>} 
          />
          
        </Routes>
        </songContext.Provider>
        ):(
          <Routes>
          <Route
            path="/login"
            element={<LoginComponent/>} 
          />
          <Route 
            path="/signup" 
            element={<SignupComponent/>} 
          />
          <Route 
            path="/home" 
            element={<HomeComponent />} 
          />
          <Route 
            path="*" 
            element={<Navigate to ="/login" />} 
          />
        </Routes>
      )
    }
    </BrowserRouter>
    </div>
  );
}

export default App;
