  
import React from 'react';
import styles from './PerfilPromoterUsuario.module.css'



function Pagination({ epp, totalEvents, p }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalEvents / epp); i++) {
        pageNumbers.push(i)
    }
    console.log('soy page number', pageNumbers)
    return (
        <nav className={styles.pagcompleta}>
            <ul className={styles.pag}>
                {pageNumbers.map(n => (
                    <li key={n} className={styles.page}>
                        <button className="regularBtn" onClick={() => p(n)}>
                            {n}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
export default Pagination