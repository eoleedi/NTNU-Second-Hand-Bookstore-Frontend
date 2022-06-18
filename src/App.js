import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './pages/home';
import Search from './pages/search';
import ProductDetail from './pages/productdetail';
import Login from "./pages/login";
import Register from "./pages/register";
import Rule from "./pages/rule";
import FAQ from "./pages/FAQ";
import About from './pages/About';
import Contact from './pages/Contact';


function App() {
    
return (
    
    <Router>
        <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/' element={<Home />} />
            <Route path='/products/search/:searchText' element={<Search/>} />
            <Route path='/products/:productId' element={<ProductDetail/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/contact' element={<Contact/>} />
            <Route path='/FAQ' element={<FAQ/>} />
            <Route path='/rules' element={<Rule/>} />
            <Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
        </Routes>
        <Navbar />
    </Router>
    
    
);
}
  
export default App;