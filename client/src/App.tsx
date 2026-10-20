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

    if (AppStore.store.isLoading){
        return <div>Loading..</div>
    }

    if (!AppStore.store.isAuth){
        return <LoginForm />
    }

    return (
    <div>
        <h1>{AppStore.store.isAuth
            ? `welcome ${ AppStore.store.user.email }`
            : 'not auth'}</h1>
        <button onClick={()=> AppStore.store.logout()} >Logout</button>
    </div>
  );
};

export default observer(App);
