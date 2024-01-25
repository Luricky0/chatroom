import React from "react";
import {Button, Form, Input, message} from "antd";
import TextArea from "antd/es/input/TextArea";
import {useConversations} from "../contexts/ConversationsProvider";
export default function OpenConversations(){
    const {sendMessage, selectedConversation}=useConversations()
    const onFinish=({message})=>{
        sendMessage(
            selectedConversation.recipients.map(r=>r.id),
            message)
    }
    const messagesDiv=()=>{
        if(selectedConversation.messages===[]) return(<div></div>)
        return(
            <div>
                {selectedConversation.messages.map((message,index)=>{
                    return(
                        <div key={index}>
                            <div>{message.text}</div>
                            <div>{message.fromMe?'你':message.senderName}</div>
                        </div>)})
                }
            </div>
        )
    }
    return(
        <div>
            <div>
                {messagesDiv()}
            </div>
            <Form onFinish={onFinish}>
                <Form.Item name={'message'} required><TextArea/></Form.Item>
                <Form.Item><Button htmlType={'submit'}>发送</Button></Form.Item>
            </Form>
        </div>
    )
}