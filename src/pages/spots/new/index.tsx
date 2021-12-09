import styles from './newspot.module.scss'
import { api } from '../../../services/api'
import { getAPIClient } from '../../../services/axios'

import { GetServerSideProps } from 'next'
import Router from 'next/router'
import { parseCookies } from 'nookies'
import { useForm } from 'react-hook-form'


type Features = {
    name: string
}

type NewSpotProps = {
    features: Features[]
}

export default function NewSpot({ features }: NewSpotProps) {
    const { register, handleSubmit } = useForm()

    async function handleRegister(data) {
        await api.post('spots', data)
            .then(response => {
                Router.push('/')
            })
            .catch(error => {
                alert(error.response.data.error)
            })
    }

    return (
        <div className={styles.newSpot}>
            <form onSubmit={handleSubmit(handleRegister)}>
                <label htmlFor="image">
                    Image
                </label>
                <input
                    {...register('image')}
                    type="url"
                    id="image"
                    name="image"
                    placeholder="IMAGE"
                    required
                    autoComplete="off"
                />

                <label htmlFor="address">
                    Address
                </label>
                <input
                    {...register('address')}
                    type="text"
                    id="address"
                    name="address"
                    placeholder="ADDRESS"
                    required
                    autoComplete="off"
                />

                <label htmlFor="longitude">
                    Longitude
                </label>
                <input
                    {...register('longitude')}
                    type="number"
                    step="0.0000000000000001"
                    id="longitude"
                    name="longitude"
                    placeholder="LONGITUDE"
                    required
                    autoComplete="off"
                />

                <label htmlFor="latitude">
                    Latitude
                </label>
                <input
                    {...register('latitude')}
                    type="number"
                    step="0.0000000000000001"
                    id="latitude"
                    name="latitude"
                    placeholder="LATITUDE"
                    required
                    autoComplete="off"
                />

                <label htmlFor="features">
                    Features
                </label>
                <select
                    {...register('features')}
                    id="features"
                    name="features"
                    multiple
                    required
                >
                    {features.map((feature, index) => {
                        return (
                            <option key={feature.name} value={feature.name}>{feature.name}</option>
                        )
                    })}
                </select>

                <div className="actions">
                    <button type="submit">Save</button>
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
                destination: '/sign-in',
                permanent: false
            }
        }
    }


    //features
    const apiClient = getAPIClient(ctx);

    const features = await apiClient.get('features')
        .then(response => {
            const { data } = response

            const features = data.map(feature => {
                return {
                    name: feature.name
                }
            })

            return features
        })
        .catch(error => {
            console.log(error.message)
        })

    if (!features) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            features
        }
    }
}