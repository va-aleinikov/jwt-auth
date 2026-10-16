import React, {createContext} from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Store from './store/store'

interface AppState {
    store: Store;
}

const store = new Store();

export const Context = createContext<AppState>({
    store,
})

const container = document.getElementById('root');

if (!container) {
    throw new Error('Root element not found');
}

const root = createRoot(container);

root.render(
    <Context.Provider value={{
        store
    }}>
        <App />
    </Context.Provider>
);