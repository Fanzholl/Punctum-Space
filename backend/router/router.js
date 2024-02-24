import express from 'express';
import userController from '../controllers/user-controller.js';
import { body } from 'express-validator';
import authMiddleware from '../middlewares/auth-middleware.js';
import uploadAvatarMiddleware from '../middlewares/uploadAvatar-middleware.js';

const router = new express.Router();

router.post('/registration', body('email').isEmail(), body('password').isLength({min: 8, max: 24}), userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/refresh', userController.refresh);
router.post('/userData', authMiddleware, userController.setUserData);
router.post('/bio', authMiddleware, userController.setUserBio);
router.post('/uploadAvatar:id', authMiddleware, uploadAvatarMiddleware.single('avatar'), userController.uploadAvatar);
router.post('/sendPost:id', authMiddleware, uploadAvatarMiddleware.array('images'), userController.sendPost);

router.get('/activate:link', userController.activate);
router.get('/checkAuth', authMiddleware, userController.checkAuth);
router.get('/users', authMiddleware, userController.getAllUsers);
router.get('/user:id', authMiddleware, userController.getUser);
router.get('/getPosts:id', authMiddleware, userController.getPosts);
router.get('*', (req, res) => {
    res.send('Пошёл нахуй!');
});

export default router;