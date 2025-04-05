✈️ Travel Blog App with AI Sentiment Analysis


A full-stack travel blogging platform built with React, Express.js, and PostgreSQL. This app allows users to share travel experiences and analyze the mood of their content using AI-powered sentiment analysis. Features include full CRUD functionality, real-time comments, and a responsive design for any device.

🌟 Features
Feature	Icon	Description
CRUD Operations	📝	Create, read, update, and delete travel posts
AI Sentiment Analysis	🧠	Detects emotional tone of posts using AI
Comments System	💬	Add and manage comments in real time
Responsive Design	📱	Mobile-friendly user interface
RESTful API	🔗	Clean and structured Express.js API
🛠️ Technologies Used
Frontend



Backend



Database


Tools



📸 
🧭 View Post


🆕 Create New Post


✏️ Edit Post


🗑️ Delete Post


🚀 Installation Guide
bash
Copy
Edit
# Clone the repository
git clone https://github.com/aya-asylbek/blog-app
cd blog-app
🔧 Install Dependencies
bash
Copy
Edit
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
🧩 Install Concurrently (for running both servers)
bash
Copy
Edit
npm install concurrently --save-dev
⚙️ Environment Setup
Create a .env file inside the /server folder:

env
Copy
Edit
PG_USER=tpl522_13
PG_PASSWORD=your_password
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=blog_app
PORT=5000
🗄️ Database Setup
sql
Copy
Edit
-- Create database
CREATE DATABASE blog_app;

-- Create user
CREATE USER tpl522_13 WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE blog_app TO tpl522_13;

-- Load schema
psql -U tpl522_13 -d blog_app -a -f database_dump.sql
🧠 Test Sentiment Analysis
Create a blog post with emotional content (e.g., "This place was absolutely breathtaking! 💕")

In the post details view, click "Analyze Sentiment" 🧪

Console will log something like:
🎯 Sentiment Score: +0.85 (😊 Positive)

🔌 Running the App (with Concurrently)
bash
Copy
Edit
# In the root folder
npm run dev
dev script (add this to your root package.json if needed):

json
Copy
Edit
"scripts": {
  "dev": "concurrently \"npm run server\" \"npm run client\"",
  "server": "cd server && npm start",
  "client": "cd client && npm start"
}
🔗 API Endpoints
Method	Endpoint	Description
GET	/posts	Get all posts
POST	/posts	Create a new post
GET	/posts/:id	Get a single post
PUT	/posts/:id	Update an existing post
DELETE	/posts/:id	Delete a post
POST	/analyze-sentiment	Analyze post sentiment
🧮 Database Schema
sql
Copy
Edit
-- Posts Table
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  content TEXT NOT NULL,
  image VARCHAR(255),
  sources TEXT
);

-- Comments Table
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  author VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  date DATE NOT NULL
);
⚠️ Requirements
Node.js v16+ 🟢

PostgreSQL v14+ 🐘

📝 License
This project is licensed under the MIT License.
Feel free to use, modify, and share!