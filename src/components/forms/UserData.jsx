import React, { useContext, useState } from 'react';
import '../style/UserData.css';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';

const UserData = () => {

    const [login, setLogin] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [birthday, setBirthday] = useState('');

    const { store } = useContext(Context);

    return (
        <div className='UserDataFormContainer'>
            <div className='UserDataForm'>
                <input type="text" placeholder='Логин*' name='login' value={login} onChange={(e) => { setLogin(e.target.value); }} required/>
                <input type="text" placeholder='Имя*' name='userName' value={name} onChange={(e) => { setName(e.target.value); }} required/>
                <input type="text" placeholder='Фамилия*' name='lastname' value={lastname} onChange={(e) => { setLastname(e.target.value); }} required/>
                <input type="text" placeholder='Город*' name='city' value={city} onChange={(e) => { setCity(e.target.value); }} required/>
                <input type="text" placeholder='Страна*' name='country' value={country} onChange={(e) => { setCountry(e.target.value); }} required/>
                <input type="text" placeholder='Дата рождения*' name='birthday' value={birthday} onChange={(e) => { setBirthday(e.target.value); }} required/>
                <button onClick={() => store.sendUserDataForm(login, name, lastname, city, country, birthday)}>Отправить</button>
            </div>
        </div>
    );
};

export default observer(UserData);