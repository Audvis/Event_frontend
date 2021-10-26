
import {Link} from 'react-router-dom'
import{useEffect, useState} from 'react'
import axios from 'axios'
import styles from './PerfilPromoterUsuario.module.css'

function CardPromoter ({props}){
    
    
    let { name,pictures,id}=props
    console.log( 'soy props',props)
     let foto = props.pictures[0]
     console.log('hola soy foto',foto)
     const [eventRating, setEventRating] = useState(0)
      console.log ('soy calificacion',eventRating)

     useEffect(() => {
        const fetchData = async () => {
        let generalRating;
        try {
            generalRating = await axios.get(`https://event-henryapp-backend.herokuapp.com/api/comment/generalRating?id=${props.id}`)
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

    return(
        <>
        <div>
        <div className={styles.card}>
            <Link to ={`/eventDetailsUsuario/${id}`} className={styles.links}>
           <img src={foto} className={styles .imgCard} />
            <h5 className={styles .titleCard}>{name}</h5>
             <div>{
             eventRating !== 0 ? (
                                <>
                                    <p className={styles.generalRating}>
                                    Rating General: <span className={styles.generalStars}>{toStars(eventRating)}</span>
                                    </p>
                                    
                                </>
                            ) : (
                                <p className={styles.noRating}>
                                    Este evento todavia no tiene calificaciones.
                                </p>
                            )
                        }
                        </div>

                 
             
          

            </Link>
        </div>
        </div>
        
        </>
    )
}
 export default CardPromoter