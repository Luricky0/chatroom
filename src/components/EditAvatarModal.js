import React from "react";
import {Button, Form, Input, Modal} from "antd";
import axios from 'axios'
import Avatar from "./Avatar";

export default function EditAvatarModal(props){
    // const onFormFinish=({avatar})=>{
    //     const formData = new FormData();
    //     console.log(avatar)
    //     formData.append('avatar', avatar);
    //     formData.append('id',props.id)
    //     axios.post(`http://localhost:4998/upload:${props.id}`,formData,{
    //         headers:{
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     }).then(({data})=>{
    //         console.log(data)
    //
    //     }).catch((error)=>{
    //         console.log(error)
    //     })
    // }
    return(
        <Modal open={props.isModalOpen}
                   onCancel={()=>{props.setIsModalOpen(false)}}
                   title={'新头像'}
                   cancelButtonProps={{style:{display:'none'}}}
                   okButtonProps={{style:{display:'none'}}}>
            <Avatar id={props.id}/>


        </Modal>
    )
}