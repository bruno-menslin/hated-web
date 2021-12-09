import styles from './accountupdate.module.scss'
import { api } from '../../../services/api'
import { AuthContext } from '../../../contexts/AuthContext'

import Router from 'next/router'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { useContext, useEffect } from 'react'
import { getAPIClient } from '../../../services/axios'

type User = {
    id: string
    username: string
    email: string
    admin: boolean
}

type UpdateProps = {
    user: User
}

export default function AccountUpdate({ user }: UpdateProps) {
    const { register, handleSubmit, setValue } = useForm()
    const { setUser } = useContext(AuthContext)

    async function handleUpdate(data) {
        await api.put(`users/${user.id}`, data)
            .then(response => {
                setUser(response.data)
                Router.push('/account')
            })
            .catch(error => {
                alert(error.message)
            })
    }

    useEffect(() => {
        setValue('email', user.email)
        setValue('username', user.username)
    }, [])

    return (
        <div className={styles.accountUpdate}>
            <form onSubmit={handleSubmit(handleUpdate)}>

                <label htmlFor="email">
                    Email
                </label>
                <input
                    {...register('email')}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="EMAIL"
                    required
                />

                <label htmlFor="username">
                    Username
                </label>
                <input
                    {...register('username')}
                    type="username"
                    id="username"
                    name="username"
                    placeholder="USERNAME"
                    required
                />

                <label htmlFor="password">
                    Password
                </label>
                <input
                    {...register('password')}
                    type="password"
                    id="password"
                    name="password"
                    placeholder="PASSWORD"
                    required
                />

                <div className="actions">
                    <button type="submit">Update</button>
                </div>
            </form>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    //auth
    const { 'hated-token': token } = parseCookies(ctx)

    if (!token) {
        return {
            redirect: {
                destination: '/account',
                permanent: false
            }
        }
    }


    //user
    const apiClient = getAPIClient(ctx)

    const user = await apiClient.get('users/abc123')
        .then(response => {
            const { id, username, email, admin } = response.data

            return {
                id: id,
                username: username,
                email: email,
                admin: admin
            }
        })
        .catch(error => {
            console.log(error.message)
        })

    return {
        props: {
            user
        }
    }
}