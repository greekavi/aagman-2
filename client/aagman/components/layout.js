
import Link from 'next/link'
import styles from "../styles/Layout.module.css";
import styles2 from '../styles/Home.module.css'
import { useState } from "react";
import Image from 'next/image'

export default function Layout({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const openMenu = () => setIsOpen(!isOpen);

    return <>
        <header className={styles2.header}>
            <nav className={styles.navbar}>
                <Link href='/'>
                    <a className={styles.navlogo}>
                        <Image
                            src="/../public/images/logo.jpg"
                            alt="App Logo"
                            width={40}
                            height={40}
                        />
                    </a>
                </Link>
                <ul className={isOpen === false ?
                    styles.navmenu : styles.navmenu + ' ' + styles.active}>
                    <li className={styles.navitem}>
                        <Link href='/'>
                            <a className={isOpen === false ?
                                styles.navlink : styles.navlink + ' ' + styles.active}
                                onClick={openMenu}>Home</a>
                        </Link>
                    </li>
                    <li className={styles.navitem}>
                        <Link href='/about'>
                            <a className={isOpen === false ?
                                styles.navlink : styles.navlink + ' ' + styles.active}
                                onClick={openMenu}>About</a>
                        </Link>
                    </li>
                    <li className={styles.navitem}>
                        <Link href='/contact'>
                            <a className={isOpen === false ?
                                styles.navlink : styles.navlink + ' ' + styles.active}
                                onClick={openMenu}>Contact</a>
                        </Link>
                    </li>
                </ul>
                <button className={isOpen === false ?
                    styles.hamburger : styles.hamburger + ' ' + styles.active}
                    onClick={openMenu}
                >
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </button>
            </nav>
        </header>
        {children}
        <footer>
          <p>This is my footer.</p>
        </footer>
    </>
}