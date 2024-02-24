import React, { useState, useContext } from 'react';
import './style/HomePage.css';
import Login from './forms/Login';
import Register from './forms/Register';
import { Context } from '../';
import { observer } from 'mobx-react-lite';

const HomePage = () => {

    const [loginStatus, setLoginStatus] = useState('login');

    const { store } = useContext(Context);

    if (store.isLoading) {
        return <div><h1 style={{fontSize: 24 + `px`, color: 'white'}}>Загрузка...</h1></div>
    }

    function editLoginStatus(event) {
        loginStatus === 'registration' ? setLoginStatus('login') : setLoginStatus('registration');
    }

    return (
        <div className={'StartContainer'}>
            <div className={'StartInfo'}>

                <div className='InfoBackground'>

                </div>

                <div className='InfoReg'>
                    <div className='InfoRegFlex'>
                        <div>

                            {loginStatus === 'login' ? <Login /> : <Register />}

                            <div className={'InfoReset'}>
                                <p>Забыли пароль?</p>
                                <p onClick={editLoginStatus}>{loginStatus !== 'registration' ? `Регистрация` : `Авторизация`}</p>
                            </div>
                            
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default observer(HomePage);