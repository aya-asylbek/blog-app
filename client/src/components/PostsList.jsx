import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const fetchPosts = async () => {
  const response = await fetch('http://localhost:5000/posts');
  const data = await response.json();
  return data;
};

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Delete post
  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`http://localhost:5000/posts/${postId}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Delete failed');
        
        setPosts(posts.filter(post => post.id !== postId));
      } catch (err) {
        setError(err.message);
      }
    }
  };
  
  useEffect(() => {
    const getPostsData = async () => {
      try {
        const postsData = await fetchPosts();
        setPosts(postsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getPostsData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="posts-list">
      <h1>Blog App</h1>
      <Link to="/posts/new" className="create-post-button">
        ➕ Create New Post
      </Link>

      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        <ul>
          {posts.map(post => (
             <li key={post.id} className="post-card">
             <div className="post-header">
               <h3 className="post-title">{post.title}</h3>
               <div className="post-actions">
                 <Link
                   to={`/posts/${post.id}`}
                   className="action-button view-button"
                 >
                   🔍 View
                 </Link>
                 <Link
                   to={`/posts/${post.id}/edit`}
                   className="action-button edit-button"
                 >
                   ✏️ Edit
                 </Link>
                 <button
                   onClick={() => handleDelete(post.id)}
                   className="action-button delete-button"
                 >
                   🗑️ Delete
                 </button>
               </div>
             </div>
             {post.content && (
               <p className="post-preview">
                 {post.content.substring(0, 100)}...
               </p>
             )}
           </li>
         ))}
       </ul>
     )}
   </div>
 );
}

export default PostsList;
