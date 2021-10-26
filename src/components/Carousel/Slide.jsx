import React from "react";
import styles from './Slide.module.css'
import {Link} from 'react-router-dom'

const Slide = ({img, name, date, place, id})=>{
    // console.log(img)
    return(
        <Link to={`/eventDetailsUsuario/${id}`} className={styles.slides}> 
        <div className={styles.slides}>           
                <img src={img} alt="..." />              
                <div className={styles.textSlide}>
                    <h1>{name}</h1>
                    <h3>{date}</h3>
                    <h3>{place}</h3>
                </div>
            
        </div>
        </Link>
    )
}

export default Slide