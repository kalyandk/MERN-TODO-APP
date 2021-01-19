import React from 'react'
import { Link } from 'react-router-dom'

import AuthOptions from '../auth/AuthOptions'

export default function Header() {
    return (
        <header id='header'>
            <Link to='/'>
                <h1 className='title'>Mern auth todo</h1>
            </Link>  {/* on clicking this link, it redirects to '/' page */}
            <AuthOptions />
        </header>
    ) 
}
