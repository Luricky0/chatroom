import React from "react";
import {useContacts} from "../contexts/ContactsProvider";
import {List, message} from "antd";
export default function Contacts({id}){
    const {contacts}=useContacts()
    const showProfile=(key)=>{
        message.info(key)

    }
    return(
        <div>
            <List
                itemLayout="horizontal"
                dataSource={contacts}
                renderItem={contact => (
                    <List.Item key={contact.id} onClick={()=>showProfile(contact.id)} >
                        {contact.name}
                    </List.Item>
                )}
            >
                <List.Item>你的id：{id}</List.Item>
            </List>
        </div>
    )
}