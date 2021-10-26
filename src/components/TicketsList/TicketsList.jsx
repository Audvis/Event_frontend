import React from 'react';
import Ticket from '../Ticket/Ticket';
import styles from './TicketsList.module.css'

const TicketsList = ( { ArrTickets } ) => {
    return (
        <>
        {ArrTickets.length === 0? <>
          <h3 className={styles.sin}>Sin Tickets</h3>
        <span className={styles.icon}>
        <i className="fas fa-exclamation-triangle"></i>
      </span>
      
      </>
      : 
        ArrTickets.map(ticket => (
             <li key={ticket.id} className={styles.li}>
             <Ticket 
               ticket={ticket}
             />
              </li>

            ))
          }
        </>
    )
}

export default TicketsList
