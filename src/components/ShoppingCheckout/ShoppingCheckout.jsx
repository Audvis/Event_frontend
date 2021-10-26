import React, { useState, useEffect } from "react";
import ShoppingData from "../ShoppingData/ShoppingData";
import styles from "./ShoppingCheckout.module.css";

const ShoppingCheckout = () => {
  //*p___________________________________________________________
  const [OffSetY, setOffSetY] = useState(0);
  const handleScroll = () => setOffSetY(window.pageYOffset);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const imgPruebaCabecera =
    "https://static1.abc.es/media/bienestar/2020/11/24/compras-blak-friday-knN--1024x512@abc.jpg";

  //*-----------------------------------------------------------------

  return (
    <div>
      <div className={styles.containerParrallax}>
        <img
          src={imgPruebaCabecera}
          alt=""
          className={styles.imgHead}
          style={{ transform: `translateY(${OffSetY * 0.5}px)` }}
        />
      </div>
      <div className={styles.containerData}>
      <ShoppingData />
      </div>
      
    </div>
  );
};

export default ShoppingCheckout;
