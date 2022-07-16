/* eslint-disable import/no-cycle */
import React, { createContext, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Index from './page/Index';
import Compose from './page/Compose';
import 'react-toastify/dist/ReactToastify.css';
import Article from './page/Article';
import Edit from './page/Edit';

export const Context = createContext();

function App() {
  const notify = useMemo(() => (message) => {
    toast.success(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      className: '!text-slate-800',
    });
  }, []);

  return (
    <Context.Provider value={notify}>
      <div className="w-full min-h-screen flex flex-col bg-slate-200 text-slate-800 p-32 font-['Manrope'] tracking-wider">
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/compose" element={<Compose />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/article/:id" element={<Article />} />
          </Routes>
        </Router>
        <ToastContainer />
      </div>
    </Context.Provider>
  );
}

export default App;
