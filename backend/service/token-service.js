import jwt from 'jsonwebtoken';
import tokenModel from '../models/token-model.js'

export default new class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRETKEY, {
            expiresIn: `30m`,
        });

        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRETKEY, {
            expiresIn: `30d`,
        });

        return {
            accessToken,
            refreshToken,
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({ user: userId });

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await tokenModel.create({ user: userId, refreshToken });
        return token;
    }

    async removeToken(refreshToken) {
        const token = await tokenModel.deleteOne({ refreshToken });
        console.log(token);
    }

    async validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRETKEY);
            return userData;
        } catch (err) {
            return null;
        }
    }

    async validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRETKEY);
            return userData;
        } catch (err) {
            return null;
        }
    }

    async findToken(refreshToken) {
        // console.log(refreshToken);
        const tokenData = await tokenModel.findOne({ refreshToken })
        return tokenData;
    }

}