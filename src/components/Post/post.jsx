import React from "react";
import './post.css'
import {HeartOutlined} from '@ant-design/icons';
import { textTruncate } from '../../services/truncate'
import { Link } from "react-router-dom";

export default function Post({title, desc, tags, slug, favoritesCount, username, avatar}) {
    return (
        <div className="post">
            <div className="post__content">
                <div className="content__title">
                    <Link to={`/articles/${slug}`} className="title__text">{textTruncate(title, 50)}</Link>
                    <HeartOutlined/>
                    <p className="title__likes">{favoritesCount}</p>
                </div>

                <div className="content__tags">{tags.map(tag => {
                    return tag ? tag.length ? <div key={Math.random()*121141} className="tags__tag">{tag}</div> : null : null
                })}</div>
                <p className="content__preview">{textTruncate(desc, 220)}</p>                
            </div>
            <div className="post__info">
                <div className="info__user">
                    <p className="user__nickname">{username}</p>
                    <p className="user__date">March 5, 2020</p>
                </div>
                <img src={avatar} alt="avatar" className="info__avatar"/>
            </div>
        </div> 
    )
}