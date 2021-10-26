import React, { useEffect, useState } from 'react'
import Silla from './Silla'
import styles from './Fila.module.css'


export function Fila ({data, id, deleteSilla, numeroFila, mostrarSilla}){
    return(
        <tr className={styles.tr}>
            {data.map(silla=><Silla numeroFila={numeroFila} numeroSilla={silla.silla} id={`silla${silla.silla}${id}`} key={`silla${silla.silla}${id}`} data={silla.estado} deleteSilla={deleteSilla} mostrarSilla={mostrarSilla}/>)}
        </tr>
    )
}

export default Fila