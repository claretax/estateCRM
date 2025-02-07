import React from "react";
import { NavLink } from "react-router-dom";
import styles from '../assets/css/header.module.css'

function Navbar(){
    return (
        <nav>
            <div className={styles.container}>
                {/* <div className={styles.logo}>
                    <h1>Estate CRM</h1>
                </div> */}
                <ul>
                    <li><NavLink to="/">Dashboard</NavLink></li>
                    <li><NavLink to="/followups">Followups</NavLink></li>
                    <li><NavLink to="/visits">Visits</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;