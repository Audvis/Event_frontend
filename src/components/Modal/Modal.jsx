import React from "react";
import styles from './Modal.module.css';
import correct from '../../Utilities/successGif.gif'
import ReactDOM  from "react-dom";
import { changeModal } from "../../actions/actions";
import { connect } from "react-redux";


const Modal = ({Type, message, changeModal})=>{
   const closeModal = ()=>{
        changeModal(null, null)
   }
    return ReactDOM.createPortal(
        <div className={styles.cont}>
            <div className={styles.modalCont}>
                <div className={styles.img}>
                    <img src={correct} alt="" />
                </div>
                <div className={styles.text}>
                    <p>
                        {message}
                    </p>
                </div>
                <button className="regularBtn" onClick={closeModal}>OK</button>
            </div>
        </div>,
        document.getElementById("modal")
    )

}

export default connect(null, {changeModal})(Modal);