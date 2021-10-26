import React from "react";
import styles from './SectorsForm.module.css'
const SectorsForm = ({name, limit, price, onCloseSection})=>{
    return(
        <div className={styles.cont}>
            <div>
                <span>{name}</span>
            </div>
            <div>
                <span>{limit}</span>
            </div>
            <div>
                <span>{price}</span>
            </div>
            {
                name==='Sección'&&limit==='Limite'&&price==='Precio'||
                <button className="regularBtn" onClick={(e)=>onCloseSection(e,name)}>X</button>
            }
            
        </div>
    );
}

export default SectorsForm;