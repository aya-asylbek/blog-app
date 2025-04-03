import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: '',
    content: '',
    author: ''
  });
  const [error, setError] = useState('');

  // Load post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/posts/${id}`);
        if (!response.ok) throw new Error('Post not found');
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchPost();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Update failed');
      }
      
      navigate('/'); // Redirect to posts list
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="edit-container">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost({...post, title: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Content:</label>
          <textarea
            value={post.content}
            onChange={(e) => setPost({...post, content: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Author:</label>
          <input
            type="text"
            value={post.author}
            onChange={(e) => setPost({...post, author: e.target.value})}
          />
        </div>
        
        <button type="submit" className="save-button">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditPost;