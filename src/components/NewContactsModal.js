import React, {useState} from "react";
import {Button, Checkbox, Form, Input, message, Modal} from "antd";
import {useContacts} from "../contexts/ContactsProvider";
export function NewContactsModal(props){
    const {createContact}=useContacts()
    const onFinish=({id,name})=>{
        const res=createContact(id,name)
        if(res===false)message.info('已存在该联系人')
        props.setOpen(false)
    }

    return(
        <Modal open={props.open} title={"新建联系人"}
               onCancel={()=>{props.setOpen(false)}}
                  cancelButtonProps={{style:{display:'none'}}}
                  okButtonProps={{style:{display:'none'}}} >
            <Form
                name="basic"
                onFinish={onFinish}
                autoComplete="off">
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Name',
                        },
                    ]}>
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="ID"
                    name="id"
                    rules={[
                        {
                            required: true,
                            message: 'ID',
                        },
                    ]}>
                    <Input />
                </Form.Item>


                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        确定
                    </Button>
                </Form.Item>

            </Form>

        </Modal>
    )
}