import React from 'react'
import styles from './Silla.module.css'


export function Silla ({numero, data, id, deleteSilla, numeroFila, numeroSilla, mostrarSilla}){
    console.log('DATA DE SILLA', data, numero, id)
    return(
        <td className={styles.td}>
            {data === 'disponible' &&
            <span onClick={()=>deleteSilla(numeroFila,numeroSilla)} className={styles.silla}>◛</span>    
            }
            {data === 'deshabilitado' &&
            <span onClick={()=>mostrarSilla(numeroFila,numeroSilla)} className={styles.silla}>x</span>    
            }
            
        </td>
    )
}

export default Silla