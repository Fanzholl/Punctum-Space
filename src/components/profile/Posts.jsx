import React, { useContext, useEffect } from 'react';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import Post from './Post.jsx'
import './style/Posts.css';
import NewPost from './NewPost.jsx';

const Posts = () => {
    const { store } = useContext(Context);

    const posts = [];

    useEffect(() => {
        store.getOwnPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    for (let i = 0; i < store.posts.length; i++) {
        posts.push(
            <Post key={store.posts[i]._id} text={store.posts[i].text} time={store.posts[i].postTime}/>
        )
    }

    return (
        <div className='Posts'>

            <p className='Posti'>Посты:</p>

            <NewPost />

            {
                posts.map(el => el)
            }

        </div>
    );
};

export default observer(Posts);