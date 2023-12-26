import {setPosts, setTotalPosts} from "../toolkitRedux/toolkitSlice"

const basePath = 'https://blog.kata.academy/api'
const api = async (url, params = {}) => {
    const fetchSettings = Object.keys(params).length ? '?' + new URLSearchParams(params) : ''
    return fetch(url + fetchSettings)
}
export const getPosts = (
    {
        offset = 0,
        limit = 5
    }
) => {
    return function (dispatch) {
        try {
            const params = {
                offset,
                limit
            }
            api(basePath + '/articles', params)
                .then(async (response) => {
                    const {articles, articlesCount} = await response.json()
                    dispatch(setPosts(articles))
                    dispatch(setTotalPosts(articlesCount))
                })
        } catch (e) {
            console.log(e)
        } finally {

        }
    }
}

export const registerUser = async(cfg) => {
    const params = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cfg)
      }
    return fetch(basePath + '/users', params)
    .then(response => response.json())
}

export const loginUser = async(cfg) => {
    const params = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cfg)
      }
    return fetch(basePath + '/users/login', params)
    .then(response => response.json())
}

export const getUser = async(token) => {
    const params = {
        headers: {
            Authorization: `Token ${token}`,
          },
    }
    return fetch(basePath + '/user', params)
    .then(response => response.json())
}

export const editUser = async(cfg) => {
    const token = window.localStorage.getItem('token')
    const params = {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`
        },
        body: JSON.stringify(cfg)
      }
    return fetch(basePath + '/user', params)
    .then(response => response.json())
}