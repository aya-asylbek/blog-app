# ✈️ Travel Blog Application

![App Screenshot](https://img.shields.io/badge/Status-Live-success?logo=github)
![License](https://img.shields.io/badge/License-MIT-blue?logo=law)

A full-stack travel blog application built with React, Express.js, and PostgreSQL. Users can create, read, update, and delete blog posts about travel destinations, analyze post sentiment, and manage comments.

## 🌟 Features

| Feature               | Icon          | Description                                  |
|-----------------------|---------------|----------------------------------------------|
| **CRUD Operations**   | 📝           | Create, Read, Update, Delete travel posts    |
| **Sentiment Analysis**| 🧠           | AI-powered content mood detection           |
| **Comments System**   | 💬           | Real-time comment management                |
| **Responsive Design** | 📱           | Mobile-friendly UI                          |
| **RESTful API**       | 🔗           | Express.js backend                          |

## 🛠 Technologies Used

**Frontend**  
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router)

**Backend**  
![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js)

**Database**  
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql)

**Tools**  
![CORS](https://img.shields.io/badge/CORS-999999?logo=webpack)
![Dotenv](https://img.shields.io/badge/Dotenv-ECD53F?logo=dotenv)

View Post 

https://github.com/user-attachments/assets/0c955edb-b5ec-410c-9c96-94ee65c88316


Create new post 


https://github.com/user-attachments/assets/32e15cd4-ff04-4651-bf29-53b9dd38efda

Edit post 



https://github.com/user-attachments/assets/25bd518a-70c1-4968-9be7-b57fa1af77d7


Delete post 

## 🚀 Installation


https://github.com/user-attachments/assets/ff5ca777-3c50-463e-91f4-4752c488c30b


```bash
# Clone repository
git clone https://github.com/aya-asylbek/blog-app
cd travel-blog-app

# Install dependencies
🔧 Frontend
cd client && npm install

🔧 Backend
cd ../server && npm install

🗄 Database Setup
s
-- Create database
CREATE DATABASE travel_blog;

-- Create user
CREATE USER tpl522_13 WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE travel_blog TO tpl522_13;

-- Load schema
psql -U tpl522_13 -d travel_blog -a -f database_dump.sql
⚙ Configuration

Create .env in /server:

env
Copy
PG_USER=tpl522_13
PG_PASSWORD=your_password
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=travel_blog
PORT=5000

🚦 Running the Application

# Start backend
🚀 cd server && npm start

# Start frontend
🚀 cd client && npm start

🌐 Access at http://localhost:5000
🔌 API Endpoints
Method	Endpoint	Description	Icon
GET	/posts	Get all posts	📄
POST	/posts	Create new post	➕
GET	/posts/:id	Get single post	🔍
PUT	/posts/:id	Update post	✏️
DELETE	/posts/:id	Delete post	🗑️
POST	/analyze-sentiment	Analyze text sentiment	🧠
🗃 Database Schema
sql
Copy
-- Posts Table
📄 CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  content TEXT NOT NULL,
  image VARCHAR(255),
  sources TEXT
);

-- Comments Table
💬 CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  author VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  date DATE NOT NULL
);
🧪 Testing Sentiment Analysis
Create post with emotional content (e.g., "I love this amazing place! 🌍")

In post details view: Click "Analyze Sentiment" 🧪

View real-time results:

console
Copy
🎯 Sentiment Score: +0.85 (😊 Positive)
📝 Notes
⚠️ Requirements

Node.js v16+ 🟢

PostgreSQL v14+ 🐘

ℹ️ Default Ports

Backend: 5000 🔌

Frontend: 5173 🖥️

✨ Sample Data Included

3 example posts 📑

Demo comments 💬
