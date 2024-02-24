import { Schema, model } from 'mongoose';

const PostSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

    text: {
        type: String,
        required: true,
    },

    postTime: {
        type: String,
        required: true,
    }

});

export default model('Post', PostSchema);