
import Login from "./Login";
import {useState} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Dashboard from "./Dashboard";
import {ContactsProvider} from "../contexts/ContactsProvider";
import {ConversationsProvider} from "../contexts/ConversationsProvider";

function App() {
    const [id,setId] = useLocalStorage('id')
    const dashboard=(
        <ContactsProvider>
            <ConversationsProvider id={id}>
                <Dashboard id={id}/>
            </ConversationsProvider>
        </ContactsProvider>
    )

    return (
        <div>
            {id ? dashboard : <Login onIdSubmit={setId}/>}

        </div>
    );
}

export default App;
