import React from "react";
import { connect } from "react-redux";
import { setSideBar } from "../../actions/actions";
import Search from "../Search/Search";
import styles from './NavBarHome.module.css'

const NavBarHome = ({ setSideBar, switchSide}) => {
  function setSide() {
    if (switchSide) {
      setSideBar(false);
    } else setSideBar(true);
  }
  return (
    <div>
      <div className={styles.subNav}>
        <button className="regularBtn" onClick={setSide}>
          <span className={styles.icon}>
            <i className="fas fa-bars"></i>
          </span>
        </button>
        <Search/>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    switchSide: state.sideBarSwitch,
  };
}

export default connect(mapStateToProps, { setSideBar })(NavBarHome);
