import express from 'express'
import connectDB from './config/db.js';
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'


const app = express();
app.use(express.json());
dotenv.config()

connectDB();

const port = 5000;

app.use('/',userRoutes);

app.listen(port , ()=>{
    console.log(`server running on port ${port}`)
})