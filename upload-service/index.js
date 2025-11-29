import express from 'express';
import uploadRouter from './routes/uploadRouter.js';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();
const port = process.env.PORT || 4000;  
const app = express();

app.use(cors({
   allowedHeaders: ["*"],
   origin: "*"
}));
app.use(express.json());
app.use('/upload', uploadRouter);