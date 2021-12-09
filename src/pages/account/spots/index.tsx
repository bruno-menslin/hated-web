import styles from '../../home.module.scss'
import { api } from '../../../services/api'

import { GetServerSideProps } from 'next'
import type { NextPage } from 'next'
import { getAPIClient } from '../../../services/axios'
import Link from 'next/link'
import { parseCookies } from 'nookies'

type Spot = {
    code: string
    image: string
    address: string
}

type HomeProps = {
    spots: Spot[]
}

export default function AccountSpots({ spots }: HomeProps) {
    return (
        <div className={styles.accountSpots}>
            <section className={styles.spotsList}>
                {spots.map((spot, index) => {
                    return (
                        <div key={spot.code} className={styles.spot}>
                            <img src={spot.image} alt={spot.address} />
                            <div>
                                <Link href={'/account/spots/' + spot.code}>{spot.address}</Link>
                            </div>
                        </div>
                    )
                })}
            </section>
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


    //spots
    const apiClient = getAPIClient(ctx);

    const spots = await apiClient.get('users/abc123/spots')
        .then(response => {
            const { data } = response

            const spots = data.map(spot => {
                return {
                    code: spot.code,
                    image: spot.image,
                    address: spot.address
                }
            })

            return spots
        })
        .catch(error => {
            console.log(error.message)
        })

    return {
        props: {
            spots
        }
    }
}