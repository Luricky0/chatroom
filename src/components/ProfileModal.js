import React from "react";
import {Modal} from "antd";
export function ProfileModal(props){
    return(
        <Modal open={props.isModalOpen} title={'你的UUID'}
               onCancel={()=>{props.setIsModalOpen(false)}}
               cancelButtonProps={{style:{display:'none'}}}
               okButtonProps={{style:{display:'none'}}}>
            {props.id}

        </Modal>
    )
}