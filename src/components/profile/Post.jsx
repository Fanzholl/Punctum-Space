import React from 'react';
// import Ciri from '../../images/Ciri.jpg'
import './style/Post.css';

const Post = ({text, time}) => {
    return (
        <div className='Post'>
            {/* <p className='PostTitle'>Название поста</p> */}
            <pre className='PostText'>{text}</pre>
            <div className='PostImagesContainer'>
                {/* <img className='PostImage' src={Ciri} alt='Post info' />
                <img className='PostImage' src={Ciri} alt='Post info' />
                <img className='PostImage' src={Ciri} alt='Post info' /> */}
            </div>
            <p className='PostTime'>{new Date(time).toLocaleString()}</p>
        </div>
    );
};

export default Post;