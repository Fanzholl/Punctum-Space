import api from "../http";

export default class UserService {

    static async sendUserDataForm(login, name, lastname, city, country, birthday) {
        return api.post(`/userData`, {login, name, lastname, city, country, birthday});
    }

    static async sendUserBio(bio) {
        return api.post(`/bio`, {bio});
    }

    static async getUserBio(userId) {
        return api.get(`/user:${userId}`);
    }

    static async getAllUsers() {
        return api.get(`/users`);
    }

    static async sendAvatar(data, userId) {
        return api.post(`/uploadAvatar:${userId}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
    }

    static async sendPost(postText, imagesData, userId) {
        return api.post(`/sendPost:${userId}`, {imagesData}, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
    }

    static async getPosts(userId) {
        return api.get(`/getPosts:${userId}`);
    }

}