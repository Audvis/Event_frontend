import React, { useState } from 'react';
import styles from './LoginContainer.module.css';
import LoginPromoter from '../LoginPromoter/LoginPromoter';
import LoginUser from '../LoginUser/LoginUser';

const LoginContainer = () => {
    const [Switch, setSwitch] = useState(true)

    //functions
    const setUser = () => {
        setSwitch(true)
    }
    const setPromoter = () => {
        setSwitch(false)
    }
    return (
        <div className={ styles.container }>
            <div> { /* VER qué hago con el estilo de estos botones... */ }
            <button onClick={ setUser } className={styles.btnUser}>Soy Usuario</button>
            <button onClick={ setPromoter } className={styles.btnPromoter}>Soy Promotor</button>
            </div>
            
            {Switch
            ?
            <LoginUser
            nameComponent='Inicia sesión'
                nameComponentOne='Ingresando usuario'
                nameComponentTwo='Usuario no encontrado'
                messageFalse='El usuario no se encuentra registrado'
                messageTwoFalse='o el password no es correcto'
            />
            :
            <LoginPromoter
            nameComponent='Inicia sesión'
                nameComponentOne='Ingresando Promotor'
                nameComponentTwo='promotor no encontrado'
                messageFalse='El promotor no se encuentra registrado'
                messageTwoFalse='o el password no es correcto'
            />
        }
        </div>
    )
}

export default LoginContainer
