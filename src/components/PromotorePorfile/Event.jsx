import React,{useState,useEffect} from "react";
import styles from './Event.module.css';
import {Link} from 'react-router-dom'
import axios from 'axios'
import { API } from "../../actions/actions";



const Evento=({props})=>{
    let {name, qualification, id,start_date}=props
    const [eventRating, setEventRating] = useState(0)
     
    useEffect(() => {
        const fetchData = async () => {
        let generalRating;
        try {
            generalRating = await axios.get(`${API}comment/generalRating?id=${props.id}`)
            if (generalRating && generalRating.data !== 0) setEventRating(generalRating.data)
        } catch (error) {
            console.log(error)
        }
        }
    fetchData()
   
    },[])

    const toStars = (grade) => {
        let result = ''
        while (grade !== 0){
            result += '★'
            grade--
        }        
        while (result.length < 5) {
            result += '☆'
        }
        return result
    }

  

    return (
        <div className={styles.contEvent}>
            <div className={styles.contName}>
                <div>{name}</div>
                <div>{start_date}</div>               
            </div>
            <div className={styles.contQuali}>
                {eventRating? toStars(eventRating):<span></span>}
            </div>
            <div className={styles.btn}>
                <Link to ={`/eventDetailsUsuario/${id}`}>Detalle</Link>
            </div>
        </div>
    );
}

export default Evento