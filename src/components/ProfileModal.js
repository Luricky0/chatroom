import React, {useState} from "react";
import {Avatar, Button, Form, Input, message, Modal} from "antd";
import axios from "axios";
import '../less/ProfileModal.less'
import EditAvatar from "./Avatar";
import {UserOutlined} from "@ant-design/icons";
const validatePassword=(password)=> {
    const pattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d.]{8,}$/;
    return pattern.test(password);
}
export function ProfileModal(props){
    const [isEditPswModalOpen,setIsEditPswModalOpen]=useState(false)
    const [isEditAvatar,setIsEditAvatar]=useState(false)
    const onFormFinish=({newpsw,confirm})=>{

        if(newpsw===confirm){
            if(!validatePassword(newpsw)){
                message.info("密码必须>=8位且只含有数字，字母")
                return
            }
            axios.post('http://localhost:4998/update',{id:props.id,password:newpsw})
                .then((data)=>{
                    message.info('修改成功')
                    setIsEditPswModalOpen(false)
                    console.log(data)})
                .catch((error)=>{
                    message.info('修改失败')
                    console.log(error)
                })

        }else{
            message.info("两次密码输入不一致")
        }
    }
    const getAvatarView=()=>{
        if(isEditAvatar){
            return (
                <EditAvatar id={props.id}/>
            )

        }else{
            return(
                <Avatar shape="square" size={96}
                        icon={<UserOutlined/>}
                        src={`http://localhost:4998/avatar?id=${props.id}`}
                        onClick={()=>{setIsEditAvatar(true)}}
                />
            )
        }
    }

    return(
        <Modal open={props.isModalOpen}
               onCancel={()=>props.setIsModalOpen(false)}
               cancelButtonProps={{style:{display:'none'}}}
               okButtonProps={{style:{display:'none'}}}
               className={'Profile'}
        >
            {getAvatarView()}
            <h3>ID：{props.id}</h3>
            <Button type={'text'} onClick={()=>setIsEditPswModalOpen(true)}>
                设置新密码>
            </Button>
            <Modal open={isEditPswModalOpen} title={'设置新密码'}
                   onCancel={()=>{setIsEditPswModalOpen(false)}}
                   cancelButtonProps={{style:{display:'none'}}}
                   okButtonProps={{style:{display:'none'}}}>
                <Form onFinish={onFormFinish}>
                    <Form.Item name={'newpsw'}
                               rules={[{
                                    required: true,
                                    message: '请设置密码'}]}>
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item name={'confirm'}
                               rules={[{
                                   required: true,
                                   message: '请确认密码'}]}>
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType={'submit'}>确认</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Modal>
    )
}