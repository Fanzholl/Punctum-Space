import React, { useContext, useEffect } from 'react';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import Post from './Post.jsx'
import './style/Posts.css';

const Posts = () => {
    const { store } = useContext(Context);

    const posts = [];

    useEffect(() => {
        store.getPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    for (let i = 0; i < store.posts.length; i++) {
        posts.push(
            <Post key={store.posts[i]._id} text={store.posts[i].text} time={store.posts[i].postTime}/>
        )
    }

    return (
        <div className='Posts'>

            {posts.length > 0 ? <p className='Posti'>Посты:</p> : ''}

            {
                posts.map(el => el)
            }

        </div>
    );
};

export default observer(Posts);