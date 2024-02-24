import userModel from "../models/user-model.js";
import bcrypt from 'bcrypt';
import mailService from "./mail-service.js";
import tokenService from "./token-service.js";
import UserDTO from "../dtos/dtos.js";
import { v4 as uuid } from 'uuid';
import ApiError from "../exceptions/api-error.js";
import postService from "./post-service.js";

export default new class UserService {

    async registration(email, password) {
        const candidate = await userModel.findOne({ email })

        if (candidate) throw ApiError.BadRequest(`Пользователь с подобным адресом электроной почты уже существует: ${email}`);
        if (!password) throw ApiError.BadRequest(`Пароль не задан!`);

        const hashedPassword = await bcrypt.hash(password, 3);

        const activationLink = uuid();

        const user = await userModel.create({ email, password: hashedPassword, activationLink });
        await mailService.sendActivationMail(email, `${process.env.API_URL}api/activate${activationLink}`);

        const userDto = new UserDTO(user);

        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        }

    }

    async login(email, password, ip) {
        const user = await userModel.findOne({ email });

        if (!user) throw ApiError.BadRequest(`Пользователь с данным адресом электронной почты не найден: ${email}.`);
        if (!password) throw ApiError.BadRequest(`Введите пароль.`);

        const passwordChek = await bcrypt.compare(password, user.password);
        console.log(passwordChek);
        if (!passwordChek) throw ApiError.BadRequest(`Неверный пароль.`);

        await mailService.sendLoginMail(email, ip);

        const userDto = new UserDTO(user);

        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        }

    }

    async logout(refreshToken) {
        if (!refreshToken) throw ApiError.UnauthorizedError();

        await tokenService.removeToken(refreshToken);
    }

    async activate(activationLink) {
        console.log(activationLink);
        const user = await userModel.findOne({ activationLink });

        if (!user) throw ApiError.BadRequest(`Пользователь с подобной ссылкой на активацию профиля не найден.`);

        user.isActivated = true;
        await user.save();

    }

    async refresh(refreshToken) {
        // console.log(refreshToken)
        if (!refreshToken) throw ApiError.UnauthorizedError();

        const userData = await tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        // console.log(tokenFromDb);
        // console.log(userData);

        if (!userData || !tokenFromDb) throw ApiError.UnauthorizedError();

        const user = await userModel.findOne({_id: userData.id});
        const userDto = new UserDTO(user);

        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        }

    }

    async checkAuth(refreshToken) {
        // console.log(refreshToken)
        if (!refreshToken) throw ApiError.UnauthorizedError();

        const userData = await tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        // console.log(tokenFromDb);
        // console.log(userData);

        if (!userData || !tokenFromDb) throw ApiError.UnauthorizedError();

        const user = await userModel.findOne({_id: userData.id});
        const userDto = new UserDTO(user);

        const tokens = tokenService.generateTokens({ ...userDto });

        return {
            ...tokens,
            user: userDto,
        }

    }

    async getAllUsers() {
        const users = await userModel.find();

        const usersDto = [];
        for (let user of users) {
            usersDto.push(new UserDTO(user));
        }
        
        return usersDto;
    }

    async setUserData(userFormData, refreshToken) {
        if (!refreshToken) throw ApiError.UnauthorizedError();

        const userData = await tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) throw ApiError.UnauthorizedError();

        const user = await userModel.findOne({_id: userData.id});

        for (let key of Object.keys(userFormData)) {
            if (key) user[key] = userFormData[key];
            console.log(key)
        }

        user.isInformed = true;
        
        await user.save();

        const userDto = new UserDTO(user);
        const tokens = await tokenService.generateTokens({...userDto});

        return {
            ...tokens,
            user: userDto,
        }
    }

    async setUserBio(bio, refreshToken) {
        if (!refreshToken) throw ApiError.UnauthorizedError();

        const userData = await tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) throw ApiError.UnauthorizedError();

        const user = await userModel.findOne({_id: userData.id});

        user.bio = bio;
        
        await user.save();

        const userDto = new UserDTO(user);
        const tokens = await tokenService.generateTokens({...userDto});

        return {
            ...tokens,
            user: userDto,
        }
    }

    async getUser(userId) {
        const user = await userModel.findOne({_id: userId});
        // console.log(user);
        if (!user) throw ApiError.BadRequest(`Пользователь не найден`);
        const userDto = new UserDTO(user);
        return {
            user: userDto,
        };
    }

    async uploadAvatar(userId, avatarMimetype) {
        const user = await userModel.findOne({_id: userId});
        user.avatarUrl = `http://punctum.space:8002/uploads/avatars/avatar${userId}.${avatarMimetype}`;
        await user.save();

        const userDto = new UserDTO(user);
        console.log(userDto);
        const tokens = await tokenService.generateTokens({...userDto});

        return {
            ...tokens,
            user: userDto,
        }
    }

    async sendPost(postText, userId) {
        const user = await userModel.findOne({_id: userId});

        const userDto = new UserDTO(user);
        console.log(userDto);

        const post = await postService.createPost(postText, userDto.id);
        
        const tokens = await tokenService.generateTokens({...userDto});

        return {
            ...tokens,
            user: userDto,
            post: post,
        }
    }

    async getPosts(userId) {
        const user = await userModel.findOne({_id: userId});

        if(!user) throw ApiError.BadRequest(`Пользователь с данным ID не найден.`);

        const posts = await postService.getPosts(userId);

        return {
            posts: posts,
        }
    }

}