import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import db from "./db.js";

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
      //using LEFT JOIN
      const result = await db.any(
        `SELECT posts.*, comments.*
         FROM posts
         LEFT JOIN comments ON posts.id = comments.post_id
         WHERE posts.id = $1`,
        [id]
      );
  
      if (result.length === 0) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      const post = {
        ...result[0],  // Take the first post data by index
        comments: result.filter(row => row.comment_id !== null)  // Filter out the comments
      };
  
      // If no comments ( returns an empty array[])
      if (post.comments.length === 0) {
        post.comments = [];  //empty array []
      }
  
      // Respond with the post and comments
      res.status(200).json(post);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch post with comments' });
    }
  });

// 🔍 get a single post by ID (without comments)
app.get("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const post = await db.one("SELECT * FROM posts WHERE id = $1", [id]);
        res.json(post);
    } catch (err) {
        res.status(404).json({ error: "Post not found" });
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


//🔍 Start my  server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});