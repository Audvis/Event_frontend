import React from 'react';
import styles from './ListEvent.module.css';
import Bienvenido from '../Loading/Bienvenido'
import Evento from './Event';
import FakeDB from '../../FakeDB/FakeDB'


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

const ListEvent = ({events})=>{
    console.log('se q se guardo')
    return(
        <div className={styles.containerList}>
            {(()=>{
                if(events.length===0){
                    return(<Bienvenido/>)
                }else{
                    return( events?.map((event)=>
                    <Evento name={event.name} qualification='4' id={event.id}/>)
                     ) }

            })()}
        </div>
    )
}

export default ListEvent