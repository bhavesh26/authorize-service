import express from 'express';
import cors from 'cors';
import router from './routes/auth.route';
import 'dotenv/config';

const app = express()

app.use(cors());
app.use(express.json());

//Health check
app.get('/' , (req,res)=> {
    res.status(200).json({
        message : "Backend is Okay , Dont worry!"
    })
})

app.use('/api', router);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});