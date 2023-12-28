import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Header from '../Header/header'
import Posts from '../Posts/post-list'
import FullPost from '../FullPost/full-post'
import SignIn from '../SignInForm/sign-in-form'
import SignUp from '../SignUpForm/sign-up-form'
import EditProfile from '../EditProfile/edit-profile-form'
import './app.css'
import store from '../../toolkitRedux'
import NewArticle from '../NewArticle/new-article-form'
import EditArticle from '../EditArticle/edit-article-form'

export default function App() {
  return (
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
          <Route
            path="/new-article"
            element={
              <PrivateRoute>
                {' '}
                <NewArticle />{' '}
              </PrivateRoute>
            }
          />
          <Route
            path="/articles/:slug/edit"
            element={
              <PrivateRoute>
                {' '}
                <EditArticle />{' '}
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

function PrivateRoute({ children }) {
  const isLogged = window.localStorage.getItem('isLogged')
  if (isLogged === 'true') {
    return children
  }
  return <Navigate to="/sign-in" />
}
