import React, {useContext, useEffect, FC} from 'react';
import LoginForm from './components/LoginForm';
import {Context} from './index';
import { observer } from 'mobx-react-lite';

const App: FC = () => {
    const AppStore = useContext(Context);
    useEffect(() => {
        if (localStorage.getItem('token')){
            AppStore.store.checkAuth()
        }
    },[])
    return (
    <div>
        <h1>{AppStore.store.isAuth
            ? `welcome ${ AppStore.store.user.email }`
            : 'not auth'}</h1>
        <LoginForm></LoginForm>
    </div>
  );
};

export default observer(App);
