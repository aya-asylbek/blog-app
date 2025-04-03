import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PostForm({ onCreatePost }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    sources: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and Content are required');
      return;
    }

    const newPost = { 
      ...formData,
      date: new Date().toISOString()
    };

    try {
      const response = await fetch('http://localhost:5000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create post');
      }

      const createdPost = await response.json();
      
      if (onCreatePost) {
        onCreatePost(createdPost);
      } else {
        navigate('/');
      }

      // Reset form
      setFormData({
        title: '',
        content: '',
        author: '',
        sources: ''
      });
      
      setSuccess(true);
      setError('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
      setSuccess(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="form-container">
      <h2>Create New Post</h2>
      {success && <div className="success-message">Post created successfully!</div>}
      {error && <div className="error-message">Error: {error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Title <span className="required">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>
            Content <span className="required">*</span>
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Source URL <span className="optional">(optional)</span></label>
          <input
            type="url"
            name="sources"
            value={formData.sources}
            onChange={handleChange}
            placeholder="https://example.com"
            pattern="https?://.*"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Create Post
          </button>
          <button 
            type="button" 
            className="cancel-button"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;