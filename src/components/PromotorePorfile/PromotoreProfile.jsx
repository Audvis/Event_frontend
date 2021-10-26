import React, { useEffect, useState } from "react";
import ListEvent from "./ListEvent";
import { Bar } from 'react-chartjs-2';
import Grafica from  './GraphPromoter'
import styles from './PromotorePorfile.module.css';
import { Link, useParams } from 'react-router-dom';
import { getEventPromoter, getPromoterUser } from "../../actions/actions";
import { connect, useSelector, useDispatch } from 'react-redux';
import Loading from "../Loading/Loading";

const PromotorePorfile = ({userData, getEventPromoter, promoterEvents}) =>{
 // STATES:
    const [render, setRender] = useState(false);
    const dispatch =useDispatch();
    const promoterUser=useSelector(state=>state.promoterUser);
    const userInfo = useSelector(state => state.userState);


    useEffect(()=>{

        const getEvents = async()=>{
            try{
            const events = await getEventPromoter(userData.id)
            return events
            }catch(error){
                console.log(error)
                return error
            }
        }
        const eventos = getEvents()
    },[])

    useEffect( async ()=>{
        await dispatch(getPromoterUser(userData.id))
        setRender(true)
    },[userData.id])
if(render) {
    const followCount = promoterUser.eventPromotor.followed_by.length;
    return(
        <div className={styles.contPrin}>
            <div className={styles.contProfile}>
                <div className={styles.imgProfile}>
                    <img src={userData.picture} alt="" />
                </div>
            </div>

            <div className={styles.contInfo} >
                <h3>{userData.business_type} {userData.business_name}</h3>
                <span>Tienes {followCount} seguidores</span>
            </div>
            <hr/>

            <div className={styles.contEvents}>
                <div className={styles.barEvent}>
                    <h4>Mis Eventos</h4>
                    <Link to='/FormEvent' className={styles.link}>
                        <button className="regularBtn">Nuevo Evento</button>
                    </Link>
                </div>

                <ListEvent events={promoterEvents}/>
                <Grafica events ={userData}/>

            </div>
        </div>
    );
} else {
    return (<Loading/>)
  }
}
function mapStateToProps(state){
    return {
        promoterEvents:state.promoterEvents,
    }
}

export default connect(mapStateToProps,{getEventPromoter})(PromotorePorfile)
