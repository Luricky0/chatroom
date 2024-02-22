import React, {useState} from "react";
import {usePosts} from "../contexts/PostsProvider";
import {Avatar, Button, Form, Input, Modal} from "antd";
import PostImageUpload from "./PostImageUpload";
import {useContacts} from "../contexts/ContactsProvider";
import {UserOutlined, HeartOutlined, PlusOutlined, NumberOutlined} from "@ant-design/icons";
import "../less/OpenPosts.less"
import Like from "../smallComponents/Like";
export default function OpenPosts(){
    const {posts,sendPost} = usePosts()
    const {getNameById}=useContacts()
    const [isModalOpen,setIsModalOpen] = useState(false)
    const [currentUploadSrc, setCurrentUploadSrc]=useState()
    const onFinish=({text})=>{
        if(currentUploadSrc!=null){
            // const id=localStorage.getItem('chat-id').slice(1,-1)
            sendPost(currentUploadSrc,text)
            // addPostToPosts({posterId:id, imgSrc:currentUploadSrc, text:text})
            setIsModalOpen(false)
        }
    }

    return(
        <div className={'View'}>
            <h1><NumberOutlined/>瞬间</h1>
            <div className={'Content'}>
                <div>
                    {posts.map(post=>{
                        // const posterId = post.posterId?post.posterId:"";
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
                                    <Like post={post}/>
                                    <span style={{marginLeft:'4px',fontSize:'14px'}}>
                                        {post.likedBy&&post.likedBy.map(liker=>getNameById(liker)).join(", ")}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <button className={'AddButton'} onClick={()=>setIsModalOpen(true)}>
                    <PlusOutlined/>
                </button>

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
            </div>


            {/*<div className={'Footer'}>*/}
            {/*   */}
            {/*</div>*/}

        </div>
    )
}