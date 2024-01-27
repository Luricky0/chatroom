import {useEffect,useState} from "react";
//这个hook实现可以自动保存到localStorage中的State
const PREFIX='chat-';
const UseLocalStorage = (key,initialValue) => {
    const prefixedKey=PREFIX+key
    const [value,setValue] = useState(()=>{
        const jsonValue=localStorage.getItem(prefixedKey)
        if(jsonValue!=null) return JSON.parse(jsonValue)
        if(typeof initialValue === 'function'){
            return initialValue()
        } else {
            return initialValue
        }
    })
    //prefixedKey或value更改时自动设置localstorage
    useEffect(() => {
        if(value!=null)
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value]);

    //返回state
    return [value, setValue]
}
export default UseLocalStorage