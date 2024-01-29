import React, {useContext} from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ContactsContext=React.createContext()

export function useContacts(){
    return useContext(ContactsContext)
}
export function ContactsProvider({children}){
    const [contacts, setContacts] = useLocalStorage('contacts',[])
    const createContact=(id,name)=>{
        setContacts(prevContacts=>{
            return [...prevContacts, {id, name}]
        })
    }

    const editName=(name, id)=>{

        if(name==null||name.trim().length===0) return false

        let newContacts=contacts.map(contact=>{
            if(contact.id===id) contact.name=name
            return contact
        })

        setContacts(newContacts)
    }

    const deleteContact=(id)=>{

        let newContacts=contacts.filter(contact=>contact.id!==id)
        setContacts(newContacts)

    }

    const val=
        {
            contacts,
            createContact,
            editName,
            deleteContact
        }

    return(
        <ContactsContext.Provider value={val}>
            {children}
        </ContactsContext.Provider>
    )

}
