import postModel from '../models/post-model.js';

export default new class TokenService {

    async createPost(postText, userId) {
        const post = await postModel.create({user: userId, text: postText, postTime: new Date().toUTCString()});
        return post;
    }

    async getPosts(userId) {
        const posts = await postModel.find({user: userId});
        return posts;
    }

}