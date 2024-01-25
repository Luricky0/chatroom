import React from "react";
import {useContacts} from "../contexts/ContactsProvider";
import {List} from "antd";
export default function Contacts(){
    const {contacts}=useContacts()
    return(
        <div>
            <List
                itemLayout="horizontal"
                dataSource={contacts}
                renderItem={contact => (
                    <List.Item key={contact.id} style={{color:'white',marginLeft:'10px'}}>
                        {contact.name}
                    </List.Item>
                )}
            />
        </div>
    )
}