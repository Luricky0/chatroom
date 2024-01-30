import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import {useContacts} from "./ContactsProvider";
import {useSocket} from "./SocketProvider";
const ConversationsContext=React.createContext()

function arrayEquality(a,b){
    if(a.length !== b.length) return false
    a.sort()
    b.sort()
    return a.every((element,index)=>{
        return element === b[index]
    })
}
export function useConversations(){
    return useContext(ConversationsContext)
}
export function ConversationsProvider({id, children}){
    const {contacts} = useContacts()
    const socket = useSocket()
    const [conversations, setConversations] = useLocalStorage('conversations',[])
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)

    //格式化conversations，主要把recipients中的id转化为id+name，判断messages是否来自自己
    const formattedConversations = useMemo(() => {
        return conversations.map((conversation, index) => {
            const recipients = conversation.recipients.map( (recipient) => {
                const contact = contacts.find( (contact) => contact.id === recipient);
                const name = (contact && contact.name) || recipient;
                return { id: recipient, name:name };
            });

            const messages = conversation.messages.map((message) => {
                const contact = contacts.find((contact) => contact.id === message.sender);
                const name = (contact && contact.name) || message.sender;
                const fromMe = id === message.sender;
                return { ...message, senderName: name, fromMe };
            });

            const selected = conversation === conversations[selectedConversationIndex];

            return { ...conversation, messages, recipients, selected };
        });
    }, [conversations, contacts, id, selectedConversationIndex]);


    function createConversations(recipients){
        let res = conversations.some(conversation=>{
            return arrayEquality(conversation.recipients,recipients)
        })
        if(!res){
            setConversations(prevConversations=>{
                return [...prevConversations, {recipients:recipients, messages:[], name:''}]
            })
        }else{
            return false
        }

    }

    const addMessageToConversation = useCallback(({recipients, text, sender})=>{
        setConversations(prevConversations=>{
            let madeChange = false
            const newMessage= {sender, text}
            const newConversations = prevConversations.map
            (conversation=>{
                if(arrayEquality(conversation.recipients, recipients))
                {
                    madeChange=true
                    return {
                        ...conversation,
                        messages:[...conversation.messages, newMessage]
                    }
                }
                return conversation
            })
            if (madeChange) {
                return newConversations
            } else {
                return [...prevConversations,
                    {
                        recipients,
                        messages: [newMessage]
                    }]
            }
        })
    }, [setConversations]);


    //socket相关
    useEffect(() => {
        if(socket == null) return
        socket.on('receive-message', addMessageToConversation)
        return ()=>socket.off('receive-message')
    }, [socket, addMessageToConversation]);

    function sendMessage(recipients, text){
        socket.emit('send-message',{recipients, text})
        addMessageToConversation({recipients, text, sender:id})
    }

    function deleteConversations(selected){
        //selected是一个recipients的数组
        let newSelected = selected.map(recipients => recipients.map(r => r.id))
        let newConversations = conversations.filter(conversation => {
            return !newSelected.some(selectedRecipients => arrayEquality(selectedRecipients, conversation.recipients));
        });
        setConversations(newConversations);
    }

    function deleteOneConversation(selectedIndex) {
        const newConversations = [...conversations];
        newConversations.splice(selectedIndex, 1);
        setConversations(newConversations);
    }

    function setConversationName(newName){
        const newConversations=conversations.map((conversation, index)=>{
            if(index===selectedConversationIndex){
                conversation.name = newName
            }
            return conversation
        })
        setConversations(newConversations)
    }

    const value={
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIndex],
        sendMessage,
        setConversationIndex: setSelectedConversationIndex,
        deleteConversations,
        createConversations,
        deleteOneConversation,
        setConversationName
    }

    return(
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    )
}
