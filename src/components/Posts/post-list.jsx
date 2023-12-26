import React, {useEffect} from "react";
import Post from "../Post/post";
import './post-list.css'
import {Pagination} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../../services/api";

export default function Posts() {
    const dispatch = useDispatch()
    const posts = useSelector(state => state.toolkit.posts)
    const totalPosts = useSelector(state => state.toolkit.totalPosts)

    const handlePageChange = (page) => {
        dispatch(getPosts({offset: 5 * page - 5}))
    }


    useEffect(() => {
        dispatch(getPosts({}))
    }, [dispatch])

    return (
        <div className="post-list">
            {posts?.map((post) => {
                return <Post
                    key={post.slug}
                    title={post.title}
                    desc={post.description}
                    createdAt={post.createdAt}
                    updatedAt={post.updatedAt}
                    body={post.body}
                    slug={post.slug}
                    tags={post.tagList}
                    favoritesCount={post.favoritesCount}
                    username={post.author.username}
                    avatar={post.author.image}
                />
            })}
            <Pagination pageSize={5} total={totalPosts} onChange={handlePageChange} showSizeChanger={false}/>
        </div>
    )
}