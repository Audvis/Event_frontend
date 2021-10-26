import React from 'react'

const LogResponse = ( { styles,setNotFound, icono, message, messageTwo, switchBtn, switchStyle, name, nameComponent } ) => {
    return (
        <div className={styles.formCont}>
            <h4 className={styles.title}>{ nameComponent }</h4>
                <span className={switchStyle}>
                  <i className={icono}></i>
                </span>
                <p className="txColorWht margin0">
                  { message } { name }
                </p>
                <p className="txColorWht margin0">{ messageTwo } </p>
                {switchBtn
                ?
                <button className="regularBtn" onClick={setNotFound}> {/* ¿¡QUÉ #/&$%&?!^* ES ESTOO !? */}
                ok
              </button>
              :
              <div></div>
            }
        </div>
    )
}

export default LogResponse;
