import React, {useEffect, useState} from "react";
import {Dropdown, List, Menu, Popconfirm} from "antd";
import {useConversations} from "../contexts/ConversationsProvider";

export default function Conversations(){
    const {conversations, setConversationIndex, deleteOneConversation,selectedConversationIndex} = useConversations()

    const menuItems = conversations.map((conversation, index)=>{
        return{
            // label: conversation.recipients.map(recipient=>recipient.name).join(', '),
            label: conversation.name===''?conversation.recipients.map(recipient=>recipient.name).join(', '):conversation.name,
            key: index+"",
            unread: conversation.unread
        }})

    const onMenuClick=({key})=>{
        setConversationIndex(parseInt(key))
    }

    const getMenuItem=(menuItem)=>{
        if(Number(menuItem.key)===selectedConversationIndex){
            return(
                <Popconfirm title="删除会话"
                            description="要删除这个会话吗?"
                            onConfirm={()=>{deleteOneConversation(menuItem.key)}}
                            onCancel={()=>{}}
                            okText="确定"
                            cancelText="取消">
                    <Menu.Item key={menuItem.key}>
                        {menuItem.label}
                    </Menu.Item>
                </Popconfirm>
            )
        }else{
            return (
                <Menu.Item key={menuItem.key} onClick={onMenuClick}>
                    {menuItem.label}
                    {menuItem.unread>0 && <div style={{display:'inline-block',float:"right",color:'red'}}>
                        {menuItem.unread}
                    </div>}
                </Menu.Item>
            )
        }
    }

    return(
        <>
            <Menu selectedKeys={[selectedConversationIndex+'']}>
                {menuItems.map((menuItem) => (
                    getMenuItem(menuItem)
                ))}
            </Menu>
        </>
    )
}