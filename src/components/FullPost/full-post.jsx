import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {HeartOutlined} from '@ant-design/icons';
import Markdown from "react-markdown";
import './full-post.css'

export default function FullPost() {
    const { slug } = useParams()
    const [post, setPost] = useState(null)

    useEffect(() => {
        fetch(`https://blog.kata.academy/api/articles/${slug}`)
        .then(res => res.json())
        .then(data => setPost(data.article))
    }, [slug])

    return (
        <div className="post-list">
            {post && (
                <div className="post post-full">
                <div className="post__content">
                    <div className="content__title content__title-full">
                        <p className="title__text title__text-full">{post.title}</p>
                        <HeartOutlined/>
                        <p className="title__likes">{post.favoritesCount}</p>
                    </div>
    
                    <div className="content__tags">{post.tagList.map(tag => {
                    return tag ? tag.length ? <div key={Math.random()*121141} className="tags__tag">{tag}</div> : null : null
                })}</div>
                    <p className="content__preview content__preview-full">{post.description}</p> 
                    <Markdown className='content__body'>{post.body}</Markdown>             
                </div>                
                <div className="post__info">
                    <div className="info__user">
                    <p className="user__nickname">{post.author.username}</p>
                        <p className="user__date">March 5, 2020</p>
                    </div>
                    <img src={post.author.image} alt="avatar" className="info__avatar"/>
                </div>
            </div> 
            )}
            
        </div>
    )
}