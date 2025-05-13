import {Router} from 'express';
import { signupController } from '../controllers/authControllers';

const router = Router();

router.post('/signup', signupController);

export default router;