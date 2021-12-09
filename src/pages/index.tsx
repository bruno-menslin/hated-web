import styles from './home.module.scss'
import { api } from '../services/api'

import { GetServerSideProps } from 'next'
import { getAPIClient } from '../services/axios'

type Spot = {
    code: string
    image: string
    address: string
}

type HomeProps = {
    spots: Spot[]
}

export default function Home({ spots }: HomeProps) {
    return (
        <div className={styles.homepage}>
            <section className={styles.spotsList}>
                {spots.map((spot, index) => {
                    return (
                        <div key={spot.code} className={styles.spot}>
                            <img src={spot.image} alt={spot.address}/>
                            <div>{spot.address}</div>
                        </div>
                    )
                })}
            </section>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    //spots
    const apiClient = getAPIClient(ctx);

    const spots = await apiClient.get('spots')
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