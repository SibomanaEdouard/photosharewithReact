import React, { useState, useRef, useEffect} from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom'

import { Sidebar , UserProfile , Login} from '../components';
import Pins from './Pins';
import { userQuery } from '../utils/data';
import { client } from '../client';
import logo from '../assets/logo.png'; 

const Home = () => {
  const [ToogleSidebar , setState] = useState(false);
  const [user, setUser] = useState(null)
  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  useEffect(()=>{
    const query = userQuery(userInfo?.googleId);

    client.fetch(query).then((data) =>{
      setUser(data[0]);
    })
  }, [userInfo?.googleId])
  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out '>
    <div className='hidden md:flex h-screen flex-initial'>
    <Sidebar />
    </div>
    <div className='flex md:hidden flex-row'>
    <HiMenu fontSize={40} className='cursor-pointer' onClick={() => ToogleSidebar(false)}/>
    <Link to='/'>
    <img src={logo} alt="logo" className='w-28' />
    </Link>
    <Link to={`user-profile/${user?._id}`}>
    <img src={user?.image} alt='logo' className='w-28' />
    </Link>
    </div>
    </div>
  )
}

export default Home