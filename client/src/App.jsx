import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Index from './page/Index';
import Compose from './page/Compose';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const notifyFinish = () => {
    toast.success('Article published!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      className: '!text-slate-800',
    });
  };
  return (
    <div className="w-full min-h-screen flex flex-col bg-slate-200 text-slate-800 p-32 font-['Manrope'] tracking-wider">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/compose" element={<Compose notifyFinish={notifyFinish} />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
