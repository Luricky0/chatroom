import React, {useRef, useState} from "react";
import {Button, Checkbox, Form, Input, message, Modal} from "antd";
import {useContacts} from "../contexts/ContactsProvider";
export function NewUserModal(props){
    const [isHuman, setIsHuman] = useState(false)
    const inputRef=useRef()
    const a= Math.floor(Math.random()*10)
    const b= Math.floor(Math.random()*10)
    const onCreateUser=()=>{

        const asw = Number(inputRef.current.input.value)
        console.log(asw)
        if(a+b===asw){
            props.createUser()
            props.setOpen(false)
        }else{
            message.info("请正确回答")
        }
    }

    return(
        <Modal open={props.open} title={"新建用户"}
               onCancel={()=>{props.setOpen(false)}}
               cancelButtonProps={{style:{display:'none'}}}
               okButtonProps={{style:{display:'none'}}} >
            问题：
            {a}+{b}=?
            输入答案：
            <Input ref={inputRef}/>
            <Button onClick={onCreateUser}>确定创建</Button>

        </Modal>
    )
}