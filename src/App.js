import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import HomePage from './components/HomePage.jsx';
import Chat from './components/Chat.jsx';
import { useContext, useEffect } from 'react';
import { Context } from './index.js';
import { observer } from 'mobx-react-lite';
import Profile from './components/Profile.jsx';
import ProfileAny from './components/ProfileAny.jsx';
import Users from './components/Users.jsx';

function App() {
  const {store} = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
      console.log(`Пользователь авторизован`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Profile />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/users' element={<Users />} />
          <Route path='/profile/:id'element={<ProfileAny />} />
          <Route path='*'element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default observer(App);