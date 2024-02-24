import React, { useContext, useState  } from 'react';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';

const Avatar = ({avatarUrl}) => {
    const { store } = useContext(Context);
    const [file, setFile] = useState(new FormData());
    return (
        <div className='pImg' style={{ backgroundImage: `url(${avatarUrl !== 'false' ? avatarUrl : 'http://punctum.space:8002/uploads/avatars/default.jpg'})` }}>

            <input type="file" className='uploadAvatar' name='avatar' title='Сменить аватар' onClick={(e) => {
                document.querySelector(`.deleteAvatar`).style.display = 'block';
                document.querySelector(`.sendAvatar`).style.display = 'block';
            }} onChange={(e) => {
                setFile(e.target.files[0])
            }} accept='image' />

            <button className='deleteAvatar' onClick={(e) => {
                document.querySelector(`.sendAvatar`).style.display = 'none';
                e.target.style.display = 'none';
            }}>Отменить</button>

            <button className='sendAvatar' onClick={async (e) => {
                console.log(file)
                store.sendAvatar(file);

                document.querySelector(`.deleteAvatar`).style.display = 'none'
                e.target.style.display = 'none';
            }}>Сменить</button>

        </div>
    );
};

export default observer(Avatar);