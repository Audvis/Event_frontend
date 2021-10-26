import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { setUser } from "../../actions/actions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Logout from '../Logout/Logout'
import img2 from '../../Utilities/eVent-08.svg';


const NavBar = ({ user, setUser, cart }) => {
  const history = useHistory();

  const [Out, setOut] = useState(false);

  //*Funciones
  const redirec = () => {
    history.push("/");
  };
  const setLogout = () => {
    setOut(true);
  };

  return (
    <>
      <nav className={styles.Navbar}>
        <Link to="/" className={styles.homeBtn}>
          <img className={styles.homeLogo} src={img2} alt=" eVent" />
        </Link>
        <div className="contFlex">
          {user.msg ? (
            <>
              <Link to="/perfil">
                <div className="contFlex margRgth20" container>
                  <img
                    src={user.picture}
                    alt=""
                    className="imgSize10 margRgth10"
                  />
                  <p className="txColorWht txSize15">
                    {user.type === "user" ? user.username : user.business_name}
                  </p>
                </div>
              </Link>

              <a className="logoutBtn pointer" onClick={setLogout}>
                Logout
              </a>
              {user.type === "promoter"? <div></div>: 
              <>
              <Link to="/shoppingCart" className={styles.loginBtn}>
                <span className={styles.icon}>
                  <i className="fas fa-shopping-cart"></i>
                </span>
              </Link>
              <div className={styles.counterContainer}>
                <p className={styles.counter}>{ cart.length }</p>
              </div>
              </>
              }
            </>
          ) : (
            <Link to="/login" className={styles.loginBtn}>
              <a>Login</a>
            </Link>
          )}
        </div>
      </nav>
      {Out ? (
        <Logout setOut={setOut} setUser={setUser} redirec={redirec} />
      ) : (
        <div></div>
      )}
    </>
  );
};

//*_____________________________________________________________________
function mapStateToProps(state) {
  return {
    switchSide: state.sideBarSwitch,
    user: state.userState,
    cart: state.cartState,
  };
}

export default connect(mapStateToProps, { setUser })(NavBar);
