import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SentimentIndicator from "./SentimentIndicator"; 

const fetchPost = async (id) => {
  const response = await fetch(`http://localhost:5000/posts/${id}`);
  const data = await response.json();
  return data;
};

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getPostData = async () => {
      try {
        const postData = await fetchPost(id);
        setPost(postData);
        setComments(postData.comments || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getPostData();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="post-container">
      <button 
        onClick={() => navigate('/')}
        className="back-button"
      >
        ← Back to Home
      </button>
      <div className="post-card">
        <h1>{post.title}</h1>
        {/* Add SentimentIndicator HERE */}
        <SentimentIndicator content={post.content} />
        <p className="author"><strong>Author:</strong> {post.author}</p>
        <p className="content">{post.content}</p>
        {post.sources && (
          <p className="source">
            <strong>Source:</strong>{' '}
            <a 
              href={post.sources} 
              target="_blank" 
              rel="noopener noreferrer"
              className="source-link"
            >
              {post.sources}
            </a>
          </p>
        )}
        <p className="date"><strong>Published on:</strong> {new Date(post.date).toLocaleDateString()}</p>

        <h3>Comments:</h3>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="comment-card">
              <h4 className="comment-author">{comment.author}</h4>
              <p className="comment-content">{comment.content}</p>
            </div>
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </div>
    </div>
  );
}

export default PostDetails; 