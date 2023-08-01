import { Router } from "express";
import isLoggedIn from "../middlewares/auth.middleware.js";
import { allNotes, createNote, deleteNote, updateNote } from "../controllers/note.controllers.js";

const router = Router();

router.post('/', isLoggedIn, createNote);
router.get('/', isLoggedIn, allNotes);
router.put('/:id', isLoggedIn, updateNote);
router.delete('/:id', isLoggedIn, deleteNote);


export default router;