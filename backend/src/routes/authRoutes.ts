import {Router} from 'express';
import { signupController, loginController } from '../controllers/authControllers';
import { addNoteController, editNoteController, getAllNotesController, deleteNoteController } from "../controllers/noteControllers";
import { authenticationToken } from "../utils/utilities";

const router = Router();

router.post('/signup', signupController);
router.post('/login', loginController);
router.post('/add-note' , authenticationToken ,addNoteController);
router.put('/edit-note/noteId/:noteId' , authenticationToken ,editNoteController);
router.get('/get-all-notes' , authenticationToken ,getAllNotesController);
router.delete('/delete-note/noteId/:noteId' , authenticationToken ,deleteNoteController);

export default router;