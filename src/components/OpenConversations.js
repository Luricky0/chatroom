import React, {useState} from "react";
import {Button, Form, Input, message} from "antd";
import TextArea from "antd/es/input/TextArea";
import {useConversations} from "../contexts/ConversationsProvider";
import {EnterOutlined} from '@ant-design/icons';
import '../less/OpenConversations.less'
export default function OpenConversations(){
    const {sendMessage, selectedConversation}=useConversations()
    const [message,setMessage]=useState("");
    const onFinish=()=>{
        if(message.trim().length !== 0){
            sendMessage(selectedConversation.recipients.map(r=>r.id), message)
            setMessage("")
        }else{
            setMessage("")
        }
    }
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
            <div className={'ChatBox'}>

                {selectedConversation.messages.map((message,index)=>showText(message))}
            </div>
        )
    }
    return(
        <div style={{height:'100%'}}>
            <div className={'Title'}><p>{selectedConversation.recipients.map(r=>(r.name+" ")).join(', ')}</p></div>
            {messagesDiv()}
            <div className={'TypeArea'}>
                <TextArea size={"large"} value={message} onChange={(e)=>{setMessage(e.target.value)}}/>
                <Button onClick={onFinish}><EnterOutlined/></Button>
            </div>
        </div>
    )
}