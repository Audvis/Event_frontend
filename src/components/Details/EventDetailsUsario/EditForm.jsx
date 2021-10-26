import React from "react";
import ReactDOM  from "react-dom";
import { editEvent } from "../../../actions/actions";
import { connect } from "react-redux";
import FormEvent from "../../FormEvent/FormEvent";
import styles from './EditForm.module.css'
const EditForm = ({modelForm,editEvent})=>{
   const closeModal = ()=>{
        // changeModal(null, null)
   }
   console.log(modelForm)
    return ReactDOM.createPortal(
        <div className={styles.cont}>
        <FormEvent />
        </div>,
        document.getElementById("modal")
    )

}

export default connect(null, {editEvent})(EditForm);