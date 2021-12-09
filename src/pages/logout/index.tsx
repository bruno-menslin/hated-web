import { GetServerSideProps } from "next"
import nookies, { destroyCookie } from 'nookies'
import Router from 'next/router'
import { useEffect } from "react";


export default function Logout() {
    destroyCookie(null, 'hated-token', { path: '/' })
    Router.push('/')

    return (
        <div></div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    nookies.destroy(ctx, 'hated-token')

    return {
        props: {}
    }
}