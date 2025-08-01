import { useState } from 'react'
import HomePage from './pages/HomePage';
import { Routes, Route } from 'react-router-dom';

import './App.css'
import ProductCatalog from './pages/ProductCatalog';
import About from './pages/About';
import Testimonials from './pages/Testimonials';
import Inquiry from './pages/Inquiry';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductCatalog />} />
      <Route path="/about" element={<About />} />
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/inquiry" element={<Inquiry />} />
    </Routes>
  );
}

export default App;