import styles from './signin.module.scss'
import { api } from '../../services/api'
import { AuthContext } from '../../contexts/AuthContext'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

export default function SignIn() {
    const { register, handleSubmit } = useForm()
    const { signIn } = useContext(AuthContext)

    async function handleSignIn(data) {
        await signIn(data)
    }

    return (
        <div className={styles.signIn}>
            <form onSubmit={handleSubmit(handleSignIn)}>

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
                    <button type="submit">Sign In</button>
                    <Link href="/sign-up">Sign Up</Link>
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