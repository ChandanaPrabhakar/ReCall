import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {databaseConnection} from './config/db';
import routers from './routes/authRoutes';

dotenv.config();
databaseConnection();

const app = express();
app.use(express.json());
app.use(cors({
    origin:'*'
}));
app.use('/api/auth', routers);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>{
    console.log(`Server listening in ${PORT}.....`)
})