import styles from './styles.module.scss'

import Link from 'next/link'

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <Link href="/spots/new">New Spot</Link>
            <Link href="/">Hated</Link>
            <Link href="/account">Account</Link>
        </header>
    );
}