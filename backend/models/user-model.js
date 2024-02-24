import { Schema, model } from 'mongoose';

const UserSchema = new Schema({

    email: {
        type: String,
        unique: true,
        required: true,
    },

    password: {
        type: String,
        min: 8,
        required: true,
    },

    isActivated: {
        type: String,
        default: false,
    },

    activationLink: {
        type: String,
    },

    isInformed: {
        type: String,
        default: false,
    },

    login: {
        type: String,
        default: '',
    },

    name: {
        type: String,
        default: '',
    },
    
    lastname: {
        type: String,
        default: '',
    },
    
    city: {
        type: String,
        default: '',
    },
    
    country: {
        type: String,
        default: '',
    },
    
    birthday: {
        type: String,
        default: '',
    },

    bio: {
        type: String,
        default: '',
    },

    avatarUrl: {
        type: String,
        default: false,
    }

});

export default model('User', UserSchema);