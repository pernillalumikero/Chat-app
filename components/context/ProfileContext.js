import React, { createContext, useState } from 'react'

export const ProfileContext = createContext()

export const ProfileProvider = ({children}) => {

    const [profilePic, setProfilePic] = useState(null)
    const [picture, setPicture] = useState(null)

    const img = 'https://cdn.pixabay.com/photo/2022/11/20/17/12/dog-7604760_1280.jpg'

    return (
        <ProfileContext.Provider value={{picture, setPicture, img, profilePic, setProfilePic}}>
            {children}
        </ProfileContext.Provider>
    )
}

