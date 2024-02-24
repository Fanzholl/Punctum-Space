import ApiError from "../exceptions/api-error.js";
import userService from "../service/user-service.js";
import requestIp from 'request-ip';
import { validationResult } from "express-validator";

export default new class UserController {
    async registration(req, res, next) {
        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) return next(ApiError.BadRequest(`Ошибка при валидации тела запроса.`, errors.array()))

            const { email, password } = req.body;
            console.log(req.body);

            const userData = await userService.registration(email, password);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.status(200).json(userData);
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            console.log(req.body);
            const ip = requestIp.getClientIp(req);

            const userData = await userService.login(email, password, ip);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.status(200).json(userData);
        } catch (err) {
            next(err);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            await userService.logout(refreshToken);

            res.clearCookie('refreshToken');

            res.status(200).json({ message: `RefreshToken удалён.` });

        } catch (err) {
            next(err);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;

            userService.activate(activationLink);

            res.redirect(process.env.CLIENT_URL);
        } catch (err) {
            next(err);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 24 * 30 * 60 * 60 * 1000,
                httpOnly: true,
            });

            res.json({userData});

        } catch (err) {
            next(err);
        }
    }

    async checkAuth(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.checkAuth(refreshToken);

            res.json({...userData});

        } catch (err) {
            next(err);
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json({users});
        } catch (err) {
            next(err);
        }
    }

    async setUserData(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            
            const { login, name, lastname, city, country, birthday } = req.body;
            const userFormData = { login, name, lastname, city, country, birthday };

            const userData = await userService.setUserData(userFormData, refreshToken);

            return res.status(200).json(userData);
        } catch(err) {
            next(err);
        }
    }

    async setUserBio(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            
            const { bio } = req.body;

            const userData = await userService.setUserBio(bio, refreshToken);

            return res.status(200).json(userData);
        } catch(err) {
            next(err);
        }
    }

    async getUser(req, res, next) {
        try {
            const userId = req.params.id.slice(1);
            // console.log(userId);
            if (!userId) throw ApiError.BadRequest(`Неверный ID пользователя.`);
            const userData = await userService.getUser(userId);
            return res.status(200).json({userData});
        } catch (err) {
            next(err);
        }
    }

    async uploadAvatar(req, res, next) {
        try {
            const avatar = req.file;

            if (!avatar) throw ApiError.BadRequest(`Аватар не был загружен.`);

            const userId = req.params.id.slice(1);
            const avatarMimeType = req.file.mimetype.split('/')[1];
            console.log(avatarMimeType);

            const userData = await userService.uploadAvatar(userId, avatarMimeType);

            return res.status(200).json({userData});
        } catch (err) {
            next(err);
        }
    }

    async sendPost(req, res, next) {
        try {
            const {postText} = req.body;
            const userId = req.params.id.slice(1);

            if (!postText) throw ApiError.BadRequest(`Не передано содержание поста.`);

            const userData = await userService.sendPost(postText, userId);

            return res.status(200).json(userData);
        } catch (err) {
            next(err);
        }
    }

    async getPosts(req, res, next) {
        try {
            const userId = req.params.id.slice(1);
            // console.log(userId + 1);

            if (!userId) throw ApiError.BadRequest(`Неверный ID пользователя.`);

            const posts = await userService.getPosts(userId);

            return res.status(200).json(posts);
        } catch (err) {
            next(err);
        }
    }

}