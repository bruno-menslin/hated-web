import styles from './signup.module.scss'
import { api } from '../../services/api'
import { AuthContext } from '../../contexts/AuthContext'

import Router from 'next/router'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

export default function SignUp() {
    const { register, handleSubmit } = useForm()

    async function handleRegister(data) {
        await api.post('users', data)
            .then(response => {
                Router.push('/sign-in')
            })
            .catch(error => {
                alert(error.response.data.error)
            })
    }

    return (
        <div className={styles.signUp}>
            <form onSubmit={handleSubmit(handleRegister)}>

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
                    autoComplete="off"
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
                    autoComplete="off"
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
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    //auth
    const { 'hated-token': token } = parseCookies(ctx)

    if (token) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}