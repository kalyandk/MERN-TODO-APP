import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../context/UserContext'

export default function AuthOptions() {
    const { userData, setUserData } = useContext(UserContext)

    const history = useHistory()

    const register = () => history.push('/register') // on click of register button, push the url end '/register' to the history stack
    const login = () => history.push('/login') 
    const logout = () => {
        // on logout, reset the token and user state values
        setUserData({
            token: undefined,
            user: undefined
        })
        // reset the token in the localStorage to empty
        localStorage.setItem('auth-token', '')
    }

    return (
        <nav className='auth-options'>
            {
                userData.user ? 
                    <button onClick={logout}>Logout</button> :
                    <>
                        <button onClick={register}>Register</button>
                        <button onClick={login}>Log in</button>
                    </>
            }
        </nav>
    )
}