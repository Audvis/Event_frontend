import React, { useState, useEffect } from 'react';
import DisplayComments from '../../Comments/DisplayComments/DisplayComments';
import { Link , useParams, useHistory} from 'react-router-dom';
import  { useDispatch , useSelector, connect } from 'react-redux';
import { getEventDetail, changeModal, editEvent, addShopping,changeModalConfirm, API } from '../../../actions/actions';
import { Carousel } from 'react-carousel-minimal';
import Loading from '../../Loading/Loading';
import Heart from "react-animated-heart";
import styles from './EventDetailsUsario.module.css';
import axios from 'axios';
import CroquisEvent from '../../CroquisEvent/CroquisEvent';
import SelectSectorSin from './SelectSectorSin';


const pushDta=(detailsEvent)=>{
    let data = [];
    let picture = detailsEvent.consult?.pictures
    for (let index = 0; index < picture?.length; index++) {
        data.push({
            image:picture[index],
            caption:detailsEvent.consult.description,
        })
    }
    return data;
}
//Diego: Componente que muestra los detalles de un evento para el tipo Usuario.
const EventDetailsUsario = ({ addShopping, cart, user, changeModalConfirm }) => {
    
    const [render, setRender] = useState(false)
    const [data , setData] = useState()
    const [isClick, setClick] = useState(false); // Estado del corazon de favoritos
    const [isFavorite, setFavorite] = useState(false); // Muestra si el usuario ya tenia el evento favorito

    const dispatch = useDispatch()
    const params = useParams()

    const {id} = params
    const detailsEvent = useSelector(state => state.detailsEvent)
    const userInfo = useSelector(state => state.userState)
    
    // console.log(detailsEvent.sections)
    //console.log(JSON.parse(detailsEvent.consult.sectorize),'aquiiiiiiiiiiiiiiii mirameeeeeeeeeeee no te hagasssssssss')
    useEffect( () => {
        const fetchData = async () => {
            try{
                await dispatch(getEventDetail(id))
                setRender(true)
            }catch(error){
                alert('Algo salio mal al cargar este evento.')
            }
        }
        fetchData()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id]);

    const editEvento =() =>{
        dispatch(editEvent(detailsEvent.consult));
    }

    const deleteEvent = async()=>{  
        if(detailsEvent.consult.promoterId === userInfo.id){
            changeModalConfirm('correct', `Desea Eliminar el Evento ${detailsEvent.consult.name}`, null);
        }else{
            dispatch(changeModal('correct','No puedes eliminar un evento que no te pertenece'));
        }        
    }
    //Fin Borrar evento boton unicamente disponoble para promotor

    const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
    }

    useEffect(()=>{
        setData(pushDta(detailsEvent))  
        return () => {
            setData()  
            setClick(false)
            setFavorite(false)
        }
    },[detailsEvent])
    
    
    
    const setShopping = (event) => {
        addShopping(event)
    }
    
    const addOrRemoveFavorite = async (userId, eventName, eventId, heart, favorite) =>{
        try {
                // Checa si usuario ya lo tenia agregado para cambiar corazon
                const checkIfFavorite = await axios.get(`${API}user/${userId}`)
                if (
                    checkIfFavorite.data.favorite.filter(e => e.includes(eventName) && e.includes(id)).length
                    && !heart
                    && !favorite
                ){
                    setClick(true)
                    setFavorite(true)
                    return
                }
                // Si el corazon esta marcado, y el evento no esta incluido, agregar
                else if (heart && !favorite){
                    if (!checkIfFavorite.data.favorite.filter(e => e.includes(eventName)).length){
                        await axios.put(`${API}user/fav`,{
                            id_user: userId,
                            event: {
                                name: eventName,
                                id: eventId
                            },
                        })
                        setFavorite(true)
                    }
                    return
                }
                // Si el corazon esta desmarcado, eliminar
                else if (!heart && favorite){
                    await axios.put(`${API}user/fav`,{
                        id_user: userId,
                        event: eventId
                    })
                    setFavorite(false)
                    return
                }
            
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {                
            if (userInfo.id && detailsEvent.consult) {
                addOrRemoveFavorite(
                    userInfo.id,
                    detailsEvent.consult.name,
                    detailsEvent.consult.id,
                    isClick,
                    isFavorite
                )
            }
            else return
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userInfo.id, detailsEvent.consult, isClick, isFavorite])

    
    if(render){
        
        const whats ={whats:`https://api.whatsapp.com/send?phone=${detailsEvent.consult.promoter.phone}`}
        
         //* funcion agregar al carrito...Gerardo
        let eventCart = []
        // detailsEvent.consult?
        eventCart = cart.filter(e =>  e.id === detailsEvent.consult.id)
        // :eventCart = []
            return(   
            <div className={styles.detailsAllUser}>
                <div className='detailsCardUser'> 
                    <div className={styles.detailsCard2User}>
                        <h1 className={styles.titleCard}>{detailsEvent.consult.name}</h1>
                        <div className={styles.carouselImages}>                               
                            <Carousel   
                                data={data}
                                time={5000}
                                width="650px"
                                height="400px"
                                radius="10px"
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
                            {
                                // Boton de Favoritos
                                !userInfo.type ? (
                                    <div className={styles.heart}>
                                        <Heart                                            
                                            isClick={isClick}
                                            onClick={() => {
                                                alert('Inicia sesión para guardar este evento en tus favoritos.')                                            
                                            }} 
                                        />
                                    </div>
                                ) : (
                                    userInfo.type === 'user' ? (                                        
                                        <div className={styles.heart}>
                                            <Heart                                             
                                            isClick={isClick}
                                            onClick={() => {
                                                setClick(!isClick)
                                            }} 
                                            />
                                        </div>
                                    ) : (
                                        <span>&nbsp;</span>
                                    )
                                )
                                
                            }
                            <h4>Descripcion:</h4>
                            <p className={styles.description}>{ detailsEvent.consult.description}</p>
                            <div className={styles.detailsUsers2User}>
                                <div className={styles.leftColumn}>
                                    <h4>Artistas:</h4>
                                    <p>{` ${detailsEvent.consult.starring}`}</p>
                                    <h4>País:</h4>
                                    <p> {` ${detailsEvent.consult.location.country}`}</p>
                                    <h4>Estado/Provincia:</h4>
                                    <p> {` ${detailsEvent.consult.location.province}`}</p>
                                    <h4>Ciudad:</h4>
                                    <p> {` ${detailsEvent.consult.location.city}`}</p>
                                    <h4>Dirreción:</h4>
                                    <p> {` ${detailsEvent.consult.address}`}</p>
                                    <h4>Fecha:</h4>
                                    <p>{` ${detailsEvent.consult.start_date}`}</p>
                                    
                                </div>
                                <div className={styles.rightColumn}>
                                    <h4>Fecha Finalización:</h4>
                                    <p>{` ${detailsEvent.consult.finish_date}`}</p>
                                    <h4>Tipo de Evento:</h4>
                                    <p>{` ${detailsEvent.consult.tags}`}</p>
                                    <h4>Clasificación:</h4>                            
                                    <p>{` ${detailsEvent.consult.age_rating}`}</p>
                                    {detailsEvent.consult.sectorize==='no sectorizar'?
                                    <>
                                        <h4>Precio:</h4>                                    
                                        <p>{` $${detailsEvent.consult.price}`}</p>
                                    </>:detailsEvent.consult.sectorize==='sectorizar sin croquis'?
                                    <>
                                        <h4>Precio:</h4> 
                                        {detailsEvent.consult.sections?.map(p=><p>{p.name}: ${p.price}</p>)}
                                    </>:null
                                    }
                                    
                                </div>                                
                            </div>
                        </div>
                        
                        {user.type !== 'user'? <div></div>: 
                            <>
                            {detailsEvent.consult.sectorize==='sectorizar con croquis' ?                              
                                <CroquisEvent data={detailsEvent.consult.sections} detailsEvent={detailsEvent.consult} user={user} />
                                :null
                            }
                            {detailsEvent.consult.sectorize==='sectorizar sin croquis' ?                              
                                <SelectSectorSin data={detailsEvent.consult.sections} detailsEvent={detailsEvent.consult} user={user}/>
                                :null
                            }
                            {detailsEvent.consult.sectorize==='no sectorizar' ? 
                                eventCart.length === 1? <h3>Este evento ya se agrego al carrito</h3>: 
                                    <button onClick={() => setShopping(detailsEvent.consult)}>
                                        <span className={styles.icon}>
                                            <i className="fas fa-shopping-cart"></i>
                                        </span>
                                    </button>
                                :null
                            }
                            </>
                        }
                        {userInfo?.type=== 'promoter'||

                        <div className={styles.contRend}>
                                <h2 className='formTitle'>Promotor</h2>
                                <div className={styles.promoterRow}>
                                <Link to={`/PromoterPorfileUser/${detailsEvent.consult.promoter.id}`}>
                                <img
                                    src={detailsEvent.consult.promoter.picture}
                                    className={styles.promoterPicture}
                                    alt=''
                                />
                                
                            <span className={styles.promoterName}>
                                    {`${detailsEvent.consult.promoter.business_name}`}
                                </span>
                            </Link>
                            
                            <div className={styles.whats}>
                            <a href={whats.whats} target="_blank" rel="noopener noreferrer">
                                <img src='https://1.bp.blogspot.com/-c156R1-yBRg/YIJJXWpUS9I/AAAAAAAAFP4/Q7eQOnTtqesWS2Q7s8CxireQvnB1OwNUwCLcBGAsYHQ/w680/logo-whatsApp-'className={styles.whats} alt=''/>
                            </a>
                            </div>
                            </div>
                        </div>
                        }

                        {
                            !userInfo.type ? (
                                <span>&nbsp;</span>
                            ) : (
                                userInfo.type === 'promoter'&& detailsEvent.consult.promoterId === userInfo.id ? (
                                <>
                                    <button className={styles.button} onClick={editEvento}>Editar</button>
                                    <button className={styles.button} onClick={deleteEvent}>Eliminar</button>
                                </>
                                ) : (
                                    null
                                )
                            )
                        
                        } 
                        </div>

                        <div className='comments-container'>
                            <DisplayComments state={id}/>
                            <div>
                                {
                                    !userInfo.type ? (
                                        <button 
                                        onClick={e => alert('Solo usuarios logeados pueden dejar comentarios')}
                                        className={styles.button}>    
                                                Reseña
                                        </button>
                                    ) : (
                                        userInfo.type === 'user' ? (
                                        <Link to={{
                                            pathname:'/nuevoComentario',
                                            state: {
                                                id: id,
                                                eventName: detailsEvent.consult.name
                                            }
                                        }}>
                                            <button className={styles.button}>Reseña</button>
                                        </Link>
                                        
                                        ) : (
                                            <span>&nbsp;</span>
                                        )
                                    )
                                }
                            </div>
                            <br />
                            <br />
                        </div>
                    </div>   
                </div>
            
    )} 
    else{
        return (<Loading/>)
    }
}


function mapStateToProps(state) {
    return {
        cart: state.cartState,
        user: state.userState,
        modalConfirm: state.modalConfirm,
 
    };
}

    export default connect(mapStateToProps, { addShopping, changeModalConfirm })(EventDetailsUsario);