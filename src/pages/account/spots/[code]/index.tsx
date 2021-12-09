import styles from './updatespot.module.scss'
import { api } from "../../../../services/api"
import { getAPIClient } from "../../../../services/axios"

import { GetStaticPaths, GetStaticProps, GetServerSideProps } from "next"
import { parseCookies } from "nookies"
import Router from 'next/router'
import { useForm } from "react-hook-form"
import { useEffect } from 'react'


type Feature = {
    id: string
    name: string
}

type Spot = {
    code: string
    image: string
    address: string
    longitude: number
    latitude: number
    features: Feature[]
}

type UpdateSpotProps = {
    spots: Spot[]
    features: Feature[]
}

export default function UpdateSpot({ spot, features }: UpdateSpotProps) {
    const { register, handleSubmit, setValue } = useForm()

    async function handleUpdate(data) {
        await api.put(`spots/${spot.code}`, data)
            .then(response => {
                Router.push('/account/spots')
            })
            .catch(error => {
                alert(error.response.data.error)
            })
    }

    async function handleDelete() {
        await api.delete(`spots/${spot.code}`)
            .then(response => {
                Router.push('/account/spots')
            })
            .catch(error => {
                console.log(error)
                alert(error.response.data.error)
            })
    }

    useEffect(() => {
        setValue('image', spot.image)
        setValue('address', spot.address)
        setValue('longitude', spot.longitude)
        setValue('latitude', spot.latitude)
        setValue('features', spot.features)
    }, [])

    return (
        <div className={styles.updateSpot}>
            <form onSubmit={handleSubmit(handleUpdate)}>
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
                    <button type="submit">Update</button>
                    <a onClick={handleDelete}>Delete</a>
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


    //spot
    const apiClient = getAPIClient(ctx)

    const { code } = ctx.query

    const spot = await apiClient.get(`spots/${code}`)
        .then(response => {
            const { data } = response

            return {
                code: data.code,
                latitude: data.latitude,
                longitude: data.longitude,
                image: data.image,
                address: data.address,
                features: data.features.map(feature => {return feature.name})
            }
        })
        .catch(error => {
            console.log(error.message)
        })


    //features
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
            spot,
            features
        }
    }
}