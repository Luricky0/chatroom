import React, {useContext, useEffect, useState} from "react";
const DatabaseContext = React.createContext()
export function useDatabase(){
    return useContext(DatabaseContext);
}

export function DatabaseProvider({children}){
    const [db, setDb] = useState(null);
    useEffect(() => {
        const request = indexedDB.open('chatroom', 1);
        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('chatStates')) {
                db.createObjectStore('chatStates', { keyPath: 'key' });
            }
            console.log('ObjectStore "chatStates" created or already exists');
        };

        request.onsuccess = function (event) {
            const db = event.target.result;
            setDb(db);
            db.onversionchange = () => {
                console.log("Database version changed, need to reload the page.");
                window.location.reload();//下一步改进：可以更改为触发部份更新
            };
            console.log('IndexedDB is ready to use');
        };

        request.onerror = function(event) {
            console.error('Database error:', event.target.errorCode);
        };
    }, []);

    const value={
        db
    };
    return(
        <DatabaseContext.Provider value={value}>
            {children}
        </DatabaseContext.Provider>
    )

}