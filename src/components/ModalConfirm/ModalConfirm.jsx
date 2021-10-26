import React from "react";
import styles from './ModalConfirm.module.css';
import correct from '../../Utilities/successGif.gif'
import ReactDOM  from "react-dom";
import { API, changeModalConfirm } from "../../actions/actions";
import { connect } from "react-redux";
import { useHistory } from "react-router";


const ModalConfirm = ({Type, message, changeModalConfirm, detailsEvent})=>{
    console.log(detailsEvent.consult.id,'ESTEEEEEEEEEE ESSSSSSSSSSSSSSSSSSSS')
    const history = useHistory();
    const closeModal = async (response)=>{
        if(response === 'si'){
            const res = await fetch(`${API}event/delete/${detailsEvent.consult.id}`,
                {
                    method:'DELETE'
                }
            )
            await res.text();
            history.push('/perfil');
        }   
        changeModalConfirm()       
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
                <button className="regularBtn" onClick={()=>closeModal('si')}>Sí</button>
                <button className="regularBtn" onClick={()=>closeModal('no')}>No</button>
            </div>
        </div>,
        document.getElementById("modal")
    );
}

function mapStateToProps(state){
    return{
        detailsEvent:state.detailsEvent,
    }
}

export default connect(mapStateToProps, {changeModalConfirm})(ModalConfirm);