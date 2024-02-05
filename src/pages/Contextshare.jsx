import React, { createContext, useState } from 'react'

export const registerContext = createContext()

export const editContext = createContext();

function Contextshare({ children }) {

    const [registerData, setRegisterData] = useState("")
    const [editData, setEditData] = useState("");

    return (
        <>

            <registerContext.Provider value={{ registerData, setRegisterData }}>
                <editContext.Provider value={{editData,setEditData}}>
                    {children}
                </editContext.Provider>
            </registerContext.Provider>

        </>
    )
}

export default Contextshare