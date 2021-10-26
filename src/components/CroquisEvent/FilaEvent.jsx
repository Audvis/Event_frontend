import React from "react";
import styles from './FilaEvent.module.css'
import SillaEvent from "./SillaEvent";

const FilaEvent = ({data, addTicket,fila,removeTicket})=>{
    return (
            <tr>
                {data.map((silla,i)=><SillaEvent 
                                        key={`silla${silla.silla}`} 
                                        data={silla}
                                        addTicket={addTicket}
                                        fila={fila}
                                        removeTicket={removeTicket}
                                    />)}
            </tr>       
    )
}
export default FilaEvent