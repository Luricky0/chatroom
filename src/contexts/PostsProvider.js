import React, {useContext, useEffect, useState} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import {useContacts} from "./ContactsProvider";
import {v4 as uuidV4} from "uuid";
import {useSocket} from "./SocketProvider";
const PostsContext=React.createContext()
export function usePosts(){
    return useContext(PostsContext)
}
export function PostsProvider({children}){
    const {contacts} = useContacts()
    const socket = useSocket()
    const [posts, setPosts] = useLocalStorage('posts',[])
    const [openPosts,setOpenPosts]=useState(false)
    const addPostToPosts = ({posterId, imgSrc, text})=>{
        const newPosts=
            [
                {
                    UUID:uuidV4(),
                    posterId:posterId,
                    recipients:[],
                    imgSrc:imgSrc,
                    text:text,
                    isLiked:false,
                    likedBy:[]
                }
                , ...posts]
        setPosts(newPosts)
    }

    const addLikeToPost=({UUID,likerId})=>{
        const newPosts=posts.map(post=>{
            if(post.UUID===UUID){
                post.likedBy=[...post.likedBy,likerId]
            }
        })
        setPosts(newPosts)
    }

    useEffect(()=>{
        if(socket == null) return
        socket.on('receive-post', addPostToPosts)
        socket.on('receive-like', addLikeToPost)
        return ()=>socket.off('receive-message')
    },[socket, addPostToPosts,addLikeToPost])

    const handleLike=(post)=>{
        post.isLiked = !post.isLiked
        const {posterId,UUID} = post
        const likerId=localStorage.getItem('chat-id').slice(1,-1)
        socket.emit('like-post',{posterId, UUID, likerId})
    }

    const sendPost=(post)=>{
        socket.emit('send-post',{post})
        addPostToPosts(post)
    }

    const value={
        openPosts,
        setOpenPosts,
        posts,
        addPostToPosts,
        handleLike
    }

    return(
        <PostsContext.Provider value={value}>
            {children}
        </PostsContext.Provider>
    )
}