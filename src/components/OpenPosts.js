import React, {useState} from "react";
import {usePosts} from "../contexts/PostsProvider";
import {Avatar, Button, Form, Input, Modal} from "antd";
import PostImageUpload from "./PostImageUpload";
import {useContacts} from "../contexts/ContactsProvider";
import {UserOutlined, HeartOutlined} from "@ant-design/icons";
import "../less/OpenPosts.less"
import Like from "../smallComponents/Like";
export default function OpenPosts(){
    const {posts,addPostToPosts} = usePosts()
    const {getNameById}=useContacts()
    const [isModalOpen,setIsModalOpen] = useState(false)
    const [currentUploadSrc, setCurrentUploadSrc]=useState()
    const onFinish=({text})=>{
        if(currentUploadSrc!=null){
            const id=localStorage.getItem('chat-id').slice(1,-1)
            addPostToPosts({id, currentUploadSrc, text})
        }
    }

    return(
        <div className={'View'}>
            <Modal open={isModalOpen} title={"发布瞬间"}
                   onCancel={()=>{setIsModalOpen(false)}}
                   cancelButtonProps={{style:{display:'none'}}}
                   okButtonProps={{style:{display:'none'}}}>
                <Form onFinish={onFinish}>
                    <Form.Item>
                        <PostImageUpload setCurrentUploadSrc={setCurrentUploadSrc}/>
                    </Form.Item>
                    <Form.Item name='text'>
                        <Input/>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType={'submit'}>发布</Button>
                    </Form.Item>
                </Form>
            </Modal>
            <h1>瞬间</h1>
            <Button onClick={()=>setIsModalOpen(true)}>发布</Button>
            <div>
                {posts.map(post=>{
                    return(
                        <div className={'Post'}>
                            <Avatar shape="circle" size={32} icon={<UserOutlined />}
                                    src={`http://localhost:4998/avatar?id=${post.posterId}`}/>
                            <span className={'PostTitle'}>{getNameById(post.posterId)}</span>
                            <div className={'Text'}> {post.text}</div>
                            <div className={'Photo'}>
                                <img src={post.imgSrc}/>
                            </div>
                            <div className={'Interactions'}>
                                {post.likedBy&&post.likedBy.length}
                                <Like post={post}/>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}