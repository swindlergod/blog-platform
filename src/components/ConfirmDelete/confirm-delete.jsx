import React from 'react'
import { Button, message, Popconfirm } from 'antd'
import { useNavigate } from 'react-router-dom'

import { deletePost } from '../../services/api'

export default function ConfirmDelete({ slug }) {
  const navigate = useNavigate()

  const confirm = async () => {
    await deletePost(slug)
    navigate('/')
    message.success('Article was successfully deleted')
  }

  return (
    <Popconfirm
      title="Delete the article"
      description="Are you sure to delete this article?"
      onConfirm={confirm}
      okText="Yes"
      cancelText="No"
      placement="right"
    >
      <Button danger>Delete</Button>
    </Popconfirm>
  )
}
