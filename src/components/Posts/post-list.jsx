/* eslint-disable import/order */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from 'antd'

import Post from '../Post/post'
import './post-list.css'

import { getPosts } from '../../services/api'

export default function Posts() {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.toolkit.posts)
  const totalPosts = useSelector((state) => state.toolkit.totalPosts)
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    dispatch(getPosts({ offset: 5 * page - 5 }))
  }

  useEffect(() => {
    dispatch(getPosts({}))
  }, [dispatch])

  return (
    <div className="post-list">
      {posts?.map((post) => (
        <Post
          key={post.slug}
          title={post.title}
          desc={post.description}
          createdAt={post.createdAt}
          updatedAt={post.updatedAt}
          body={post.body}
          slug={post.slug}
          tags={post.tagList}
          favoritesCount={post.favoritesCount}
          favorited={post.favorited}
          username={post.author.username}
          avatar={post.author.image}
          currentPage={currentPage}
        />
      ))}
      <Pagination pageSize={5} total={totalPosts} onChange={handlePageChange} showSizeChanger={false} />
    </div>
  )
}
