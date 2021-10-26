import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import axios from "axios";
import styles from "./TicketPdf.module.css";
import jsPDF from "jspdf";
import logo from "../../Utilities/logoProvi.png";

const TicketPdf = () => {
  const API = "https://event-henryapp-backend.herokuapp.com/api/";
  // const API = "http://localhost:3001/api/";
  // const ID = 'd123cf7a-e1f7-4e21-b425-7f905ade9954'
  const props = useRouteMatch();
  const ID = props.params.id;

  const [Ticket, setTicket] = useState({});

  useEffect(() => {
    const fetchTickets = async () => {
      const ticket = await axios.get(`${API}ticket/${ID}`);

      setTicket(ticket.data);
    };
    fetchTickets();
  }, [setTicket]);

  let date = [];
  !Ticket.date ? (date = ["00", "00", "00"]) : (date = Ticket.date.split("-"));

  //funciones
  const createPdf = () => {
    let doc = new jsPDF("p", "pt", "a4");
    doc.addImage(logo, "PNG", 0, 0, 600, 200);
    //  doc.addPage()

    doc.setFont("Courier New", "bold");
    doc.setFontSize(40);
    doc.text(Ticket.nameEvent, 300, 270, "center" );
    doc.setFont("Arial", "normal");
    doc.setFontSize(25);
    doc.text(`${date[2]}/${date[1]}/${date[0]}`, 300, 330, "center");
    doc.text(`${Ticket.schedule}Hrs`, 300, 370, "center");
    doc.text(`${Ticket.direction}`, 300, 410, "center");
    doc.text( `${Ticket.nameUser}`, 300, 450, "center");
    doc.text(`Entradas: ${Ticket.quantity}`, 300, 490, "center");
    doc.text(`Precio: ${Ticket.price}`, 300, 530, "center");
    doc.text(`Total: ${Ticket.total}`, 300, 570, "center");
    doc.text("Asientos: ", 300, 610, "center");
    doc.setFont("Arial", "bold");
    doc.text(`${Ticket.seating.map((e) => e)}`, 300, 650, "center");
    doc.setFont("Courier New", "bold");
    doc.setFontSize(15);
    doc.text(Ticket.id, 300, 810, "center" );
    doc.save(`Event-${Ticket.nameEvent}-${date[2]}/${date[1]}/${date[0]}.pdf`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <img src={logo} alt="" className={styles.img} />
        <div className={styles.containerData}>
          <h3 className={styles.title}>{Ticket.nameEvent}</h3>
          <p className={styles.p}>{`${date[2]}/${date[1]}/${date[0]}`}</p>
          <p className={styles.p}>{Ticket.schedule}</p>
          <p className={styles.p}>{Ticket.direction}</p>

          <p className={styles.p}>{Ticket.nameUser}</p>
          
          <p className={styles.p}>{`Entradas: ${Ticket.quantity}`}</p>
          
          <p className={styles.p}>{`Precio unitario: ${Ticket.price}`}</p>
          <p className={styles.p}>Total: {Ticket.total}</p>
          <p className={styles.pSeating}>Asientos: </p>
          <div className={styles.seating}>
            {!Ticket.seating ? (
              <h4 className={styles.p}>Sin Asientos</h4>
            ) : (
              <ul className={styles.ul}>
                {Ticket.seating.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <p className={styles.id}>{Ticket.id}</p>
      </div>
      <button className={styles.btn} onClick={createPdf} type="primary">
        DESCARGA
      </button>
    </div>
  );
};

export default TicketPdf;
