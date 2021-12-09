import { api } from '../services/api'

import { createContext, useEffect, useState } from 'react'
import { parseCookies, setCookie } from 'nookies'
import Router from 'next/router'

type User = {
    id: string,
    username: string
    email: string
    admin: boolean
}

type SignInData = {
    email: string
    password: string
}

type SignInResponse = {
    token: string
    user: User
}

type AuthContextType = {
    user: User
    setUser: (data: User) => Promise<void>
    isAuthenticated: boolean
    signIn: (data: SignInData) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
    const [user, setUser] = useState<User | null>(null)

    const isAuthenticated = !!user

    useEffect(() => {
        const { 'hated-token': token } = parseCookies()

        if (token) {
            api.get('users/abc123')
                .then(response => {
                    const { id, username, email, admin } = response.data

                    setUser({
                        id: id,
                        username: username,
                        email: email,
                        admin: admin
                    })
                })
                .catch(error => {
                    console.log(error.message)
                })
        }
    }, [])

    async function signIn({ email, password }: SignInData) {

        await api.post('login', { email, password }).then(response => {
            const { token, user } = response.data

            setCookie(undefined, 'hated-token', token, {
                maxAge: 60 * 60 * 1 //1 hour
            })

            api.defaults.headers['authorization'] = token

            setUser(user)

            Router.push('/')
        }).catch(error => {
            alert('wrong email or password')
        })
    }

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}