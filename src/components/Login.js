import React, {useRef, useState} from "react";
import {Button, Checkbox, Form, Input, message} from 'antd';
import {v4 as uuidV4} from "uuid";
import '../less/Login.less'
import {NewUserModal} from "./NewUserModal";
export default function Login({onIdSubmit}){
    const [isNewUserModalOpen,setIsNewUserModalOpen]=useState(false)
    const [showRegister,setShowRegister]=useState(false)
    const inputRef=useRef()
    const a= Math.floor(Math.random()*10)
    const b= Math.floor(Math.random()*10)
    const onFinish = ({username,password}) => {
        onIdSubmit(username)
    };
    const onFinishFailed = () => {
    };

    const createNewUser=()=>{
        const asw = Number(inputRef.current.input.value)
        console.log(asw)
        if(a+b===asw){
            onIdSubmit(uuidV4())
        }else{
            message.info("请正确回答")
        }

    }

    const getFormView=()=>{
        if(showRegister){
            return(
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off">
                    <h2>注册</h2>
                    {a}+{b}=?
                    答案：
                    <Form.Item>
                        <Input ref={inputRef}/>
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={createNewUser}>确定创建</Button>
                    </Form.Item>
                        <div>
                            已经拥有账号？
                            <a onClick={()=>setShowRegister(false)}>
                                返回登录
                            </a>
                        </div>
                </Form>
            )

        }else{
            return(
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off">
                    <h2>登录</h2>

                    UUID
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入你的用户名',
                            },
                        ]}>
                        <Input />
                    </Form.Item>

                    密码
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入你的密码',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                        <div>
                            还没有账号？
                            <a onClick={()=>setShowRegister(true)}>
                                注册用户
                            </a>
                        </div>
                    </Form.Item>
                </Form>
            )
        }
    }
    return(
        <div className={'Basic'}>
            <h1>Chatroom</h1>
            {getFormView()}

            {/*<NewUserModal open={isNewUserModalOpen}*/}
            {/*              setOpen={setIsNewUserModalOpen}*/}
            {/*              createUser={createNewUser}*/}
            {/*/>*/}


        </div>
    )
}