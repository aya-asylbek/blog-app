import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';

config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(json());


app.get('/', (req, res) => {
    res.send('Blog app server is working!');
});


//Start my  server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});