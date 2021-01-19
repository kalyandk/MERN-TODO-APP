import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import ErrorNotice from '../misc/ErrorNotice'
import UserContext from '../../context/UserContext'

export default function Register() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordCheck, setPasswordCheck] = useState()
    const [displayName, setDisplayName] = useState()
    const [error, setError] = useState()

    const { setUserData } = useContext(UserContext)
    const history = useHistory()

    const submit = async (e) => {
        e.preventDefault()

        try {
            const newUser = { email, password, passwordCheck, displayName }
            await axios.post('http://localhost:5000/users/register', newUser) // send post request to the server to register the user
            
            const loginRes = await axios.post('http://localhost:5000/users/login', { email, password }) // after registering, log in the user to get the jwt token from the backend
            
            // set the state with received response data after logging in
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            }) 

            // set the auth-token in the localStorage with received jwt token
            localStorage.setItem('auth-token', loginRes.data.token)
            history.push('/') // redirect to home page after registration/login
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
    }


    return (
        <div className='page'>
            <h2>Register</h2>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            
            <form className='form' onSubmit={submit}>
                <label htmlFor='register-email'>Email</label>
                <input id='register-email' name='email' type='email' onChange={(e) => setEmail(e.target.value)} />
                
                <label htmlFor='register-password'>Password</label>
                <input id='register-password' name='password' type='password' onChange={(e) => setPassword(e.target.value)} />
                <input placeholder='Verify password' type='password' onChange={(e) => setPasswordCheck(e.target.value)} />
                
                <label htmlFor='register-display-name'>Display name</label>
                <input id='register-display-name' type='text' onChange={(e) => setDisplayName(e.target.value)} />

                <input type='submit' value='Register' />
            </form>
        </div>
    )
}
