import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios'

import Header from './components/layout/Header'
import Home from './components/pages/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import UserContext from './context/UserContext';

import './style.css'

export default function App() {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined
    })

    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem('auth-token') // when auth-token key is present in localstorage and has no value assigned then it has a empty string as its value
                                                            // if the auth-token key itself is absent in the localstorage, then localStorage.getItem() returns null value, which when sent in header to the server, the server will respond with 'jwt malformed' error
            
            // To avoid above senario 
            if (token === null) {
                localStorage.setItem('auth-token', '') // create and set auth-token and its value to an empty string
                token = '' // turn null value to an empty string in the variable 'token'
            }

            // 2nd arg is the body of the request, 3rd arg is the headers
            const tokenRes = await axios.post(
                'http://localhost:5000/users/isTokenValid',
                null,
                { headers: { 'x-auth-token': token } }
            )

            if (tokenRes.data) {
                // NOTE: For 'get' request, no need to send any data in the body
                const userRes = await axios.get('http://localhost:5000/users/', { headers: { 'x-auth-token': token } })
                setUserData({
                    token,
                    user: userRes.data
                })
            }
        }

        checkLoggedIn()
    }, [])

    return (
        <>
            <BrowserRouter>
                <UserContext.Provider value={{userData, setUserData}}>
                    <Header />
                    <div className='container'>
                        <Switch>  {/* Gets hold of URL */}
                            <Route exact path='/' component={Home} />
                            <Route exact path='/login' component={Login} />
                            <Route exact path='/register' component={Register} />
                        </Switch>
                    </div>
                </UserContext.Provider>
            </BrowserRouter>
        </>
    )
}
