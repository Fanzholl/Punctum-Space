import React, { useContext, useEffect } from 'react';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import './style/Users.css'
import Ciri from '../images/Ciri.jpg'
import { Link } from 'react-router-dom'

const Users = () => {
    const { store } = useContext(Context);

    let users = [];

    useEffect(() => {
        store.getAllUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    for (let i = 0; i < store.users.length; i++) {
        users.push(

            <Link to={`/profile/${store.users[i].id}`} key={`link${i}`}>
                <div className='User' id={store.users[i].login} key={store.users[i].id}>
                    <img src={store.users[i]?.avatarUrl !== 'false' ? store.users[i].avatarUrl : Ciri} alt='avatar' key={`avatar${i}`} />
                    <div className='UserInfo' key={`info${i}`}>
                        <p className='UserInicials' key={`inicials${i}`}>{store.users[i].name} {store.users[i].lastname}</p>
                        <p className='UserLocation' key={`location${i}`}>{store.users[i].city}, {store.users[i].country}</p>
                        <p className='UserLogin' key={`login${i}`}>{store.users[i].login}</p>
                        <p className='UserLogin UserBio' key={`bio${i}`}>{store.users[i].bio.slice(0, 39)}{store.users[i].bio.length > 39 ? `...` : ''}</p>
                    </div>
                </div>
            </Link>

        )
    }

    return (
        <div className='UsersContainer'>
            <div className='Users'>
                <div className='UsersAlign'>
                    {
                        users.map(el => (
                            el
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default observer(Users);