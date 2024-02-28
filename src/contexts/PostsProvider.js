import React, { useContext, useEffect, useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import { useContacts } from "./ContactsProvider"
import { v4 as uuidV4 } from "uuid"
import { useSocket } from "./SocketProvider"
const PostsContext = React.createContext()
export function usePosts () {
    return useContext(PostsContext)
}
export function PostsProvider ({ children }) {
    const { contacts } = useContacts()
    const socket = useSocket()
    const [posts, setPosts] = useLocalStorage('posts', [])
    const [openPosts, setOpenPosts] = useState(false)
    const addPostToPosts = (post) => {
        const newPosts = [post, ...posts]
        setPosts(newPosts)
    }

    const addLikeToPost = ({ UUID, likerId }) => {
        console.log('addlike')
        const newPosts = posts.map(post => {
            if (post.UUID === UUID) {
                post.likedBy = [...post.likedBy, likerId]
            }
            return post
        })
        setPosts(newPosts)
    }

    const removeLikeToPost = ({ UUID, dislikerId }) => {
        const newPosts = posts.map(post => {
            if (post.UUID === UUID) {
                const newLikedBy = post.likedBy.filter(likerId => likerId !== dislikerId)
                post.likedBy = newLikedBy
            }
            return post
        })
        setPosts(newPosts)
    }

    useEffect(() => {
        if (socket == null) return
        socket.on('receive-post', addPostToPosts)
        return () => socket.off('receive-post')
    }, [socket, addPostToPosts])

    useEffect(() => {
        if (socket == null) return
        socket.on('receive-like', addLikeToPost)
        return () => socket.off('receive-like')
    }, [socket, addLikeToPost])

    useEffect(() => {
        if (socket == null) return
        socket.on('cancel-like', removeLikeToPost)
        return () => socket.off('cancel-like')
    }, [socket, removeLikeToPost])

    const handleLike = (post) => {
        const likerId = localStorage.getItem('chat-id').slice(1, -1)
        post.isLiked = !post.isLiked

        if (post.isLiked) {
            socket.emit('like-post', { ...post, likerId })
        } else {
            socket.emit('dislike-post', { ...post, dislikerId: likerId })
        }

    }

    const sendPost = (imgSrc, text) => {
        const newPost = {
            UUID: uuidV4(),
            posterId: localStorage.getItem('chat-id').slice(1, -1),
            recipients: contacts.map(contact => contact.id),
            imgSrc: imgSrc,
            text: text,
            isLiked: false,
            likedBy: [],
            comments: []
        }
        socket.emit('send-post', newPost)
        addPostToPosts(newPost)
    }

    //comment相关
    const addCommentToPost = (data) => {
        const { UUID, commenterId, text } = data
        const newPosts = posts.map(post => {
            if (post.UUID === UUID) {
                post.comments.push({ id: commenterId, text: text })
            }
            return post
        })
        setPosts(newPosts)
    }

    useEffect(() => {
        if (socket == null) return
        socket.on('receive-comment', addCommentToPost)
        return () => socket.off('receive-comment')
    }, [socket, addCommentToPost])

    const sendComment = (postUUID, text) => {
        let data
        posts.forEach(post => {
            if (post.UUID === postUUID) {
                data = {
                    UUID: post.UUID,
                    posterId: post.posterId,
                    recipients: post.recipients,
                    text: text,
                    commenterId: localStorage.getItem('chat-id').slice(1, -1)
                }
                console.log('sendcomment', data)
            }
        })
        addCommentToPost(data)
        socket.emit('send-comment', data)

    }

    const value = {
        openPosts,
        setOpenPosts,
        posts,
        addPostToPosts,
        handleLike,
        sendPost,
        sendComment
    }

    return (
        <PostsContext.Provider value={value}>
            {children}
        </PostsContext.Provider>
    )
}
