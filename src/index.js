import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider} from '@chakra-ui/react'
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import user from "./redux/reducers/user"

const store = configureStore({
    reducer : {user}
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <ChakraProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </ChakraProvider>
);
