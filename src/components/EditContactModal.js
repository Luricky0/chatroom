import React from "react";
import {Button, Form, Input, message, Modal} from "antd";
import {useContacts} from "../contexts/ContactsProvider";
export default function EditContactModal(props){
    const {editName}=useContacts()
    const onFormFinish=({newName})=>{
        let res = editName(newName, props.id)
        props.setIsModalOpen(false)
        if(res===false){
            console.log(res)
            message.info("名字不能为空")
        }
    }


    return(

        <Modal open={props.isModalOpen}
               onCancel={()=>{props.setIsModalOpen(false)}}
               title={'新昵称'}
               cancelButtonProps={{style:{display:'none'}}}
               okButtonProps={{style:{display:'none'}}}>
            <Form onFinish={onFormFinish}>
                <Form.Item name={'newName'}>
                    <Input/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType={'submit'}>确定</Button>
                </Form.Item>
            </Form>

        </Modal>
    )

}