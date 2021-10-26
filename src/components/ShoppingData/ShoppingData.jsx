import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styles from './ShoppingData.module.css';
import PayPalCheckoutButton from "../PayPalCheckoutButton/PayPalCheckoutButton";

const ShopingData = ({ checkout, total, user }) => {
  console.log(checkout)
  const [Order, setOrder] = useState({
    customer: user.username,
    total: total,
    items: checkout
  })

  return (
    <div className={styles.containerTwo}>
      <h3 className={styles.title}>Resumen de compra</h3>
      <div className={styles.contTitles}> 
          <p className={styles.pNameT}>Evento</p>
          <p className={styles.pQuantityT}>Cantidad</p>
          <p className={styles.pPriceT}>Precio</p>
        </div>
      <ul >
        {checkout.map((event) => (
          <li key={event.id} className={styles.li}>
            <div className={styles.liSubContainer}>
              <p className={styles.pName}> {event.name} </p>
              <p className={styles.pQuantity}> {event.quantity} </p>
              <p className={styles.pPrice}>${(event.price)*(event.quantity)}</p>
            </div>
          </li>
        ))}
      </ul>
     
      <p className={styles.total} className={styles.total}>Total<span className={styles.span}>:</span>{ total } </p>
      <div className={styles.paypalBtn}>
      <PayPalCheckoutButton 
      order={Order}/>
      </div>
      
    </div>
  );
};


function mapStateToProps(state) {
  return {
    checkout: state.checkoutItems,
    total: state.checkoutTotal,
    user: state.userState
  };
}

export default connect(mapStateToProps)(ShopingData);