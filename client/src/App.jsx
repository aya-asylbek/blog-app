import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PostsList from './components/PostsList';  
import EditPost from './components/EditPost';
import PostDetails from './components/PostDetails'; 
import PostForm from './components/PostForm';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostsList />} /> 
        <Route path="/posts/new" element={<PostForm />} />
        <Route path="/posts/:id/edit" element={<EditPost />} />
        <Route path="/posts/:id" element={<PostDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
