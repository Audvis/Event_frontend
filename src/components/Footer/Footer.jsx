import React from 'react';
import styles from './Footer.module.css';
import img2 from '../../Utilities/eVent-08.svg';

const Footer = () =>{
    return (
        <footer className={styles.Footer}>
            <div className={styles.logo}>
                <img src={img2} alt="eVent" />
            </div>
        </footer>
    )
}

export default Footer;