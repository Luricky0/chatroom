import React, { useRef, useState } from "react"
import { usePosts } from "../contexts/PostsProvider"
import { Avatar, Button, Form, Input, Modal } from "antd"
import PostImageUpload from "./PostImageUpload"
import { useContacts } from "../contexts/ContactsProvider"
import { UserOutlined, HeartOutlined, PlusOutlined, NumberOutlined, CommentOutlined, SendOutlined } from "@ant-design/icons"
import "../less/OpenPosts.less"
import Like from "../smallComponents/Like"
import Comments from "../smallComponents/Comments"
export default function OpenPosts () {
    const { posts, sendPost, sendComment } = usePosts()
    const { getNameById } = useContacts()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentUploadSrc, setCurrentUploadSrc] = useState()
    const [isCommentInputShow, setIsCoomentInputShow] = useState(false)
    const [selectedPostUUID, setSelectedPostUUID] = useState()
    const commentInput = useRef()
    const onFinish = ({ text }) => {
        if (currentUploadSrc != null) {
            // const id=localStorage.getItem('chat-id').slice(1,-1)
            sendPost(currentUploadSrc, text)
            // addPostToPosts({posterId:id, imgSrc:currentUploadSrc, text:text})
            setIsModalOpen(false)
        }
    }
    const onSendCommentButtonClick = () => {
        if (selectedPostUUID != null) {
            const text = commentInput.current.value
            sendComment(selectedPostUUID, text)
            setIsCoomentInputShow(false)
        }
    }

    return (
        <div className={'View'}>
            <h1><NumberOutlined />瞬间</h1>

            <div className={'Content'}>
                <div>
                    {posts.map(post => {
                        // const posterId = post.posterId?post.posterId:"";
                        return (
                            <div className={'Post'}>
                                <Avatar shape="circle" size={32} icon={<UserOutlined />}
                                    src={`http://localhost:4998/avatar?id=${post.posterId}`} />
                                <span className={'PostTitle'}>{getNameById(post.posterId)}</span>
                                <div className={'Text'}> {post.text}</div>
                                <div className={'Photo'}>
                                    <img src={post.imgSrc} />
                                </div>
                                <div className={'Interactions'}>

                                    <CommentOutlined onClick={() => {
                                        setIsCoomentInputShow(!isCommentInputShow)
                                        setSelectedPostUUID(post.UUID)
                                    }} />

                                    <Like post={post} />
                                    <span style={{ marginLeft: '4px', fontSize: '14px' }}>
                                        {post.likedBy && post.likedBy.map(liker => getNameById(liker)).join(", ")}
                                    </span>
                                </div>

                                <div>

                                    {<Comments comments={post.comments} />}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <button className={'AddButton'} onClick={() => setIsModalOpen(true)}>
                    <PlusOutlined />
                </button>
                {
                    isCommentInputShow &&
                    <div className="CommentInput">
                        <input ref={commentInput} />
                        <button onClick={onSendCommentButtonClick}><SendOutlined /></button>
                    </div>
                }




                <Modal open={isModalOpen} title={"发布瞬间"}
                    onCancel={() => { setIsModalOpen(false) }}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    okButtonProps={{ style: { display: 'none' } }}>
                    <Form onFinish={onFinish}>
                        <Form.Item>
                            <PostImageUpload setCurrentUploadSrc={setCurrentUploadSrc} />
                        </Form.Item>
                        <Form.Item name='text'>
                            <Input />
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