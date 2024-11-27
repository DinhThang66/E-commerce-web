import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './page/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Collection from './page/Collection';
import SearchBar from './components/SearchBar';
import Product from './page/Product';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './page/Cart';
import PlaceOrder from './page/PlaceOrder';
import Orders from './page/Orders';
import Login from './page/Login';
import About from './page/About';
import Contact from './page/Contact';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn về đầu trang khi đường dẫn thay đổi
  }, [pathname]);

  return null; // Component này không render gì cả
};

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/collection' element={<Collection />}/>
        <Route path='/product/:productId' element={<Product />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/place-order' element={<PlaceOrder />}/>
        <Route path='/orders' element={<Orders />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/contact' element={<Contact />}/>

      </Routes>
      <Footer />
    </div>
  );
};

export default App;