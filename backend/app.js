import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from './routes/message.routes.js';
import userRoutes from "./routes/user.routes.js"
import connectToMongo from './db/db.js';
import cookieParser from 'cookie-parser';
import path from 'path';



// Configure and getting variables .env file
dotenv.config();
const MONGO_URI = process.env.MONGO_DB_URI;
const PORT = process.env.PORT || 8080;


import { app, server } from './socket/socket.js';
// Creating express object
// const app = express();

const __dirname = path.resolve();

// Middlewares usage
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '/frontend/dist')));

// connecting to mongodb
connectToMongo(MONGO_URI);

// Definfing Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});
// Listening to the port
server.listen(PORT, () =>{
    console.log(`App is listening at: ${PORT}`);
})
