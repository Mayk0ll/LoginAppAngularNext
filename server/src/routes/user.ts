import { loginUser, newUser } from '../controllers/user.controller';
import { Router } from "express";

const router = Router();

router.post('/', newUser);
router.post('/login', loginUser);

export default router;