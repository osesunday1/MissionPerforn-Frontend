import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import { Route, Routes,} from 'react-router-dom'
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Home from './components/Home';
import AuthForm from './components/Auth';
import UserData from './components/UserData';

const App = () => {
  return (
    <div className='bg-gradient-to-br from-blue-50 to-white min-h-screen'>
    <ToastContainer position="top-right" autoClose={3000} />
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/auth" element={<AuthForm />} />
      <Route path='me' element={ <UserData />} />
      <Route path='add-task' element={ <TaskForm />} />
      <Route path='view-task' element={ <TaskList />} />
    </Routes>
    </div>
  );
};

export default App;