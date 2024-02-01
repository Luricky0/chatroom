import React, {useState} from "react";
import {Button, Checkbox, Col, Form, message, Modal, Row} from "antd";
import {useContacts} from "../contexts/ContactsProvider";
import {useConversations} from "../contexts/ConversationsProvider";
import '../less/NewModal.less'

export function DeleteConversationsModal(props){
    const {conversations, deleteConversations}=useConversations()
    const onFinish=({selected})=>{
        deleteConversations(selected)
        props.setOpen(false)
        // else message.info('请选择至少一个')
    }
    return(
        <Modal open={props.open} title={"批量删除会话"}
               onCancel={()=>{props.setOpen(false)}}
               cancelButtonProps={{style:{display:'none'}}}
               okButtonProps={{style:{display:'none'}}}
               okText={'确定'}>
            <Form onFinish={onFinish}>
                <Form.Item name="selected">
                    <Checkbox.Group style={{ width: '100%' }} >
                        <Row>
                            {conversations.map(conversation=>(
                                <Col span={16}>
                                <Checkbox value={conversation.recipients}>{conversation.recipients.map(r=>r.name).join(", ")}</Checkbox>
                                </Col>
                            ))}
                        </Row>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item><Button htmlType={'submit'}>确定</Button></Form.Item>
            </Form>

        </Modal>
    )
}