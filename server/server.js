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

// Add a new post 
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
























//Start my  server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});