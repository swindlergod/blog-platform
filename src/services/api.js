import { setPosts, setTotalPosts } from '../toolkitRedux/toolkitSlice'

const basePath = 'https://blog.kata.academy/api'
const api = async (url, params = {}, cfg = {}) => {
  const fetchSettings = Object.keys(params).length ? `?${new URLSearchParams(params)}` : ''
  return fetch(url + fetchSettings, cfg)
}
export const getPosts = ({ offset = 0, limit = 5 }) => {
  const token = window.localStorage.getItem('token')
  const cfg = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }
  return function dispatcher(dispatch) {
    try {
      const params = {
        offset,
        limit,
      }
      api(`${basePath}/articles`, params, cfg).then(async (response) => {
        const { articles, articlesCount } = await response.json()
        dispatch(setPosts(articles))
        dispatch(setTotalPosts(articlesCount))
      })
    } catch (e) {
      throw new Error(e)
    }
  }
}

export const registerUser = async (cfg) => {
  const params = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cfg),
  }
  return fetch('https://blog.kata.academy/api/users', params).then(async (response) => {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(await response.json().then((data) => data.errors))
  })
}

export const loginUser = async (cfg) => {
  const params = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cfg),
  }
  return fetch(`${basePath}/users/login`, params).then(async (response) => {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(await response.json().then((data) => data.errors))
  })
}

export const getUser = async (token) => {
  const params = {
    headers: {
      Authorization: `Token ${token}`,
    },
  }
  return fetch(`${basePath}/user`, params).then((response) => response.json())
}

export const editUser = async (cfg) => {
  const token = window.localStorage.getItem('token')
  const params = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(cfg),
  }
  return fetch(`${basePath}/user`, params).then(async (response) => {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(await response.json().then((data) => data.errors))
  })
}

export const addPost = async (cfg) => {
  const token = window.localStorage.getItem('token')
  const params = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(cfg),
  }
  return fetch(`${basePath}/articles`, params)
}

export const editPost = async (cfg, slug) => {
  const token = window.localStorage.getItem('token')
  const params = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(cfg),
  }
  return fetch(`${basePath}/articles/${slug}`, params)
}

export const deletePost = async (slug) => {
  const token = window.localStorage.getItem('token')
  const params = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }
  return fetch(`${basePath}/articles/${slug}`, params)
}

export const setLike = async (slug) => {
  const token = window.localStorage.getItem('token')
  const params = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }
  return fetch(`${basePath}/articles/${slug}/favorite`, params).then((res) => res.json())
}

export const deleteLike = async (slug) => {
  const token = window.localStorage.getItem('token')
  const params = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }
  return fetch(`${basePath}/articles/${slug}/favorite`, params).then((res) => res.json())
}
