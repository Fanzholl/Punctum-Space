import React, { useContext, useState } from 'react';
import UserProfileData from './profile/UserProfileData';
import './style/Profile.css';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import Avatar from './profile/Avatar';
import Posts from './profile/Posts';


const Profile = () => {
    const { store } = useContext(Context);

    const [bio, setBio] = useState(store.user.bio);
    const [preBio, setPreBio] = useState('');



    // document.querySelector(`main`).style.height = 'auto';

    return (
        <div className='Profile'>
            <div className='UserProfile'>

                <div className='UserProfileLabelInfo'>

                    <Avatar avatarUrl={store.user?.avatarUrl} />

                    {/* <p style={{fontSize: '24px', color: 'white'}}>{store.user?.avatarUrl ?? 'дефолтная картинка'}</p> */}

                    <UserProfileData />

                    <div className='TextAreaContainer'>

                        <textarea placeholder={`Биография`} value={bio} onChange={(e) => { setBio(e.target.value) }} onFocus={(e) => {
                            setPreBio(bio);
                            e.target.style.cursor = 'text';
                            document.querySelector(`.TextAreaContainer`).style.height = '300px';
                            document.querySelector('.TextAreaContainerSubmitButton').style.display = 'block';
                            document.querySelector('.TextAreaContainerUnSubmitButton').style.display = 'block';
                        }} required></textarea>

                        <button className='TextAreaContainerSubmitButton' onClick={(e) => {
                            store.sendUserBio(bio); document.querySelector(`.TextAreaContainer`).style.height = 'auto';
                            document.querySelector('.TextAreaContainerUnSubmitButton').style.display = 'none';
                            e.target.style.display = 'none';
                        }}>Отправить</button>

                        <button className='TextAreaContainerUnSubmitButton' onClick={(e) => {
                            setBio(preBio);
                            document.querySelector(`.TextAreaContainer`).style.height = 'auto';
                            document.querySelector(`.TextAreaContainer > textarea`).style.cursor = 'pointer';
                            document.querySelector('.TextAreaContainerSubmitButton').style.display = 'none';
                            e.target.style.display = 'none';
                        }}>Отменить</button>

                    </div>

                </div>

                <Posts />

            </div>
        </div>
    );
};

export default observer(Profile);