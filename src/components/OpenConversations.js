import React, {useEffect, useRef, useState} from "react";
import {Button, Form, Input, List, message, Modal} from "antd";
import TextArea from "antd/es/input/TextArea";
import {useConversations} from "../contexts/ConversationsProvider";
import {SendOutlined, ProfileOutlined} from '@ant-design/icons';
import '../less/OpenConversations.less'
import {useContacts} from "../contexts/ContactsProvider";
export default function OpenConversations(){
    const {sendMessage, selectedConversation, setConversationName} = useConversations()
    const {getNameById}=useContacts()
    const [message,setMessage] = useState("");
    const [showEditTitle,setShowEditTitle] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const inputVal= useRef(null)
    const chatboxRef = useRef()
    const titleSpanRef= useRef()
    const onFinish=()=>{
        if(message==null||message.trim().length !== 0){
            sendMessage(selectedConversation.recipients.map(r=>r.id), message)
            setTimeout(()=>{
                chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight
            },100)
            setMessage("")
        }else{
            setMessage("")
        }
    }

    useEffect(()=>{
        setTimeout(()=>{
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight
        })
    },[selectedConversation])
    const showText=(message)=>{
        if(message.fromMe){
            return(
                <>
                    <div className={'bubble right'}>
                        <div className={'sender'}>你</div>
                        <div className={'content'}>
                            {message.text}
                        </div>
                    </div>
                </>
            )
        }else{
            return (
                <>
                    <div className={'bubble left'}>
                        <div className={'sender'}>{message.senderName}</div>
                        <div className={'content'}>
                            {message.text}
                        </div>
                    </div>
                </>
            )
        }
    }
    const messagesDiv=()=>{
        return(
            <div className={'ChatBox'} ref={chatboxRef}>
                {selectedConversation!=null&&selectedConversation.messages.map((message,index)=>showText(message))}
            </div>
        )
    }

    const getTitle=()=>{
        if(selectedConversation==null) return
        if(showEditTitle){
            return (
                <Input placeholder={'输入新会话名'} ref={inputVal}/>
            )
        }else{

            if(selectedConversation.name!=null&&selectedConversation.name!==""){
                let len=selectedConversation.recipients.length
                return selectedConversation.name+"("+len+")"
            }else{
                return selectedConversation.recipients.map(recipient=>recipient.name).join(', ')
            }
        }
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (titleSpanRef.current && !titleSpanRef.current.contains(event.target)) {
                console.log(inputVal.current.input.value)
                let newName=inputVal.current.input.value
                if(newName.trim().length!==0){
                    setConversationName(newName)
                    setShowEditTitle(false)
                }else{
                    setShowEditTitle(false)
                }
            }
        }

        if (showEditTitle) {
            document.addEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showEditTitle]);


    return(
        <div style={{height:'100%'}}>

            <div className={'Title'}>
                <div className={'Label'}
                    onClick={()=>setShowEditTitle(true)} ref={titleSpanRef}>
                    {getTitle()}
                </div>
                <button className={'Profile'} onClick={()=>setIsModalOpen(true)}>
                    <ProfileOutlined/>
                </button>
            </div>

            {messagesDiv()}

            <div className={'TypeArea'}>
                <Input value={message} onChange={(e)=>{setMessage(e.target.value)}}/>
                <Button onClick={onFinish}>
                    <SendOutlined
                        className={'icon'}
                        style={{}}/>
                </Button>
            </div>

            <Modal open={isModalOpen}
                   onCancel={()=>{setIsModalOpen(false)}}
                   cancelButtonProps={{style:{display:'none'}}}
                   okButtonProps={{style:{display:'none'}}}>
                <h2>{selectedConversation.name===""?selectedConversation.recipients.map(r=>r.name).join(", "):selectedConversation.name}
                    会话成员</h2>

                <List>
                    {selectedConversation.recipients.map(r=>(<List.Item>{r.name}</List.Item>))}
                </List>

            </Modal>
        </div>
    )
}