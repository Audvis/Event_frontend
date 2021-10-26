import React, { useEffect, useState } from "react";
import styles from './SelectSector.module.css'
import { addShopping, tiketsSections, updateInfoLimit } from '../../../actions/actions';
import { useDispatch, useSelector } from "react-redux";

const SelectSectorSin = ({data,idEvent,detailsEvent, user}) =>{
    const dispatch = useDispatch()
    const cart = useSelector(state=>state.cartState,)
    const [eventCart, setEventCart] = useState([])
    const [secciones, setSecciones]=useState([])
    const [comprar, setComprar] = useState({
        name:'',
        limit:'',
        price:'',
    })

    useEffect(()=>{
         setSecciones(data.map((d)=>d.name))
    },[data])

    useEffect(()=>{
        setEventCart(cart.filter(e =>  e.id === detailsEvent.id))
    },[cart])

    const changeSection=(e)=>{
        setComprar(data.find(s=>s.name === e.target.value))
    }

    const addCar = ()=>{
        const obj={
            id:detailsEvent.id,
            name:detailsEvent.name,
            fullName:user.fullName,
            idUser:user.id,
            promoterId:detailsEvent.promoterId,           
            type:false,//no croquis
            price:comprar.price,
            nameSection:comprar.name,
            address:detailsEvent.address,
            locationCountry:detailsEvent.location.country,
            locationProvince:detailsEvent.location.province,
            locationCity:detailsEvent.location.city,
            start_date:detailsEvent.start_date,
            schedule:detailsEvent.schedule,
            tags:detailsEvent.tags,
            pictures:detailsEvent.pictures,
            seating:['GENERAL'],
            idEvent,
        }
        dispatch(addShopping(obj))
        // let dataindex = data.findIndex(d=>d.name===comprar.name)
        // let dataUpdateLimit = data.find(d=>d.name===comprar.name)
        let objUpdate = {
            idEvent:detailsEvent.id,
            dataUpdate:data,
            type:'sector'
        }

        //dispatch(updateInfoLimit(objUpdate))
    }

    
    return(
        eventCart.length >= 1? <h3>Este evento ya se agrego al carrito</h3>: 
        <>
            
            <select className={styles.selectSections} onChange={changeSection}>
                <option value="" >Seleccione Sector</option>
                {secciones.map(seccion=>
                    <option key={seccion} value={seccion}>{seccion}</option>
                )}
            </select>
            {comprar.limit ? <button className="regularBtn" onClick={addCar}>Agregar al carrito</button>:
            null   
            }
        </>
    )
}

export default SelectSectorSin
