import { makeAutoObservable } from 'mobx';
import AuthService from '../services/AuthService.js';
import api, { API_URL } from '../http/index.js';
import UserService from '../services/UserService.js';

export default class Store {
    user = {};
    isAuth = false;
    isLoading = false;
    findedUser = {};
    users = [];
    posts = [];

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    setFindedUser(user) {
        this.findedUser = user;
    }

    setUsers(users) {
        this.users = users;
    }

    setPosts(posts) {
        this.posts = posts;
    }

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password);
            console.log(response);

            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true)
            this.setUser(response.data.user);
            console.log(response.data.user);
        } catch (err) {
            console.log(err.response?.data?.message);
        }
    }

    async registration(email, password) {
        try {
            const response = await AuthService.registration(email, password);
            console.log(response);

            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true)
            this.setUser(response.data.user);
        } catch (err) {
            console.log(err.response?.data?.message);
        }
    }

    async logout(email, password) {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false)
            this.setUser({});
        } catch (err) {
            console.log(err.response?.data?.message);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await api.get(`${API_URL}/checkAuth`, {
                withCredentials: true,
            });

            localStorage.setItem('token', response.data.accessToken);

            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (err) {
            console.log(err)
            console.log(err.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }

    async refresh() {
        this.setLoading(true);
        try {
            const response = await api.post(`${API_URL}/refresh`, {
                withCredentials: true,
            });
            console.log(response);

            localStorage.setItem('token', response.data.accessToken);

            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (err) {
            console.log(err)
            console.log(err.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }

    async sendUserDataForm(login, name, lastname, city, country, birthday) {
        try {
            const response = await UserService.sendUserDataForm(login, name, lastname, city, country, birthday);

            this.setUser(response.data.user);
        } catch (err) {
            console.log(err);
        }
    }

    async sendUserBio(bio) {
        try {
            const response = await UserService.sendUserBio(bio);

            this.setUser(response.data.user);
        } catch (err) {
            console.log(err);
        }
    }

    async getUserBio() {
        try {
            const userId = window.location.href.split(`/`).pop();
            if (userId !== `XorO`) {
                const response = await UserService.getUserBio(userId);
                this.setFindedUser(response.data.userData.user);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async getAllUsers() {
        try {
            const response = await UserService.getAllUsers();
            if (response) this.setUsers(response.data.users);
            // console.log(response.data.users);
        } catch (err) {
            console.log(err);
        }
    }

    async sendAvatar(avatar) {
        try {
            const userId = this.user.id;
            const data = new FormData();
            data.append('avatar', avatar);
            const response = await UserService.sendAvatar(data, userId);
            // console.log(response.data);
            // console.log(response.data.userData.accessToken);

            localStorage.setItem('token', response.data.userData.accessToken);

            this.setUser(response.data.userData.user);
            console.log(response.data.userData.user);
            return this.user.avatarUrl;
        } catch(err) {
            console.log(err);
        }
    }

    async sendPost(postText, images) {
        try {
            const userId = this.user.id;
            const imagesData = new FormData();
            imagesData.append('images', images);
            imagesData.append('text', postText);
            const response = await UserService.sendPost(postText, imagesData, userId);

            console.log(response);

            localStorage.setItem('token', response.data.accessToken);

            this.setUser(response.data?.user);
        } catch(err) {
            console.log(err);
        }
    }

    async getOwnPosts() {
        try {
            this.setLoading(true);
            const userId = this.user.id;
            // console.log(userId);

            const response = await UserService.getPosts(userId);

            console.log(response);

            this.setPosts(response.data?.posts);
        } catch(err) {
            console.log(err);
        }
        this.setLoading(false);
    }

    async getPosts() {
        try {
            this.setLoading(true);
            const userId = window.location.href.split(`/`).pop();
            // console.log(userId);

            const response = await UserService.getPosts(userId);

            console.log(response);

            this.setPosts(response.data?.posts);
        } catch(err) {
            console.log(err);
        }
        this.setLoading(false);
    }

}