import React from "react";
import './post.css'
import avatar from './avatar.svg'
import { HeartOutlined } from '@ant-design/icons';

export default function Post() {
    return (
        <>
        <div className="post">
            <div className="post__content">
                <div className="content__title"> 
                    <p className="title__text">Some article title </p>
                    <HeartOutlined />
                    <p className="title__likes">15</p>
                </div>
                
                <div className="content__tags">Tag1</div>
                <p className="content__preview">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris  nisi ut aliquip ex ea commodo consequat. </p>
            </div>
            <div className="post__info">
                <div className="info__user">
                    <p className="user__nickname">John Sins</p>
                    <p className="user__date">March 5, 2020</p>
                </div>                
                <img src={avatar} alt="avatar" className="info__avatar"/>
            </div>
        </div>
        </>
    )
}