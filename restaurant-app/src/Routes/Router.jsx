import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from '../Components/Home/Home';
import Cart from '../Components/Cart/Cart';
import Credential from '../Components/Credential/Credential';
import Confirmation from '../Components/Confirmation/Confirmation';
import NotFount from '../Components/NotFount/NotFount';

function Router() {
  return (
    <div>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="cart" element={<Cart/>}/>
        <Route path="credential" element={<Credential/>}/>
        <Route path="confirmation" element={<Confirmation/>}/>
        <Route path="*" element={<NotFount/>}/>
        </Routes>
    </div>
  )
}

export default Router