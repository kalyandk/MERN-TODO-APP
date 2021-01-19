import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import UserContext from '../../context/UserContext'

export default function Home() {
    const { userData } = useContext(UserContext)
    const history = useHistory() 

    console.log(userData.user)

    // this is executed on every render
    useEffect(() => {
        if (!userData.user) history.push('/login') // if there's no user in userData that means the user is not logged in, redirect him to login page
        // else history.push('/')
    }, [userData.user])

    const todos = () => history.push('/todos')

    return (
        <div className='page'>
            Home { userData.user ? userData.user.displayName : ''}
            <>
            <button onClick={todos}>View Todos</button>
            </>
            
        </div>
    )
}
