import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import axios from "axios";
import styles from "./TicketsContainer.module.css";
import TicketsList from "../TicketsList/TicketsList";
import moment from "moment";
import "moment/locale/es";

const TicketsContainer = () => {
  const API = "https://event-henryapp-backend.herokuapp.com/api/";
  // const API = 'http://localhost:3001/api/'
  // const ID = 'fb3a7e28-67cf-434f-855e-2b83acab361f'
  const props = useRouteMatch();
  const ID = props.params.id;

  const [ArrTickets, setArrTickets] = useState([]);
  const [Switch, setSwitch] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      const tickets = await axios.get(`${API}ticket/user/${ID}`);
      console.log("tickets--------------", tickets);
      setArrTickets(tickets.data);
    };
    fetchTickets();
  }, [setArrTickets]);

  //parallax
  const [OffSetY, setOffSetY] = useState(0);
  const handleScroll = () => setOffSetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const imgPruebaCabecera =
    "https://www.institutoorl-iom.com/wp-content/uploads/2016/02/los-oidos-concierto.jpg";

  //funciones
  const setSwitchPass = () => {
    setSwitch(true);
  };
  const setSwitchProx = () => {
    setSwitch(false);
  };

  //separar eventos pasados
  const nowEvents = ArrTickets.filter(
    (e) => moment(e.date).format("L") === moment().format("L")
  );
  const passEvents = ArrTickets.filter(
    (e) => moment(e.date) < moment().subtract(1, "days")
  );
  const proxEvents = ArrTickets.filter((e) => moment(e.date) > moment());
  //ordenar por fecha
  moment.locale("es");
  const sortedPassEvents = passEvents.sort(
    (a, b) => moment(b.date).unix() - moment(a.date).unix()
  );
  const sortedProxEvents = proxEvents.sort(
    (a, b) => moment(a.date).unix() - moment(b.date).unix()
  );

  return (
    <div className={styles.container}>
      <div className={styles.containerParrallax}>
        <img
          src={imgPruebaCabecera}
          alt=""
          className={styles.imgHead}
          style={{ transform: `translateY(${OffSetY * 0.5}px)` }}
        />
      </div>
      <div className={styles.subContainer}>
        <h2 className={styles.title}>Mis Boletos</h2>
        <div className={styles.contContainers}>
        {nowEvents.length !== 0 ? (
          <div className={styles.ulContainerNow}>
            <ul className={styles.ul}>
              <TicketsList ArrTickets={nowEvents} />
            </ul>
          </div>
        ) : (
         <></>
        )}

        <div className={styles.containerSwitch}>
          <div>

          <button className={styles.btnP}onClick={setSwitchPass}>Próximos</button>
          <button className={styles.btnPass} onClick={setSwitchProx}>Pasados</button>

          </div>
          {Switch ? (
            <div className={styles.ulContainer}>
              <ul className={styles.ul}>
                <TicketsList ArrTickets={sortedProxEvents} />
              </ul>
            </div>
          ) : (
            <div className={styles.ulContainerPass}>
              <ul className={styles.ul}>
                <TicketsList ArrTickets={sortedPassEvents} />
              </ul>
            </div>
          )}
        </div>
        </div>

      </div>
    </div>
  );
};


export default TicketsContainer;


