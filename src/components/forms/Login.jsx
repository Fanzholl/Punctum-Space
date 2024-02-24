import React, { useContext } from 'react';
import { useState } from 'react';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { store } = useContext(Context);

    return (
        <div className='form-container'>
            <h1>Авторизация</h1>
            <input type={'text'} placeholder={`Почта`} name={'email'} value={email} onChange={(e) => { setEmail(e.target.value); }} />
            <input type={'password'} placeholder='Пароль' name={'password'} value={password} onChange={(e) => { setPassword(e.target.value); }} />
            <button onClick={() => store.login(email, password)}>Войти</button>
        </div>
    );
};

export default observer(Login);