import React from "react";
import Header from '../Header/header'
import Posts from '../Posts/post-list'
import FullPost from "../FullPost/full-post";
import SignIn from "../SignInForm/sign-in-form";
import SignUp from "../SignUpForm/sign-up-form";
import EditProfile from "../EditProfile/edit-profile-form";
import './app.css'
import { store } from "../../toolkitRedux";
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {

    return (
        <>
        <Provider store={store}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Posts />} />
                    <Route path="/articles" element={<Posts />} />
                    <Route path="/articles/:slug" element={<FullPost />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/profile" element={<EditProfile />} />
                </Routes>
            </BrowserRouter> 
        </Provider>       
        </>
    )
}