import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PostForm({ onCreatePost }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [sources, setSources] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      setError('Title and Content are required');
      return;
    }

    const newPost = { 
      title,
      content,
      author,
      sources,
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
      
      // Either use callback or redirect
      if (onCreatePost) {
        onCreatePost(createdPost);
      } else {
        navigate('/');
      }

      // Reset form
      setTitle('');
      setContent('');
      setAuthor('');
      setSources('');
      
      setSuccess(true);
      setError('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
      setSuccess(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Post</h2>
      {success && <div className="success">Post created successfully!</div>}
      {error && <div className="error">Error: {error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">
            Title <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">
            Content <span style={{ color: 'red' }}>*</span>
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div className="form-group">
  <label>Source URL:</label>
  <input
    type="url"
    value={formData.sources}
    onChange={(e) => setFormData({...formData, sources: e.target.value})}
    placeholder="https://example.com"
    required
  />
</div>

        <button type="submit" className="submit-button">
          Create Post
        </button>
      </form>
    </div>
  );
}

export default PostForm;