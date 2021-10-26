import React, { useState } from "react";
import { connect } from "react-redux";
import { setUser } from "../../actions/actions";
import { Link } from "react-router-dom";
import styles from "./LoginUser.module.css";
import { useHistory } from "react-router-dom";
import LogResponse from "../LogResponse/LogResponse.jsx";
import LogInputs from "../LogInputs/LogInputs.jsx";
import { GoogleLogin } from "react-google-login";
// import FacebookLogin from 'react-facebook-login';
 import loading from "../../Utilities/ajax-loader.gif";

const Login = ({ setUser, user, nameComponent, nameComponentOne, nameComponentTwo, messageFalse, messageTwoFalse }) => {
  const API = 'https://event-henryapp-backend.herokuapp.com/api/'
  const history = useHistory();

  //*Estados______________________________________________________________________
  const [FormState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  // const [MessageNick, setMessageNick] = useState('Escribe tu Alias')
  const [MessageMail, setMessageMail] = useState(" ");
  const [SwitchMail, setSwitchMail] = useState(null);
  const [MessagePass, setMessagePass] = useState(" ");
  const [SwitchPass, setSwitchPass] = useState(null);
  const [Message, setMessage] = useState("");
  const [Logger, setLogger] = useState("true");
  const [Button, setButton] = useState(false);
  const [Loading, setLoading] = useState(false)
 
  //*Funciones__________________________________________________________________
  const redirec = (dir) => {
    history.push(dir);
  };

  //*Google
  const responseGoogle = async (resG) => {
    let obj = { 
      type:'google',
      email: resG.profileObj.email ,
      password: false
    };
    setLoading(true)
    try {
      let config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      };
      let res = await fetch("https://event-henryapp-backend.herokuapp.com/api/user/login", config);
      let json = await res.json();
      let user = {
        msg:json.msg,
        id: json.id,
        fullName: json.fullName,
        username: resG.profileObj.givenName,
        picture: resG.profileObj.imageUrl,
        type: json.type
      }
      setButton(true);
      setLoading(false)
      if (!json.msg) {
        setLogger(false);
      } else {
        
        setLogger(true);
        setUser(user);
        // setTimeout(function () {
        //   redirec("/");
        // }, 2000);
      }
    } catch (err) {
      console.log("error__________________", err);
    }
  };

  //*Facebook
  // const responseFacebook = (resF) => {
  //   console.log(resF);
  //   console.log("userf---------------", resF.name);
  // }

  //*Expresiones
  const emailValidate =
    /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  const passValidate =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
  // Minimo 8 caracteres
  // Maximo 15
  // Al menos una letra mayúscula
  // Al menos una letra minucula
  // Al menos un dígito
  // No espacios en blanco
  // Al menos 1 caracter especial

  //*Funciones onChange
  const upgradeEmail = (e) => {
    if (e.target.value === "") {
      setMessageMail("x");
      setSwitchMail(false);
    } else {
      setMessageMail(" ");
    }
    if (e.target.value.match(emailValidate)) {
      setMessageMail("*");
      setSwitchMail(true);
    }
    setFormState({ ...FormState, [e.target.name]: e.target.value });
  };
  const upgradePass = (e) => {
    if (e.target.value === "") {
      setMessagePass("x");
      setSwitchPass(false);
    } else {
      setMessagePass(" ");
    }
    if (e.target.value.match(passValidate)) {
      setMessagePass("*");
      setSwitchPass(true);
    }
    setFormState({ ...FormState, [e.target.name]: e.target.value });
  };

  //*Funcion on click
  const setNotFound = () => {
    setButton(false);
  };

  //*Funcion on submit
  const setLog = async (e) => {
    let obj = { 
      type:'email',
      email: FormState.email ,
      password: FormState.password
    };
    e.preventDefault();
    if (!FormState.email || !FormState.password) {
      setMessage("Todos los campos son obligatorios");
      setTimeout(function () {
        setMessage("");
      }, 2000);
    return;
     } 
    setLoading(true)
    try {
      let config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      };
      let res = await fetch("https://event-henryapp-backend.herokuapp.com/api/user/login", config);
      let json = await res.json();
   
      let user = {
        msg: json.msg,
        id: json.id,
        fullName: json.fullName,
        username: json.username,
        picture: json.picture,
        type: json.type
      }
     
      setButton(true);
      setLoading(false)
      if (json.msg === false) {
        setLogger(false);
      } else {
        setLogger(true);
        setUser(json);
        // setTimeout(function () {
        //   redirec("/");
        // }, 2000);
      }
    } catch (err) {
      console.log("error__________________", err);
    }
  };

  return (
    <div >
      <h5 className={styles.message}> {Message}</h5>

      <form className={styles.form} onSubmit={setLog}> 
      <div className={styles.decoration}><h3>Usuario</h3></div>
        {
         Loading
         ?
         <>
          <h4 className={styles.title}>Loading...</h4>
          <img src={ loading } alt="" />  
          </> 
          :
        !Button ? (
          //*_______________________________________________________________________________________________________
            <LogInputs
              nameComponent={nameComponent}
              styles={styles}
              FormState={FormState}
              upgradeEmail={upgradeEmail}
              upgradePass={upgradePass}
              SwitchMail={SwitchMail}
              SwitchPass={SwitchPass}
              MessageMail={MessageMail}
              MessagePass={MessagePass}
              responseGoogle={responseGoogle}
              GoogleLogin={ GoogleLogin }
              Link={ Link }
            />
        ) : (
          //*_______________________________________________________
          <>
            {Logger ? (
              <LogResponse
              nameComponent={nameComponentOne}
                styles={styles}
                setNotFound={setNotFound}
                icono="fas fa-check-circle"
                message="Bienvenido"
                messageTwo="estas ingresado a Event"
                switchBtn={false}
                switchStyle={styles.iconTrue}
                name={user.username}
              />
            ) : (
              <LogResponse
              nameComponent={nameComponentTwo}
                styles={styles}
                setNotFound={setNotFound}
                icono="fas fa-exclamation-circle"
                message={ messageFalse}
                messageTwo={ messageTwoFalse}
                switchBtn={true}
                switchStyle={styles.iconFalse}
              />
            )}
          </>
          //*_________________________________________________________________
        )
        }
        
      </form>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.userState,
  };
}
export default connect(mapStateToProps, { setUser })(Login);

