import React from "react";
import styles from "./SideBar.module.css";
import Filter from "../Filters/Filter";

const SideBar = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.aside}>
        <h2  className={styles.title}>Filtrar eventos por:</h2>
        <Filter/>
      </aside>
    </div>
  );
};

export default SideBar;
