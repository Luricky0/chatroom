import React, {useState} from "react";
import Sider from "antd/es/layout/Sider";
import {Button, Menu} from "antd";
import Conversations from "./Conversations";
import {NewConversationsModal} from "./NewConversationsModal";
import {NewContactsModal} from "./NewContactsModal";
import Contacts from "./Contacts";
import {
    PlusOutlined, DeleteOutlined,MessageOutlined, ContactsOutlined, UserAddOutlined
} from '@ant-design/icons';
import '../less/Sidebars.less'
import {DeleteConversationsModal} from "./DeleteConversationsModal";

const menuItems=[
    {
        key: 'Conversations',
        icon: <MessageOutlined style={{fontSize:'22px',paddingLeft:'10px'}} />
    },
    {
        label: '',
        key: 'Contacts',
        icon: <ContactsOutlined style={{fontSize:'22px',paddingLeft:'10px'}} />
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
                <Button onClick={()=>setIsModalOpen(true)}>
                    {conversationsIsOpen?<PlusOutlined />:<UserAddOutlined />}
                </Button>
                {conversationsIsOpen&&<Button onClick={()=>setIsDeleteModalOpen(true)}>
                    <DeleteOutlined />
                </Button>}

            </div>
            <div className={'BottomMenu'}>
                {conversationsIsOpen
                    ?<NewConversationsModal open={isModalOpen} setOpen={setIsModalOpen}/>
                    :<NewContactsModal open={isModalOpen} setOpen={setIsModalOpen}/>}
                {conversationsIsOpen&&
                    <DeleteConversationsModal open={isDeleteModalOpen} setOpen={setIsDeleteModalOpen}/>}
            </div>
        </Sider>
    )
}