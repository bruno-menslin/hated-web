import styles from './account.module.scss'

import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

export default function Account() {
    return (
        <div className={styles.account}>
            <div className="actions">
                <Link href="/account/spots">Manage Spots</Link>
                <Link href="/account/update">Update Account</Link>
                <Link href="/logout">Logout</Link>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    //auth
    const { 'hated-token': token } = parseCookies(ctx)

    if (!token) {
        return {
            redirect: {
                destination: '/sign-in',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}