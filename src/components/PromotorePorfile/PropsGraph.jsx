import {Link} from 'react-router-dom'
import{useEffect, useState} from 'react'
import axios from 'axios'


function CardPromoter ({props}){
    
    
    let { nameEvent,total,idEvent}=props
    console.log( 'soy props',props)
     const [data, setData]=useState

     useEffect(() => {
        const Datos = async () => {
    
         
        let precios;
       
        try {
           precios = await axios.get(`https://event-henryapp-backend.herokuapp.com/api/ticket/event/${props.idEvent}`)
            if (precios && precios.data !== 0) setData(precios.data)
           // setRender(true)
        } catch (error) {
            console.log(error)
        }
        }
    
    
    Datos()
    
    },[])
    
      let name = data.nameEvent
      console.log('soy el nombre', name )
      let totales = data.total
      console.log('soy total',totales)




    return(
        <>
        <div>
        
        
           <h1>{name}</h1> 
           <h2>{totales}</h2>
             
           
                     

                 
             
          

        
        </div>
        
        </>
    )
}
 export default CardPromoter