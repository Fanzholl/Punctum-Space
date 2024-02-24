import React, { useContext, useState } from 'react';
import { Context } from '../..';
import './style/NewPost.css';

const NewPost = () => {
    const { store } = useContext(Context);

    const [postText, setPostText] = useState('');
    const [images, setImages] = useState();

    return (
        <div className='NewPostContainer'>

            <div className='NewPostAvatar' style={{ backgroundImage: `url(${store.user?.avatarUrl !== 'false' ? store.user.avatarUrl : 'http://punctum.space:8002/uploads/avatars/default.jpg'})` }}>

            </div>

            <textarea placeholder={'Расскажите, как ваши дела..'} onFocus={(e) => {
                e.target.style.height = '200px';
                e.target.style.marginBottom = '60px';
                document.querySelector(`.NewPostContainer > input`).style.display = 'block';
                document.querySelector(`.Gallery`).style.display = 'block';
                document.querySelector(`.NewPostPublic`).style.display = 'block';
            }} value={postText} onChange={(e) => { setPostText(e.target.value) }}></textarea>

            <input type='file' multiple='multiple' name='files[]' onChange={(e) => {
                setImages(e.target.files);
            }}/>
            <div className='Gallery'></div>

            <button className='NewPostPublic' onClick={(e) => {
                store.sendPost(postText, images);
                document.querySelector(`.NewPostContainer > textarea`).style.height = 'auto';
                document.querySelector(`.NewPostContainer > textarea`).style.marginBottom = '0px';
                e.target.style.display = 'none';
                document.querySelector(`.NewPostContainer > input`).style.display = 'none';
                document.querySelector(`.Gallery`).style.display = 'none';
                // e.target.style.display = 'none';
                // document.querySelector(`.NewPostContainer`).style.height = 'auto';
            }}>Опубликовать</button>

        </div>
    );
};

export default NewPost;