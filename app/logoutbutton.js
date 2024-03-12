'use client'

import React from 'react'
import { signOut } from 'next-auth/react'

export default function LogoutButton() {
    return (
        <button className="dropdown-item" aria-current="page" onClick={ () => signOut() }>로그아웃</button>
    )
}