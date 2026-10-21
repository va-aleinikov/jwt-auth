import React, {useContext, useState, useEffect, FC} from 'react';
import LoginForm from './components/LoginForm';
import {Context} from './index';
import { observer } from 'mobx-react-lite';
import {IUser} from "./models/IUser";
import UserService from "./services/UserService";

const App: FC = () => {
    const AppStore = useContext(Context);
    const [users, setUsers] = useState<IUser[]>([]);
    useEffect(() => {
        if (localStorage.getItem('token')){
            AppStore.store.checkAuth()
        }
    },[])

    async function getUsers() {
        try {
            const response = await UserService.fetchUsers();
            setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }

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
            <h2>{AppStore.store.user.isActivated ? 'acc activated' : 'activate your acc'}</h2>
            <button onClick={()=> AppStore.store.logout()} >Logout</button>
            <div>
                <button onClick={getUsers}>get user list</button>
            </div>
            {users.map (user => <div key={user.email}>{user.email}</div>)}

        </div>
  );
};

export default observer(App);
