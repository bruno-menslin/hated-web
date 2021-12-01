import type { NextPage } from 'next'
import Head from 'next/head'
import { api } from '../services/api'



const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>HATED</title>
                <meta name="description" content="Skate Spot Share" />
            </Head>

            <main>
                <h1>Hated</h1>
            </main>
        </div>
    )
}

export default Home
