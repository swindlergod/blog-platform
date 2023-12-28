/* eslint-disable no-nested-ternary */
// eslint-disable-next-line import/order
import React from 'react'
import './post.css'

import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import textTruncate from '../../services/truncate'
import { setLike, deleteLike, getPosts } from '../../services/api'

export default function Post({ title, desc, tags, slug, username, avatar, favorited, favoritesCount }) {
  const dispatch = useDispatch()

  const handleClick = async () => {
    await setLike(slug)
    await dispatch(getPosts({}))
  }

  const handleDelete = async () => {
    await deleteLike(slug)
    await dispatch(getPosts({}))
  }

  return (
    <div className="post">
      <div className="post__content">
        <div className="content__title">
          <Link to={`/articles/${slug}`} className="title__text">
            {textTruncate(title, 50)}
          </Link>
          {favorited ? (
            <HeartFilled className="liked" onClick={() => handleDelete()} />
          ) : (
            <HeartOutlined onClick={() => handleClick()} />
          )}
          <p className="title__likes">{favoritesCount}</p>
        </div>

        <div className="content__tags">
          {tags.map((tag) =>
            tag ? (
              tag.length ? (
                <div key={Math.random() * 121141} className="tags__tag">
                  {tag}
                </div>
              ) : null
            ) : null
          )}
        </div>
        <p className="content__preview">{textTruncate(desc, 220)}</p>
      </div>
      <div className="post__info">
        <div className="info__user">
          <p className="user__nickname">{username}</p>
          <p className="user__date">March 5, 2020</p>
        </div>
        <img src={avatar} alt="avatar" className="info__avatar" />
      </div>
    </div>
  )
}
