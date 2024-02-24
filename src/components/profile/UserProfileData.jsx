import React, { useContext }  from 'react';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';


const UserData = () => {
    const { store } = useContext(Context);
    return (
        <div className='UserData'>
            <p className='Inicials'>{store.user ? `${store.user.name} ${store.user.lastname}` : ''}</p>
            <p className='Data'>{store.user ? `${store.user.city}, ${store.user.country}` : ''}</p>
            <p className='Data'>{store.user ? `${store.user.birthday}` : ''}</p>
            <p className='Login'>{store.user ? `${store.user.login}` : ''}</p>
        </div>
    );
};

export default observer(UserData);