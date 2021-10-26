import React from 'react';
import styles from './ListEvent.module.css';
import Bienvenido from '../Loading/Bienvenido'
import Evento from './Event';



// {(() => {
//     if (someCase) {
//       return (
//         <div>someCase</div>
//       )
//     } else if (otherCase) {
//       return (
//         <div>otherCase</div>
//       )
//     } else {
//       return (
//         <div>catch all</div>
//       )
//     }
//   })()}

const ListEvent = ({events,user})=>{
    
    return(
        <div className={styles.containerList}>
            {(()=>{
                if(events.length===0 && !user){
                    return(<Bienvenido/>)
                }else{
                    return( events?.map((event,id)=>
                    <Evento props={event} key={id} id={event.id}/>)
                     ) }

            })()}
        </div>
    )
}

export default ListEvent