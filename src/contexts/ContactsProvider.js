import React, { useContext, useEffect } from "react"
import useLocalStorage from "../hooks/useLocalStorage"

const ContactsContext = React.createContext()

export function useContacts () {
    return useContext(ContactsContext)
}
export function ContactsProvider ({ children }) {
    const [contacts, setContacts] = useLocalStorage('contacts', [])
    const contactDict = {}
    
    useEffect(() => {
        contacts.forEach(contact => {
            contactDict[contact.id] = contact.name
        })
    }, [contacts])

    const createContact = (id, name) => {
        let res = true
        contacts.map(contacts => {
            if (contacts.id === id) res = false
        })
        if (res === false) return res
        setContacts(prevContacts => {
            return [...prevContacts, { id, name }]
        })
    }

    const editName = (name, id) => {

        if (name == null || name.trim().length === 0) return false

        let newContacts = contacts.map(contact => {
            if (contact.id === id) contact.name = name
            return contact
        })

        setContacts(newContacts)
    }

    const deleteContact = (id) => {

        let newContacts = contacts.filter(contact => contact.id !== id)
        setContacts(newContacts)

    }

    const getNameById = (id) => {
        if (id === localStorage.getItem('chat-id').slice(1, -1)) return "我"
        if (id in contactDict) return contactDict[id]
        return ""
    }

    const val =
    {
        contacts,
        createContact,
        editName,
        deleteContact,
        getNameById
    }

    return (
        <ContactsContext.Provider value={val}>
            {children}
        </ContactsContext.Provider>
    )

}
