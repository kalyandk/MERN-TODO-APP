import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import ErrorNotice from '../misc/ErrorNotice'
import UserContext from '../../context/UserContext'

export default function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()

    const { setUserData } = useContext(UserContext)
    const history = useHistory()

    const submit = async (e) => {
        e.preventDefault()
        try {
            const loginUser = { email, password }
        
            const loginRes = await axios.post('http://localhost:5000/users/login', loginUser) 
            
            // set the state with received response data after logging in
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            }) 

            // set the auth-token in the localStorage with received jwt token
            localStorage.setItem('auth-token', loginRes.data.token)
            history.push('/') // redirect to home page after login 
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
        
    }
    return (
        <div className='page'>
            <h2>Log in</h2>

            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}

            <form className='form' onSubmit={submit}>
                <label htmlFor='login-email'>Email</label>
                <input id='login-email' name='email' type='email' onChange={(e) => setEmail(e.target.value)} />
                
                <label htmlFor='login-password'>Password</label>
                <input id='login-password' name='password' type='password' onChange={(e) => setPassword(e.target.value)} />
                
                <input type='submit' value='Login' />
            </form>
        </div>
    )
}
