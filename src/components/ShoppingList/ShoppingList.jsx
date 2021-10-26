import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styles from './ShoppingList.module.css';
import { deleteShopping, setTotalCheckout } from '../../actions/actions';
import ShoppingListItem from "../ShoppingListItem/ShoppingListItem";

const ShoppingList = ({ events, deleteShopping, checkout, setTotalCheckout}) => {
  

//*F.Plus___________________________________________________________
const [Total, setTotal] = useState(0);
const price = checkout.map((e) => Number(e.price)*e.quantity);



useEffect(() => {
  
  const addMoney = (arr) => {
    const reducer = (acc, cur) => acc + cur;
    if (arr.length === 0) {
      setTotal(0)
    return;
    }
    setTotal(arr.reduce(reducer))
    setTotalCheckout(arr.reduce(reducer))
    return;
  };
  addMoney(price)
 
}, [checkout])
//*---------------------------------------------------------------

  const setDelCart = (id) => {
    deleteShopping(id)
  }
  return (
    <>
    <ul className={styles.ul}>
        {events.map((event) => (
          <li className={styles.li} key={event.id}>
                <ShoppingListItem 
          event={event}
          setDelCart={setDelCart}
         />
          </li>
        ))}
      </ul>
      <h3 className={styles.total} >total<span className={styles.span}>:</span>{Total}</h3>
      </>
  );
};

function mapStateToProps(state) {
  return {
    events: state.cartState,
    checkout: state.checkoutItems
  };
}
export default connect(mapStateToProps, { deleteShopping, setTotalCheckout })(ShoppingList);