import React, {useRef} from "react";
import { Button, Checkbox, Form, Input } from 'antd';
import {v4 as uuidV4} from "uuid";
import '../less/Login.less'
export default function Login({onIdSubmit}){
    const onFinish = ({username,password}) => {
        onIdSubmit(username)
    };
    const onFinishFailed = () => {
    };

    const createNewUser=()=>{
        onIdSubmit(uuidV4())
    }
    return(
        <div className={'Basic'}>
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
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: '请输入你的用户名',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
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

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                    <Button type={'text'} onClick={createNewUser}>创建新用户</Button>
                </Form.Item>

            </Form>


        </div>
    )
}