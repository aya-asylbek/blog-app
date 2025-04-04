import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import db from "./db.js";
import Sentiment from "sentiment";

config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(json());


app.get('/', (req, res) => {
    res.send('Blog app server is working!');
});

// 🔍 Add a new post 
app.post('/posts', async (req, res) => {
    const { title, author, content, image, sources } = req.body;
    
//required fields when create post
    if (!title || !author || !content) {
        return res.status(400).json({ error: 'Title, author and content are required!' })
    }

    try {
        const result = await db.none(
            'INSERT INTO posts(title, author, content, image, sources) VALUES($1, $2, $3, $4, $5)',
            [title, author, content, image, sources]
        );
        res.status(201).json({ message: 'Post created successfully!' });
    } catch (err) {
        console.error('Error adding a post:', err);
        res.status(500).json({ error: 'Failed to create post' });
    } 
});

//🔍 get all posts
app.get("/posts", async (req, res) => {
    try {
        const posts = await db.any("SELECT * FROM posts");
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔍 get a single post with comments 
app.get('/posts/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        //using LEFT JOIN and selecting specific columns post by id and comment by post id
        const result = await db.any(
            `SELECT posts.id as post_id, posts.title, posts.author, posts.date, posts.content, posts.image, posts.sources,
                    comments.id as comment_id, comments.author as comment_author, comments.content as comment_content, comments.date as comment_date
             FROM posts
             LEFT JOIN comments ON posts.id = comments.post_id
             WHERE posts.id = $1`,
            [id]
        );
  
        if (result.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
  
        const post = {
            id: result[0].post_id,
            title: result[0].title,
            author: result[0].author,
            date: result[0].date,
            content: result[0].content,
            image: result[0].image,
            sources: result[0].sources,
            comments: result.map(row => {
                return {
                    id: row.comment_id,
                    author: row.comment_author,
                    content: row.comment_content,
                    date: row.comment_date
                };
            })
        };
  
        // Respond with the post and comments
        res.status(200).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch post with comments' });
    }
});



// 🔍 update a post by ID
app.put("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, date, content } = req.body;
        const updatedPost = await db.one(
            "UPDATE posts SET title = $1, author = $2, date = $3, content = $4 WHERE id = $5 RETURNING *",
            [title, author, date, content, id]
        );
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔍 Delete a post by ID
app.delete("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await db.none("DELETE FROM posts WHERE id = $1", [id]);
        res.json({ message: "Post deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//______________________________________________________________
// Adds a new comment to a post
app.post('/comments', async (req, res) => {
    const { post_id, author, content, date } = req.body;
  
    try {
      const result = await db.none(
        'INSERT INTO comments(post_id, author, content, date) VALUES($1, $2, $3, $4)',
        [post_id, author, content, date]
      );
      res.status(201).json({ message: 'Comment added successfully!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add comment' });
    }
  });
  
  // Get all comments for a post by id
  app.get('/comments/:post_id', async (req, res) => {
    const { post_id } = req.params;
    try {
      const comments = await db.any('SELECT * FROM comments WHERE post_id = $1', [post_id]);
      res.status(200).json(comments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch comments' });
    }
  });
  
  // Get a specific comment by ID
  app.get('/comments/:post_id/:id', async (req, res) => {
    const { post_id, id } = req.params;
    try {
      const comment = await db.oneOrNone(
        'SELECT * FROM comments WHERE post_id = $1 AND id = $2',
        [post_id, id]
      );
      if (comment) {
        res.status(200).json(comment);
      } else {
        res.status(404).json({ error: 'Comment not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch comment' });
    }
  });
  
  // Update specific comment
  app.put('/comments/:post_id/:id', async (req, res) => {
    const { post_id, id } = req.params;
    const { author, content, date } = req.body;
  
    try {
      const result = await db.none(
        'UPDATE comments SET author = $1, content = $2, date = $3 WHERE post_id = $4 AND id = $5',
        [author, content, date, post_id, id]
      );
      res.status(200).json({ message: 'Comment updated successfully!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update comment' });
    }
  });
  
  // Delete comment by ID
  app.delete('/comments/:post_id/:id', async (req, res) => {
    const { post_id, id } = req.params;
    try {
      const result = await db.none('DELETE FROM comments WHERE post_id = $1 AND id = $2', [post_id, id]);
      res.status(200).json({ message: 'Comment deleted successfully!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete comment' });
    }
  });
  

// ----------------------------------------------------------------------------------->>>>>>>>>>


  // Sentiment analysis endpoint
app.post("/analyze-sentiment", (req, res) => {
  try {
    const { content } = req.body;
    const analyzer = new Sentiment();
    const result = analyzer.analyze(content);
    
    // Return the score and comparative 
    res.json({
      score: result.score,
      comparative: result.comparative,
    });
  } catch (error) {
    res.status(500).json({ error: "Sentiment analysis failed" });
  }
});

//🔍 Start my  server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});