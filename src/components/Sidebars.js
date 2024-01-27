import React, {useState} from "react";
import Sider from "antd/es/layout/Sider";
import {Button, Menu} from "antd";
import Conversations from "./Conversations";
import {NewConversationsModal} from "./NewConversationsModal";
import {NewContactsModal} from "./NewContactsModal";
import Contacts from "./Contacts";
import {
    PlusOutlined, DeleteOutlined
} from '@ant-design/icons';
import '../less/Sidebars.less'
import {DeleteConversationsModal} from "./DeleteConversationsModal";

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
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const conversationsIsOpen = current==='Conversations'
    const onMenuClick = (e) => {
        setCurrent(e.key);
    };

    return(
        <Sider>
            <div className={'TopMenu'}>
                <Menu onClick={onMenuClick}
                      selectedKeys={current}
                      mode="horizontal"
                      items={menuItems}
                />
            </div>
            <div className={'MidMenu'}>
                {conversationsIsOpen?<Conversations/>:<Contacts id={id}/>}
                <Button onClick={()=>setIsModalOpen(true)}><PlusOutlined /></Button>
                <Button onClick={()=>setIsDeleteModalOpen(true)}><DeleteOutlined /></Button>
            </div>
            <div className={'BottomMenu'}>
                {conversationsIsOpen
                    ?<NewConversationsModal open={isModalOpen} setOpen={setIsModalOpen}/>
                    :<NewContactsModal open={isModalOpen} setOpen={setIsModalOpen}/>}
                {conversationsIsOpen
                    ?<DeleteConversationsModal open={isDeleteModalOpen} setOpen={setIsDeleteModalOpen}/>
                    :<NewContactsModal open={isModalOpen} setOpen={setIsModalOpen}/>}
            </div>
        </Sider>
    )
}