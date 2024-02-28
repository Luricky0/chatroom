import React, {useEffect, useState} from "react";
import {HeartOutlined, HeartTwoTone} from "@ant-design/icons";
import {usePosts} from "../contexts/PostsProvider";
export default function Like(props){
    const {handleLike}=usePosts()
    const [isLiked,setIsLiked] = useState(props.post.isLiked)
    const handleLikeClick=()=>{
        handleLike(props.post)
        setIsLiked(props.post.isLiked)
    }
    if(isLiked===true)
    {
        return(
            <HeartTwoTone twoToneColor="red" onClick={handleLikeClick}/>
        )
    }else{
        return (
            <HeartOutlined onClick={handleLikeClick} />
        )
    }
}