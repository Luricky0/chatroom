import React from "react";
import {List, Menu} from "antd";
import {useConversations} from "../contexts/ConversationsProvider";
export default function Conversations(){
    const {conversations, setConversationIndex} = useConversations()
    const menuItems=conversations.map((conversation, index)=>{
        return{
            label: conversation.recipients.map(recipient=>recipient.name).join(', '), key: index}})
    const onMenuClick=({key})=>{
        setConversationIndex(key)
    }
    return(
        <div>
            <Menu onClick={onMenuClick}
                  selectedKey={0}
                  items={menuItems}
                  theme={'dark'}

            />
        </div>
    )
}