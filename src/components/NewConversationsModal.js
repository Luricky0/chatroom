import React, {useState} from "react";
import {Button, Checkbox, Col, Form, message, Modal, Row} from "antd";
import {useContacts} from "../contexts/ContactsProvider";
import {useConversations} from "../contexts/ConversationsProvider";
import '../less/NewModal.less'

export function NewConversationsModal(props){
    const {contacts} = useContacts()
    const {conversations, createConversations}=useConversations()
    const onFinish=({recipients})=>{
        let res=createConversations(recipients)
        props.setOpen(false)
        if(res===false) message.info("已存在该会话")
    }
    return(
        <Modal open={props.open} title={"新建会话"}
                  onCancel={()=>{props.setOpen(false)}}
                  cancelButtonProps={{style:{display:'none'}}}
                  okButtonProps={{style:{display:'none'}}}
                  okText={'确定'}>
            <Form onFinish={onFinish}>
                <Form.Item name="recipients">
                    <Checkbox.Group style={{ width: '100%' }}>
                        {contacts.map(contact=>(
                            <Col span={16}>
                                <Checkbox
                                    className={'mycheckbox'}
                                    value={contact.id}>
                                    {contact.name}
                                </Checkbox>
                            </Col>
                        ))}
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item><Button htmlType={'submit'}>确定</Button></Form.Item>
            </Form>

        </Modal>
    )
}