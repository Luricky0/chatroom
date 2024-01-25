import React, {useState} from "react";
import Sider from "antd/es/layout/Sider";
import {Button, Menu, Modal} from "antd";
import Conversations from "./Conversations";
import {NewConversationsModal} from "./NewConversationsModal";
import {NewContactsModal} from "./NewContactsModal";
import Contacts from "./Contacts";
const menuItems=[
    {
        label: '会话',
        key: 'Conversations'
    },
    {
        label: '联系人',
        key: 'Contacts'
    }
]
export default function Sidebars({id}){
    const [current, setCurrent] = useState('Conversations')
    const [isModalOpen, setIsModalOpen] = useState(false)

    const conversationsIsOpen = current==='Conversations'
    const onMenuClick = (e) => {
        setCurrent(e.key);
    };

    return(
        <Sider>
            <Menu onClick={onMenuClick} selectedKeys={[current]} mode="horizontal" items={menuItems}/>
            {conversationsIsOpen?<Conversations/>:<Contacts/>}
            <Button onClick={()=>setIsModalOpen(true)}>{conversationsIsOpen?'新建会话':'新建联系人'}</Button>
            {conversationsIsOpen
                ?<NewConversationsModal open={isModalOpen} setOpen={setIsModalOpen}/>
                :<NewContactsModal open={isModalOpen} setOpen={setIsModalOpen}/>}
            <p style={{color:'white'}}>your id:{id}</p>
        </Sider>
    )
}