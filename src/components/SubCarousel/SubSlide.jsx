import React from "react";
import styles from './SubSlide.module.css'

const SubSlide = ({img, name, date, place})=>{
    console.log(img)
    return(
        <div className={styles.slides}>
            <a href='https://www.google.com'>
                <img src={img} alt="..." />   
            </a>
            <div className={styles.textSlide}>
                <h1>{name}</h1>
                <h3>{date}</h3>
                <h3>{place}</h3>
            </div>
        </div>
    )
}

export default SubSlide