import React, {useRef, useState} from "react";
import {useContacts} from "../contexts/ContactsProvider";
import {Avatar, Button, Input, List, Menu, message, Modal, Popconfirm} from "antd";
import {RightOutlined, UserOutlined} from '@ant-design/icons'
import EditContactModal from "./EditContactModal";
import "../less/Contacts.less"
import EditAvatarModal from "./EditAvatarModal";
import {ProfileModal} from "./ProfileModal";
export default function Contacts({id}){
    const {contacts,deleteContact}=useContacts()
    const [isModalOpen,setIsModalOpen] = useState(false)
    const [isEditContactModalOpen,setIsEditContactModalOpen] = useState(false)
    const [isAvatarModalOpen,setIsAvatarModalOpen] = useState(false)
    const [isProfileModalOpen,setIsProfileModalOpen] = useState(false)
    const contactRef = useRef({id:"",name:""})
    const showProfile=(c)=>{
        contactRef.current=c
        setIsModalOpen(true)
    }
    const onDeleteContactConfirm=()=>{
        deleteContact(contactRef.current.id)
        setIsModalOpen(false)
    }
    return (
        <div>
            <div className={'AvatarDiv'}>
                <Avatar shape="square" size={48} icon={<UserOutlined />}
                        src={`http://localhost:4998/avatar?id=${id}`}
                        onClick={()=>setIsProfileModalOpen(true)}/>
            </div>
            {/*<Button onClick={() => setIsAvatarModalOpen(true)}>修改头像</Button>*/}
            <List
                itemLayout="horizontal"
                dataSource={contacts}
                renderItem={contact => (
                    <List.Item key={contact.id} onClick={() => showProfile(contact)}>
                        <Avatar shape="square" size={32}
                                src={`http://localhost:4998/avatar?id=${contact.id}`}
                                icon={<UserOutlined />}/>
                        {contact.name}
                    </List.Item>)}
            >
            </List>


            <Modal open={isModalOpen}
                   onCancel={() => {
                       setIsModalOpen(false)
                   }}
                   cancelButtonProps={{style: {display: 'none'}}}
                   okButtonProps={{style: {display: 'none'}}}>
                <div className={'ProfileModal'}>
                    <h1>{contactRef.current.name}</h1>
                    <h3>Chat ID: {contactRef.current.id}</h3>
                    <div>
                        <Button type={'text'} onClick={() => setIsEditContactModalOpen(true)}>
                            修改备注
                            <RightOutlined/>
                        </Button>
                        <Popconfirm title="删除联系人"
                                    description="要删除这个联系人吗?"
                                    onConfirm={onDeleteContactConfirm}
                                    onCancel={() => {
                                    }}
                                    okText="确定"
                                    cancelText="取消"
                                    placement={'bottom'}>
                            <Button type={'text'} danger>
                                删除联系人
                                <RightOutlined/>
                            </Button>
                        </Popconfirm>
                    </div>
                </div>
            </Modal>

            <EditContactModal
                isModalOpen={isEditContactModalOpen}
                setIsModalOpen={setIsEditContactModalOpen}
                id={contactRef.current.id}/>

            <EditAvatarModal
                isModalOpen={isAvatarModalOpen}
                setIsModalOpen={setIsAvatarModalOpen}
                id={id}/>

            <ProfileModal
                isModalOpen={isProfileModalOpen}
                setIsModalOpen={setIsProfileModalOpen}
                id={id}
            />

        </div>
    );
}