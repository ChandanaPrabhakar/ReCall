import {Router} from 'express';
import { signupController, loginController } from '../controllers/authControllers';
import { addNoteController } from "../controllers/noteControllers";
import { authenticationToken } from "../utils/utilities";

const router = Router();

router.post('/signup', signupController);
router.post('/login', loginController);
router.post('/add-note' , authenticationToken ,addNoteController);

export default router;