import { GetServerSideProps } from "next"
import nookies from 'nookies'
import { useCookies } from "react-cookie"
import Router from 'next/router'


export default function Logout() {

    const [cookies, setCookie, removeCookie] = useCookies(['hated-token']);
    removeCookie('hated-token') //client cookies

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