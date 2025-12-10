import React from 'react'
import { NavLink } from 'react-router'

export default function Navbar() {
    return (
        <div className='flex gap-2'>
            <NavLink>Link 1</NavLink>
            <NavLink>Link 2</NavLink>
            <NavLink>Link 3</NavLink>
            <NavLink>Link 4</NavLink>
        </div>
    )
}
