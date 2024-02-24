import React, { useContext, useEffect } from 'react';
import './style/Profile.css';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import AnyPosts from './profile/AnyPosts';
import AvatarAny from './profile/AvatarAny';


const ProfileAny = () => {
    const { store } = useContext(Context);

    useEffect(() => {
        store.getUserBio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    

    return (
        <div className='Profile'>
            <div className='UserProfile'>

                <div className='UserProfileLabelInfo'>

                    <AvatarAny avatarUrl={store.findedUser?.avatarUrl}/>

                    <div className='UserData'>
                        <p className='Inicials'>{store.findedUser ? `${store.findedUser.name} ${store.findedUser.lastname}` : ''}</p>
                        <p className='Data'>{store.findedUser ? `${store.findedUser.city}, ${store.findedUser.country}` : ''}</p>
                        <p className='Data'>{store.findedUser ? `${store.findedUser.birthday}` : ''}</p>
                        <p className='Login'>{store.findedUser ? `${store.findedUser.login}` : ''}</p>
                    </div>

                    <div className='TextAreaContainer'>
                        <textarea placeholder={`Биография`} value={store.findedUser.bio} onFocus={(e) => {
                            e.target.style.cursor = 'text';
                            document.querySelector(`.TextAreaContainer`).style.height = '300px';
                        }} onBlur={(e) => {
                            document.querySelector(`.TextAreaContainer`).style.height = 'auto';
                            e.target.style.cursor = 'pointer';
                        }}readOnly required>

                        </textarea>
                    </div>

                </div>

                <AnyPosts />

            </div>
        </div>
    );
};

export default observer(ProfileAny);