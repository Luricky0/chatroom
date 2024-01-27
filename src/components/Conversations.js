import React, {useState} from "react";
import {Dropdown, List, Menu, Popconfirm} from "antd";
import {useConversations} from "../contexts/ConversationsProvider";
import SubMenu from "antd/es/menu/SubMenu";
export default function Conversations(){
    const {conversations, setConversationIndex, deleteOneConversation} = useConversations()
    const [selectedIndex,setSelectedIndex]=useState('0')
    const menuItems = conversations.map((conversation, index)=>{
        return{
            label: conversation.recipients.map(recipient=>recipient.name).join(', '),
            key: index+""
        }})
    const onMenuClick=({key})=>{
        setSelectedIndex(key)
        setConversationIndex(key)
    }

    const getMenuItem=(menuItem)=>{
        if(menuItem.key===selectedIndex){
            return(
                <Popconfirm title="删除会话"
                            description="要删除这个会话吗?"
                            onConfirm={()=>{deleteOneConversation(menuItem.key)}}
                            onCancel={()=>{}}
                            okText="确定"
                            cancelText="取消">
                    <Menu.Item key={menuItem.key}>{menuItem.label}</Menu.Item>
                </Popconfirm>
            )
        }else{
            return (
                <Menu.Item key={menuItem.key} onClick={onMenuClick}>{menuItem.label}</Menu.Item>
            )
        }
    }

    return(
        <>
            <Menu
                  defaultSelectedKeys={selectedIndex}
            >
                {menuItems.map((menuItem) => (
                    getMenuItem(menuItem)
                ))}
            </Menu>
        </>


    )
}