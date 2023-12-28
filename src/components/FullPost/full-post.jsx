import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import Markdown from 'react-markdown'
import './full-post.css'
import { useSelector } from 'react-redux'

import ConfirmDelete from '../ConfirmDelete/confirm-delete'
import { setLike, deleteLike } from '../../services/api'

export default function FullPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [likes, setLikes] = useState('')
  const { isLoggedIn, currentUser } = useSelector((state) => state.user)
  const { username } = currentUser
  const token = window.localStorage.getItem('token')

  const handleClick = async () => {
    await setLike(slug).then((res) => {
      setLikes(res.article.favoritesCount)
    })
  }

  const handleDelete = async () => {
    await deleteLike(slug).then((res) => {
      setLikes(res.article.favoritesCount)
    })
  }

  useEffect(() => {
    const cfg = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    }
    fetch(`https://blog.kata.academy/api/articles/${slug}`, cfg)
      .then((res) => res.json())
      .then((data) => setPost(data.article))
  }, [slug, token, likes])

  return (
    <div className="post-list">
      {post && (
        <div className="post post-full">
          <div className="post__content">
            <div className="content__title content__title-full">
              <p className="title__text title__text-full">{post.title}</p>
              {post.favorited ? (
                <HeartFilled className="liked" onClick={() => handleDelete()} />
              ) : (
                <HeartOutlined onClick={() => handleClick()} />
              )}
              <p className="title__likes">{post.favoritesCount}</p>
            </div>

            <div className="content__tags">
              {post.tagList.map((tag) =>
                // eslint-disable-next-line no-nested-ternary
                tag ? (
                  tag.length ? (
                    <div key={Math.random() * 121141} className="tags__tag">
                      {tag}
                    </div>
                  ) : null
                ) : null
              )}
            </div>
            <p className="content__preview content__preview-full">{post.description}</p>
            <Markdown className="content__body">{post.body}</Markdown>
          </div>
          <div className="post__extra">
            <div className="post__info">
              <div className="info__user">
                <p className="user__nickname">{post.author.username}</p>
                <p className="user__date">March 5, 2020</p>
              </div>
              <img src={post.author.image} alt="avatar" className="info__avatar" />
            </div>

            {isLoggedIn && username === post.author.username && (
              <div>
                {/* <button className="info__button button__delete" onClick={() => setModal(true)}>Delete</button> */}
                <ConfirmDelete className="info__button" slug={slug} />
                <Link to={`/articles/${slug}/edit`} className="info__button button__edit">
                  Edit
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
