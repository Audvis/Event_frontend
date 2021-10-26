import React, { useEffect, useState } from 'react'
import Fila from './Fila'
import styles from './Croquis.module.css'




export function Croquis ({data, deleteSilla, mostrarSilla}){
    return(
        <div className={styles.contTable}>
                <table>
                   {data.filas?.map((fila,i)=><Fila key={`fila${i+1}`} id={`fila${i+1}`} data={fila} deleteSilla={deleteSilla} mostrarSilla={mostrarSilla} numeroFila={i+1}/>)}
                </table>
        </div>
    )
}

export default Croquis