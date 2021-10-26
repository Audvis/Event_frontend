import React, { useEffect, useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import { getEventDetail, tiketsSections, changeModal, addShopping, updateInfoLimit } from "../../actions/actions";
import SelectSector from "../Details/EventDetailsUsario/SelectSector";
import styles from './CroquisEvent.module.css'
import FilaEvent from "./FilaEvent";

const CroquisEvent = ({data, modPut, idEvent,detailsEvent,user})=>{
    const dispatch = useDispatch()
    const cart = useSelector(state=>state.cartState)
    const details = useSelector(state=>state.detailsEvent)
    const [eventCart, setEventCart] = useState([])
    let dataUpdate = [...data]
    //const [dataUpdate, setDataUpdate] = useState([...data])
    const [select, setSelect] = useState('')
    const [croquis, setCroquis] = useState({
        name:'',
        price:'',
        limit:null,
        filas:[],
    });//croquis que renderizo
    const [tickets, setTickets] = useState({
        sectionName:croquis.name,
        price:croquis.price,
        tickets:[]
    });//tikets selecionados
    useEffect( () => {
        const fetchData = async () => {
            try{
                dispatch(getEventDetail(detailsEvent.id))
            }catch(error){
               console.log(error)
            }
        }
        fetchData()        
    },[select]);

    useEffect(()=>{
        setEventCart(cart.filter(e =>  e.id === detailsEvent.id))
    },[cart])

    

   
    const addCar = ()=>{//agrega al carrito y envia a redux info del ticket
        
        const obj={
            id:detailsEvent.id,
            name:detailsEvent.name,
            fullName:user.fullName,
            idUser:user.id,
            promoterId:detailsEvent.promoterId,           
            type:true,//no croquis
            price:tickets.price,
            //limit:croquis.limit,
            quantity: tickets.tickets.length,
            nameSection:tickets.sectionName,
            address:detailsEvent.address,
            locationCountry:detailsEvent.location.country,
            locationProvince:detailsEvent.location.province,
            locationCity:detailsEvent.location.city,
            start_date:detailsEvent.start_date,
            schedule:detailsEvent.schedule,
            tags:detailsEvent.tags,
            pictures:detailsEvent.pictures,
            seating:tickets.tickets.map(e => (
                ` F${e.fila}/S${e.silla} `
            )),
            idEvent,
        }
        dispatch(addShopping(obj))

        let dataUpdateLimit = dataUpdate.map(d=>{
            if(d.name===tickets.sectionName){
                d.limit = d.limit-tickets.tickets.length
                return d
            }
            return d
        })
        let objUpdate = {
            idEvent:detailsEvent.id,
            dataUpdate:dataUpdateLimit,
            type:'croquis',
        }
        dispatch(updateInfoLimit(objUpdate))
    }
        
    const changeSection = (e)=>{//cuando cambia la seccion se setea el plano del croquis
        setSelect(e.target.value)
        let act = details.consult.sections?.find(sec => sec.name === e.target.value)
        setCroquis(act)
        setTickets({
            sectionName:e.target.value,
            price:act.price,
            tickets:[]
        });
        dataUpdate = [...data]
    }

    const addTicket = (puesto)=>{//se agrega ticket al stado local
        setTickets({
            sectionName:croquis.name,
            price:croquis.price,
            tickets:[...tickets.tickets,puesto]
        });
        const newArray = croquis.filas
        newArray[puesto.fila-1][puesto.silla-1].estado = 'seleccionado'
        setCroquis({
            ...croquis,
            filas:newArray
        })
        const index = dataUpdate.findIndex(sec=>sec.name === croquis.name)
        const newData = dataUpdate
        newData[index].filas[puesto.fila-1][puesto.silla-1].estado='no disponible'
        dataUpdate = newData
    }

    const removeTicket = (puesto)=>{
        let newTickets = tickets.tickets.filter(t=>!(t.fila===puesto.fila && t.silla===puesto.silla))
        setTickets({
            sectionName:croquis.name,
            price:croquis.price,
            tickets:newTickets,
        });
        const newArray = croquis.filas
        newArray[puesto.fila-1][puesto.silla-1].estado = 'disponible'
        setCroquis({
            ...croquis,
            filas:newArray
        })
        const index = dataUpdate.findIndex(sec=>sec.name === croquis.name)
        const newData = dataUpdate
        newData[index].filas[puesto.fila-1][puesto.silla-1].estado='disponible'
        dataUpdate = newData
    }

    return (
    eventCart.length >= 1? <h3>Este evento ya se agrego al carrito</h3>:
    <div className={styles.contTable}>
            <SelectSector data={data} changeSection={changeSection}/>
            <table>
            <tbody>
                {croquis.filas?.map((fila,i)=>  <FilaEvent 
                                                key={`fila${i+1}`} 
                                                data={fila}
                                                addTicket={addTicket}
                                                fila={i+1}
                                                removeTicket={removeTicket}
                                            />)}
            </tbody>   
            </table>
            {tickets.tickets.length? 
                <button className="regularBtn" onClick={addCar}>Agregar al carrito</button>:
                null   
            }
            
               
    </div>
    )
}

export default CroquisEvent