import React from "react";
import styles from "./ActivityCard.module.css";
import {Link} from 'react-router-dom';


const ActivityCard = ({ event }) => {
  function setId(id) {
    console.log(id);
  }

  console.log(event, 'soy eventtttttttttttttttttt')

  return (
    <Link to={`/eventDetailsUsuario/${event.id}`}>
    <div className={styles.card}>
      <h2 className={styles.titleCard}>{event.name}</h2>
      <h4 className={styles.tagsCard}>{event.tags}</h4>
      <img src={event.pictures[0]} alt="Imagen Evento" className={styles.imgCard} />
      {event.sectorize==="no sectorizar" ? 
        <p className={styles.infoCard}>Precio: ${event.price}</p>:
        <p className={styles.infoCard}>Precio: Según sector</p>
      }
      {/* <p className={styles.infoCard}>Precio: ${event.price}</p> */}
      {/* <button className={styles.btnCard} onClick={() => setId(activity.id)}>
        Info
      </button> */}
      
      {/* <Link to={`/eventDetailsUsuario/${activity.id}`}>
        <button className={styles.btnCard} onClick={() => setId(activity.id)}>Info</button>
      </Link> */}
      
        {/* <Link to={`/eventDetailsUsuario/${event.id}`}>
        <button className={styles.btnCard} onClick={() => setId(event.id)}>Info</button>
        </Link> */}
    </div>
    </Link>
  );
};

export default ActivityCard;
