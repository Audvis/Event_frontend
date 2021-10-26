import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./ShoppingCart.module.css";
import ShoppingList from "../ShoppingList/ShoppingList";
import ShoppingData from "../ShoppingData/ShoppingData";
import ShoppingOthers from "../ShoppingOthers/ShoppingOthers";
import { getEventsHome } from "../../actions/actions";

const ShoppingCart = ({ cart, getEventsHome, home }) => {
  //*p___________________________________________________________
  const [OffSetY, setOffSetY] = useState(0);
  const handleScroll = () => setOffSetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    getEventsHome();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const imgPruebaCabecera =
    "https://media.iastatic.es/ia_img/image/tienda-online_png_770x570_q85.jpg";

  //*-----------------------------------------------------------------

  return (
    <>
      <div className={styles.containerParrallax}>
        <img
          src={imgPruebaCabecera}
          alt=""
          className={styles.imgHead}
          style={{ transform: `translateY(${OffSetY * 0.5}px)` }}
        />
      </div>
      {cart.length === 0 ? (
        <div className={styles.containerEmpty}>
          <h4 className={styles.title}>
            No hay eventos guardados en el carrito
          </h4>
          <span className={styles.icon}>
                  <i className="fas fa-store-alt-slash"></i>
                </span>
        </div>
      ) : (
        <div className={styles.container}>
          <h2 className={styles.title}>Carrito De Compras</h2>
          {false ? (
            <div>
              <h4>
                No hay ningun evento o producto agregado al carrito de compras
              </h4>
            </div>
          ) : (
            <>
              <div className={styles.subContainer}>
                <div className={styles.list}>
                  <h3>Tus eventos en carrito</h3>
                  <ShoppingList />
                </div>
                {false ? (
                  <div className={styles.containerRight}>
                    {/* <ShoppingData 
                  setTotal={setTotal}
                /> */}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <Link to="/checkout" >
                <button className="bigBtn">
                Comprar
                </button>
              </Link>
                {home.length < 3? <h3>No hay eventos para mostrar</h3>: 
              <div>
                <ShoppingOthers />
              </div>
              }
            </>
          )}
        </div>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    cart: state.cartState,
    home: state.eventsHome
  };
}

export default connect(mapStateToProps, { getEventsHome })(ShoppingCart);
