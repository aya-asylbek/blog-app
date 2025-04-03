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
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PostsList;
