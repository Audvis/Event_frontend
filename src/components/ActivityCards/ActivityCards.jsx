import React from 'react'
import ActivityCard from '../ActivityCard/ActivityCard'
import styles from './ActivityCards.module.css'

const ActivityCards = ({events})=>{



    return (
        <div className={styles.Events}>
            <ul className={styles.ul}>
            {events.map(event => (
                <li key={event.id}>
                     <ActivityCard
                     event={event}
                     />
                </li>
                
            ))}
            </ul> 
        </div>
    )
}

export default ActivityCards