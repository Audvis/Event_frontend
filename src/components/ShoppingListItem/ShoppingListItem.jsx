import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styles from "./ShoppingListItem.module.css";
import {
  addCheckout,
  deleteCheckout,
  addTicket,
  deleteTicket,
} from "../../actions/actions";


const ShoppingListItem = ({
  event,
  setDelCart,
  addCheckout,
  deleteCheckout,
  addTicket,
  user,
  deleteTicket,
}) => {
  const [NumItem, setNumItem] = useState(!event.type?1:event.quantity);
  const [NewPrice, setNewPrice] = useState(event.price);
  const eventCheck = {
    sku: event.id,
    name: event.name,
    price: `${event.price}.00`,
    //section: event.nameSection,
    quantity: NumItem,
    currency: "MXN",
  };

  console.log("evento-------------------", event.promoterId);
  const ticket = {
    idUser: user.id,
    nameUser: user.fullName,
    idEvent: event.id,
    nameEvent: event.name,
    idPromoter: event.promoterId,
    price: event.price,
    total: Number(event.price) * NumItem,
    quantity: NumItem,
     direction: event.address,
    date: event.start_date,
    schedule: event.schedule,
    nameSection: event.nameSection,
    // locationCountry: cos.location.country,
    // locationProvince: cos.location.province,
    // locationCity: cos.location.city
    seating: event.type? event.seating: ['Generales'],
  };


  useEffect(() => {
    addCheckout(eventCheck);
    addTicket(ticket);
  }, [NumItem]);

  const setEliminate = (id) => {
    setDelCart(id);
    deleteCheckout(id);
    deleteTicket(id);
  };

  const setAdd = () => {
    setNumItem(NumItem + 1);
    setPlus();
  };
  const setPlus = () => {
    setNewPrice(Number(event.price) + Number(event.price) *  NumItem);
  };

  const setDel = () => {
    setNumItem(NumItem - 1);
    setSub();
  };
  const setSub = () => {
    setNewPrice(NewPrice - NewPrice / NumItem);
  };

  return (
    <>
      <img src={event.pictures[0]} alt="" className={styles.img} />
      <h4> {event.name} </h4>
      <p className={styles.tag}>{event.tags}</p>

      {event.type ? (
        <>
          <p className={styles.num}>{event.quantity}</p>
          <p className={styles.p}>${event.price * event.quantity}</p>
        </>
      ) : (
        <>
          <div className={styles.middle}>
            {NumItem === 1 ? (
              <button className={styles.btnCount}></button>
            ) : (
              <button onClick={setDel} className="regularBtn">
                -
              </button>
            )}
            <p className={styles.num}>{NumItem}</p>
            <button onClick={setAdd} className="regularBtn">
              +
            </button>
          </div>
          <p className={styles.p}>${event.price * NumItem}</p>
        </>
      )}

      <button onClick={() => setEliminate(event.id)} className="regularBtn">
        X
      </button>
    </>
  );
};

function mapStateToProps(state) {
  return {
    checkOut: state.checkoutItems,
    user: state.userState,
  };
}

export default connect(mapStateToProps, {
  addCheckout,
  deleteCheckout,
  addTicket,
  deleteTicket,
})(ShoppingListItem);

