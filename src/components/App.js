import Login from "./Login";
import useLocalStorage from "../hooks/useLocalStorage";
import Dashboard from "./Dashboard";
import {ContactsProvider} from "../contexts/ContactsProvider";
import {ConversationsProvider} from "../contexts/ConversationsProvider";
import {SocketProvider} from "../contexts/SocketProvider";
import '../less/Basic.less'

function App() {
    const [id,setId] = useLocalStorage('id')
    const dashboard=(
        <SocketProvider id={id}>
            <ContactsProvider>
                <ConversationsProvider id={id}>
                    <Dashboard id={id}/>
                </ConversationsProvider>
            </ContactsProvider>
        </SocketProvider>
    )

    return (
        <div>
            {/*<Login/>*/}
            {id==null ? <Login onIdSubmit={setId}/> : dashboard }
        </div>
    );
}

export default App;
