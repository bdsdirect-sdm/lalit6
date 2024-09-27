import express from 'express';
import { registerUser, loginUser, userProfile, updateProfile } from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get("/profile", authMiddleware, userProfile);

router.put("/updateProfile", authMiddleware, updateProfile);


router.get('/profile', authMiddleware)
// , (req, res) => {
//     res.status(200).json({ message: `Profile of user ID ${(req as any).userId}` });
// });

export default router;
