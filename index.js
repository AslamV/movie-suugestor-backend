import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/post.js';
import authRoutes from './routes/auth.js';
import favMovieRoutes from './routes/favMovie.js';
import dotenv from 'dotenv'
const app = express();

app.use(bodyParser.json({limit:"30mb", extended: true}))
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}))
app.use(cors())
dotenv.config()

app.use('/post', postRoutes);
app.use('/users', authRoutes);
app.use('/favourite', favMovieRoutes);
app.use('/',(req,res) => {
    res.send('Hello to API')
})


mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    
}).then(() => {
    console.log("DB CONNECTED");
})
mongoose.set('useFindAndModify', false);


app.listen(process.env.PORT,() => {
    console.log('Server running at port');
})