import '../styles/globals.scss'
import { Header } from '../components/Header'
import { AuthProvider } from '../contexts/AuthContext'
import styles from '../styles/app.module.scss'

import type { AppProps } from 'next/app'
import Head from 'next/head'


function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <Head>
                <title>HATED</title>
                <meta name="description" content="Skate Spot Share" />
            </Head>
            <div className={styles.wrapper}>
                <main>
                    <Header />
                    <Component {...pageProps} />
                </main>
            </div>
        </AuthProvider>
    )
}

export default MyApp
