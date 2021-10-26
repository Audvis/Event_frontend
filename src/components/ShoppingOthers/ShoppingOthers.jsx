import React, { useEffect } from "react";
import { connect } from "react-redux";
import ActivityCard from "../ActivityCard/ActivityCard";
import styles from "./ShoppingOthers.module.css";
import { getEventsHome } from "../../actions/actions";


const ShoppingOthers = ({ events, getEventsHome }) => {
  let moreEvents = [];

    useEffect(() => {
    getEventsHome();
  }, [getEventsHome]);

  for (let i = 0; i < 3; i++) {
    moreEvents.push(events[i])
  }

 
 
  return (
    <div className={styles.container}>
      <h3 >Mas Eventos En Tu Ciudad</h3>
      {moreEvents.length === 3? (
        <ul className={styles.ul}>
          {moreEvents.map(e => (
            <li key={e.id}> <ActivityCard 
            event={e}
            /></li>
          ))}
        </ul>
      ) : (
        <h6>No hay eventos que mostrar</h6>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    events: state.eventsHome,
  };
}

export default connect(mapStateToProps, { getEventsHome })(ShoppingOthers);
