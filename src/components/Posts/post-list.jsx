import React, { useEffect } from "react";
import Post from "../Post/post";
import './post-list.css'
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../utils/api";

export default function Posts() {

    const dispatch = useDispatch()
    const posts = useSelector(state => state.toolkit.posts[0])
    const {loading} = useSelector(state => state.toolkit)


    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    return (
        <div className="post-list">
        {loading && posts.map((post) => {
            return <Post key={'id' + Math.random()*10000}/>
        })}
        <Pagination defaultCurrent={1} total={50} />
        </div>
    )
}