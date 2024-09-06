import {useEffect,useState} from "react";
import {useDatabase} from "../contexts/DatabaseProvider";
//这个hook实现可以自动保存到localStorage中的State
const PREFIX='chat-';
const UseLocalStorage = (key,initialValue) => {
    const prefixedKey= PREFIX+key
    const {db} = useDatabase();
    const [value,setValue] = useState(()=>{
        // const jsonValue=localStorage.getItem(prefixedKey)
        // if(jsonValue!=null) return JSON.parse(jsonValue)
        if(typeof initialValue === 'function'){
            return initialValue()
        } else {
            return initialValue
        }
    })

    useEffect(() => {
        if (!db) return;
        const transaction = db.transaction('chatStates','readonly');
        const store = transaction.objectStore('chatStates');
        const request = store.get(prefixedKey);
        request.onsuccess=(event)=>{
            const storedData = event.target.result?.value;
            if(!storedData){
                setValue(storedData);
            }
        }
        request.onerror = (event) => {
            console.error("Error fetching data from IndexedDB", event.target.errorCode);
        };
    }, [db,prefixedKey]);

    useEffect(() => {
        if (!db) return;
        const transaction = db.transaction('chatStates','readwrite');
        const store = transaction.objectStore('chatStates');
        store.put({key:prefixedKey, value});
        transaction.onerror = (event) => {
            console.error("Error saving data to IndexedDB", event.target.errorCode);
        };
    }, [db,prefixedKey,value]);

    // useEffect(() => {
    //     if(value!=null)
    //     localStorage.setItem(prefixedKey, JSON.stringify(value))
    // }, [prefixedKey, value]);

    //返回state
    return [value, setValue]
}
export default UseLocalStorage