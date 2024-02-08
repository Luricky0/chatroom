import React, { useState} from "react";
import {Button, Form, Input, message} from 'antd';
import {v4 as uuidV4} from "uuid";
import '../less/Login.less'
import useAxios from "../hooks/useAxios";
const validatePassword=(password)=> {
    const pattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d.]{8,}$/;
    return pattern.test(password);
}

export default function Login({onIdSubmit}){
    const [showRegister,setShowRegister]=useState(false)
    const {api} = useAxios()
    const a= Math.floor(Math.random()*10) //for captcha
    const b= Math.floor(Math.random()*10) //for captcha
    const onFinish = ({id,password}) => {
        api.post('/login',{id,password})
            .then((response)=>{
                const token = response.data.token
                const refreshToken = response.data.refreshToken
                localStorage.setItem('token', token)
                localStorage.setItem('refreshToken',refreshToken)
                onIdSubmit(id)
            }).catch((error)=>{
                message.info("登录失败")
            })
    };
    const onFinishFailed = () => {
    };

    const onRegisterFinish=({password, confirm, captcha})=>{
        if(password===confirm){
            if(!validatePassword(password)){
                message.info("密码必须>=8位且只含有数字，字母")
                return
            }
            const asw = Number(captcha)
            if(a+b===asw){
                api.post('/register',{password})
                    .then((response)=>{
                        const token = response.data.token
                        const refreshToken = response.data.refreshToken
                        localStorage.setItem('token', token)
                        localStorage.setItem('refreshToken',refreshToken)
                        onIdSubmit(uuidV4())
                    }).catch(error=>{
                        console.log(error)})
            }else{
                message.info("请正确回答")
            }
        }else{
            message.info("两次密码输入不一致")
        }
    }

    const onRegisterFinishFailed=()=>{

    }

    const getFormView=()=>{
        if(showRegister){
            return(
                <Form
                    name="basic"
                    initialValues={{
                        remember: false,
                    }}
                    onFinish={onRegisterFinish}
                    onFinishFailed={onRegisterFinishFailed}
                    autoComplete="off">
                    <h2>注册</h2>
                    设置密码
                    <Form.Item
                        name={'password'}
                        rules={[
                            {
                                required: true,
                                message: '请设置你的密码',
                            }
                        ]}>
                        <Input.Password/>
                    </Form.Item>
                    重复确认密码
                    <Form.Item name={'confirm'}
                               rules={[
                                   {
                                       required: true,
                                       message: '请重复你的密码',
                                   }
                               ]}>
                        <Input.Password/>
                    </Form.Item>
                    {a}+{b}的答案是？
                    <Form.Item name={'captcha'}
                               rules={[
                                   {
                                       required: true,
                                       message: '请输入答案',
                                   }
                               ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            创建
                        </Button>
                        已经拥有账号？
                        <a onClick={()=>setShowRegister(false)}>
                            返回登录
                        </a>
                    </Form.Item>
                </Form>
            )

        }else{
            return(
                <Form
                    name="basic"
                    className={'LoginForm'}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off">
                    <h2>登录</h2>
                    UUID
                    <Form.Item
                        name="id"
                        rules={[
                            {
                                required: true,
                                message: '请输入你的UUID',
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
                        还没有账号？
                        <a onClick={()=>setShowRegister(true)}>
                            注册用户
                        </a>
                    </Form.Item>
                </Form>
            )
        }
    }
    return(
        <div className={'Basic'}>
            <h1>Chatroom</h1>
            {getFormView()}
        </div>
    )
}