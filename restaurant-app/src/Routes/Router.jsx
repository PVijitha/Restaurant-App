import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from '../Components/Home';
import Cart from '../Components/Cart';
import Credential from '../Components/Credential';
import Confirmation from '../Components/Confirmation';
import NotFount from '../Components/NotFount';
import Login from '../Components/Login';

function Router() {
  return (
    <div>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="cart" element={<Cart/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="credential" element={<Credential/>}/>
        <Route path="confirmation" element={<Confirmation/>}/>
        <Route path="*" element={<NotFount/>}/>
        </Routes>
    </div>
  )
}

export default Router