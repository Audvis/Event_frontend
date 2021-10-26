import React, { useState } from 'react';
import FormPromoter from "../FormPromoter/FormPromoter.jsx";
import FormUsers from "../FormUsers/FormUsers";
import styles from './Registration.module.css'
import styles2 from '../LoginContainer/LoginContainer.module.css';

const Registration = () => {
const [Switch, setSwitch] = useState('user')

const switchBtn = () => {
    if(Switch === 'user'){
        setSwitch('promoter')
    }else setSwitch('user')

}

    return (
        <div className={styles.mainContainer}>
            <h2 className={styles.title}>Regístrate</h2>
            <div className={styles.container}>
                <button className={styles2.btnUser} onClick={switchBtn}>Soy Usuario</button>
                <button className={styles2.btnPromoter} onClick={switchBtn}>Soy Promotor</button>
            </div>
            
            {Switch === 'user'
            ?
            <FormUsers />
            :
            <div className={styles.formPromoter}>
                <FormPromoter />    
            </div>
          }
        </div>
    )
}

export default Registration
