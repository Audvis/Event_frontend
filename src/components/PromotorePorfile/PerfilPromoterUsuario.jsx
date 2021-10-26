
import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './PerfilPromoterUsuario.module.css';
import {Link, useParams} from 'react-router-dom';
import {getPromoterUser} from '../../actions/actions';
import Loading from "../Loading/Loading";
import Card from './Card';
import FollowButton from "../Follow/FollowButton";
import Pagination from'./pag'

/* import axios from 'axios' */

//epp:evento por pagina 

const PromotorePorfile = () =>{
    const [render, setRender] = useState(false)
    const [page, setPage]=useState(1)
    const [epp]=useState(2)
    const dispatch =useDispatch();
    const params =useParams();
    const {id}=params;
    const promoterUser=useSelector(state=>state.promoterUser);
    const userInfo = useSelector(state => state.userState);

    /*
    ÁREA DE PRUEBAS EN CONSOLA:
    console.log('soy promoter: ', promoterUser);
    console.log('soy whats: ', whats);
    console.log('soy evento: ', eventos);
    console.log('soy user: ', userInfo);
    PONER LOS LOGS QUE SE QUIERAN PROBAR ABAJO: */

    useEffect( async ()=>{
        await dispatch(getPromoterUser(id))
        setRender(true)

    },[id, FollowButton])


    if(render){
        const indexOfLastEvents= page * epp
        const indexOfFirstEvents = indexOfLastEvents - epp
        const eventos = promoterUser.eventPromotor.events?.slice(indexOfFirstEvents,indexOfLastEvents)
        const  p = np =>setPage(np)
        const whats ={url:`https://api.whatsapp.com/send?phone=${promoterUser.eventPromotor.phone}`}
        const followCount = promoterUser.eventPromotor.followed_by.length;
        return(

        <div className={styles.contPrin}>
            <div className={styles.contProfile}>
                <div className={styles.imgProfile}>
                    <img src={promoterUser.eventPromotor.picture} alt="" />
                </div>
{/*                 <div className={styles.contInfo} >
                </div> */}
            </div>
            <h3>{promoterUser.eventPromotor.business_name}</h3>
            <h3>{promoterUser.eventPromotor.business_type} </h3>
            <span>{followCount} seguidores</span>
           { /* Convertir en link y derivar a view que liste los seguidores */ }
            { userInfo?.type === 'user' ?
                <FollowButton /> :
                <div>&nbsp;</div>
            /* Sólo mostrar botón Seguir si estoy logueado */}
            <div className={styles.whats}>
                    <a href={whats.url} target="_blank" rel="noopener noreferrer">
                        <img src='https://1.bp.blogspot.com/-c156R1-yBRg/YIJJXWpUS9I/AAAAAAAAFP4/Q7eQOnTtqesWS2Q7s8CxireQvnB1OwNUwCLcBGAsYHQ/w680/logo-whatsApp-'className={styles.whats}/>
                    </a>
                </div>
            <hr/>

            <div className={styles.contEvents}>
                <div className={styles.barEvent}>
                    <h4>Mis Eventos</h4>

                </div>
                <div className={styles.cards}>
                    { eventos ?
                    eventos.map((e, id)=>{
                       return  <Card props={e} key={id}/> }) :
                        <Loading/>
                    }
                </div>
                <Pagination epp={epp} totalEvents={promoterUser.eventPromotor.events?.length} p={p} />
                {console.log('naaa', promoterUser.eventPromotor.events?.length)
                }

            </div>
        </div>
        );
    } else { return(<Loading/>) }
}

export default PromotorePorfile;