import React, { useEffect, useState } from "react";
import styles from './SelectSector.module.css'


const SelectSector = ({data, changeSection}) =>{
    const [dataA, setDataA] = useState([...data])
    const [secciones, setSecciones]=useState([])
    useEffect(()=>{
        setSecciones(dataA.map((d)=>d.name))
    },[dataA])
    return(
        <select className={styles.selectSections} onChange={changeSection}>
            <option value="" >Seleccione Sector</option>
            {secciones.map(seccion=>
                <option key={seccion} value={seccion}>{seccion}</option>
            )}
        </select>
    )
}

export default SelectSector