import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './style/Layout.css';
import { Context } from '../';
import { observer } from 'mobx-react-lite';
import HomePage from './HomePage';
import UserData from './forms/UserData';


const Layout = () => {

    const { store } = useContext(Context);

    if (!store.isAuth) {
        return (
            <main>
                <HomePage />
            </main>
        )
    }

    if (store.user.isInformed !== 'true') {
        console.log(store.user.isInformed)
        return (
            <main>
                <UserData />
            </main>
        )
    }

    return (
        <>
            <header>
                <Link to={'/'} className='Link'>Профиль</Link>
                <Link to={'/chat'} className='Link'>Сообщения</Link>
                <Link to={'/users'} className='Link'>Пользователи</Link>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default observer(Layout);