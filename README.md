# Travel Blog Application

A full-stack travel blog application built with React, Express.js, and PostgreSQL. Users can create, read, update, and delete blog posts about travel destinations, analyze post sentiment, and manage comments.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete travel blog posts
- **Sentiment Analysis**: AI-powered sentiment scoring for post content
- **Comments System**: Add and manage comments on posts
- **Responsive Design**: Mobile-friendly UI with CSS styling
- **RESTful API**: Backend API with Express.js
- **PostgreSQL Database**: Relational database for persistent storage

## Technologies Used

- **Frontend**: React, React Router, CSS
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL
- **Libraries**: `sentiment` (NLP analysis), `pg-promise` (DB connection)
- **Tools**: CORS, dotenv

## Installation

1. **Clone Repository**
   ```bash
   git clone [repository-url]
   cd travel-blog-app
Install Dependencies

bash
Copy
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
Database Setup

Install PostgreSQL

Create database and user:

sql
Copy
CREATE DATABASE travel_blog;
CREATE USER tpl522_13 WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE travel_blog TO tpl522_13;
Load schema and sample data:

bash
Copy
psql -U tpl522_13 -d travel_blog -a -f database_dump.sql
Configuration
Create .env file in /server:

env
Copy
PG_USER=tpl522_13
PG_PASSWORD=your_password
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=travel_blog
PORT=5000
Running the Application
Start Backend

bash
Copy
cd server
npm start
Start Frontend

bash
Copy
cd client
npm start
Access the application at http://localhost:5000

API Endpoints
Method	Endpoint	Description
GET	/posts	Get all posts
POST	/posts	Create new post
GET	/posts/:id	Get single post with comments
PUT	/posts/:id	Update post
DELETE	/posts/:id	Delete post
POST	/analyze-sentiment	Analyze text sentiment
Database Schema
Posts Table

sql
Copy
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  content TEXT NOT NULL,
  image VARCHAR(255),
  sources TEXT
);
Comments Table

sql
Copy
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  author VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  date DATE NOT NULL
);
Frontend Components
PostsList: Main blog post listing

PostDetails: Single post view with comments

PostForm: Create/Edit post form

EditPost: Post editing interface

SentimentIndicator: AI sentiment analysis widget

Testing Sentiment Analysis
Create a post with emotional content (e.g., "I love this amazing place!")

In post details view, click "Analyze Sentiment"

View real-time sentiment score and emoji indicator

Notes
Requires Node.js v16+ and PostgreSQL v14+

Backend runs on port 5000 by default

Frontend proxy configured to backend

Sample data included for 3 posts and comments

