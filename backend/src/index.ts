import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { authenticationToken } from './utils/utilities';
import {databaseConnection} from './config/db';
import router from './routes/authRoutes';

dotenv.config();
databaseConnection();

const app = express();
app.use(express.json());
app.use(cors({
    origin:'*'
}));
app.use('/authq', router);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>{
    console.log(`Server listening in ${PORT}.....`)
})