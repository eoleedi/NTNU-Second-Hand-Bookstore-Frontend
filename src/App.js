import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './pages/home';
import About from './pages/rule';
import Contact from './pages/FAQ';
import Search from './pages/search';
import ProductDetail from './pages/productdetail';



function App() {
    
return (
    
    <Router>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products/search' element={<Search/>} />
            <Route path='/products/:productId' element={<ProductDetail/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/contact' element={<Contact/>} />
        </Routes>
        <Navbar />
    </Router>
    
    
);
}
  
export default App;