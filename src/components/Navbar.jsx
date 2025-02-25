import React from 'react'
import styles from './Navbar.module.css'
import logo from '../assets/logo.png';

export default function Navbar() {
  return (
    <>
    <header className={styles.header}>
        <nav className={styles.nav}>
            <img src={logo} alt="logo" className={styles.logo} />
            <ul className={styles.navlist}>
                <li className="nav-items">Cartoons</li>
                <li className="nav-items">Random</li>
            </ul>
        </nav>
    </header>
       
    </>
  )
}
