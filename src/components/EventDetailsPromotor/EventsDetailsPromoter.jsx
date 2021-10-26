
import React, { useState } from 'react'
import DisplayComments from '../Comments/DisplayComments/DisplayComments'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import  { useDispatch , useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getEventDetail, changeModal } from '../../actions/actions';
import { Carousel } from 'react-carousel-minimal';
import Loading from '../Loading/Loading'
import styles from './EventsDetailsPromoter.css'
import Logo from '../../Utilities/logodivinacodi.gif'
import eVent from '../../Utilities/eVent-05.svg'

const pushDta=(detailsEvent)=>{
    let data = []
    let picture = detailsEvent.result?.pictures
    
    for (let index = 0; index < picture?.length; index++) {
        data.push({image:picture[index],caption:detailsEvent.result.description})
        console.log(data)
    }
    return data
}
//Diego: Componente que muestra los detalles de un evento para el tipo Usuario.
export default function EventDetailsUsario() {

    
    // Diego: Variable solo para que no tire Warning en la consola sobre unique keys
        
        const [render, setRender] = useState(false)
        const [data , setData] = useState()
        const dispatch = useDispatch()
        const params =useParams()
        const {id}=params
        const detailsEvent = useSelector(state => state.detailsEvent)
        console.log('holis cesar soy detalle ', detailsEvent)

        useEffect(async()=>{
            try{
                await dispatch(getEventDetail(id))
                setRender(true)
            }catch(error){
                dispatch(changeModal('incorrect', 'intentalo mas tarde'))
            }
        },[id])
  
        const  logo = Logo
        const event = eVent
       

      
        const slideNumberStyle = {
            fontSize: '20px',
            fontWeight: 'bold',
        }

        useEffect(()=>{
            setData(pushDta(detailsEvent))
        },[detailsEvent])

    if(render&&detailsEvent.result){
            return(   
            <div className={styles.detailsAllUser}>
                <div className='detailsCardUser'> 
                    <div className='deailscard2User'>
                        <h1 className={styles.titleCard}>{detailsEvent?.result.name}</h1>
                        <div className='img'>                               
                            <Carousel   
                                data={data}
                                time={5000}
                                width="650px"
                                height="400px"
                                radius="10px"
                                //captionStyle={captionStyle}
                                slideNumber={true}
                                slideNumberStyle={slideNumberStyle}
                                captionPosition="bottom"
                                automatic={true}
                                dots={false}
                                pauseIconColor="white"
                                pauseIconSize="40px"
                                slideBackgroundColor="darkgrey"
                                slideImageFit="auto"
                                thumbnails={true}
                                thumbnailWidth="100px"
                                style={{
                                    maxWidth: "650px",
                                    maxHeight: "450px",
                                    margin: "40px auto",
                                }} />                               
                        </div>  
                        <div className={styles.otherDetailsUser}>  
                            <br/> 
                            <h4 className='h4'>Descripcion:</h4>
                            <p className={styles.description}>{ detailsEvent.result.description}</p>
                            <div className={styles.detailsUsers2User}>
                                <div className={styles.leftColumn}>
                                    <h4 className='h4'>Artistas:</h4>
                                    <p className='p'>{` ${detailsEvent.result.starring}`}</p>
                                    <h4 className='h4'>Dirreción:</h4>
                                    <p className='p'> {` ${detailsEvent.result.address}`}</p>
                                    <h4 className='h4'>Fecha:</h4>
                                    <p className='p'>{` ${detailsEvent.result.start_date}`}</p>
                                    <h4 className='h4'>Fecha Finalización:</h4>
                                    <p className='p'>{` ${detailsEvent.result.finish_date}`}</p>
                                    <h4 className='h4'>Dias:</h4>
                                    <p className='p'>{` ${detailsEvent.result.weekdays.map((e)=>(e))}`}</p>
                                </div>
                                <div className={styles.rightColumn}>
                                    <h4 className='h4'>Horarios:</h4>
                                    <p className='p'>{` ${detailsEvent.result.schedule.map((e)=>(e))}`}</p>
                                    <h4 className='h4'>Tipo de Evento:</h4>
                                    <p className='p'>{` ${detailsEvent.result.tags}`}</p>
                                    <h4 className='h4'>Clasificación:</h4>                            
                                    <p className='p'>{` ${detailsEvent.result.age_rating}`}</p>
                                    <h4 className='h4'>Precio:</h4>
                                    <p className='p'>{` $${detailsEvent.result.price}`}</p>
                                     <h4>limite de asiastentes:</h4>
                                    <p>{` ${detailsEvent.result.ticket_limit}`}</p>
                                    <h4>Croquis:</h4> {` ${detailsEvent.result.seat_booking} `} 
                                    
                                </div>                                
                            </div>
                        </div>
                        <div className={styles.buttonContainer}>
                            <button className="regularBtn">Reservar</button>
                            <Link to={{
                                pathname:'/nuevoComentario',
                                state: id
                            }}>
                            <button className="regularBtn">Reseña</button>
                            </Link>
                         </div>
                    </div>   
                </div>
            </div>      
    )} 
    else{
        return (<Loading/>)
    }
}

