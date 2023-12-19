import React from "react";
import Header from '../Header/header'
import Posts from '../Posts/post-list'
import './app.css'
import { store } from "../../toolkitRedux";
import { Provider } from 'react-redux'

export default function App() {

    return (
        <>
        <Provider store={store}>
            <Header />
            <Posts />  
        </Provider>       
        </>
    )
}