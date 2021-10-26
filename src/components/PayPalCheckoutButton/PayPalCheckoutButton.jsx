
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import paypal from "paypal-checkout";
import { API, resetShopping, updateInfoLimit,changeModal  } from "../../actions/actions";
import axios from "axios";
const PayPalCheckoutButton = ({ order, resetShopping, tickets, user,UpdateDataLimit}) => {
  // const API = 'https://event-henryapp-backend.herokuapp.com/api/ticket/create'

  const history = useHistory();
  const dispatch = useDispatch();
  const redirec = (dir) => {
    history.push(dir);
  };
  const [croquis,setCroquis] = useState([])//leo
  const [sector,setSector] = useState([])//leo

  useEffect(()=>{//leo
    setCroquis(UpdateDataLimit.filter(d=>d.type==='croquis'))
  },[])

  //*funcion ticket post
  const fetchPostTicket = async (e) => {
      try {
        let config = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(e),
        };
        let res = await fetch('https://event-henryapp-backend.herokuapp.com/api/ticket/create', config);
        let json = await res.json();
        console.log(json);
      } catch (err) {}
  };


  const paypalConf = {
    currency: "MXN",
    env: "sandbox",
    client: {
      sandbox:
        "ARgkUwNOsDQhVAfoPMo5E0ipCVLaJYDam3xZapytQ_eziCJrOuEDTCxPXQbfE0voPJGS8Q2_FqxEjLfU",
      production: "--id--",
    },
    style: {
      label: "pay",
      size: "medium",
      shape: "rect",
      color: "gold",
    },
  };

  const PaypalButton = paypal.Button.driver("react", { React, ReactDOM });

  const payment = (data, actions) => {
    const payment = {
      transactions: [
        {
          amount: {
            total: order.total,
            currency: paypalConf.currency,
          },
          description: "Compra en Event",
          custom: order.customer || "",
          item_list: {
            items: order.items,
          },
        },
      ],
      note_to_payer: 'Contactanos para cualquier aclaración'
    };
    return actions.payment.create({ payment });
  };

  const upDate = async()=>{//leo
    const resCroquis = []
    console.log(croquis)
    for(let i = 0; croquis.length>i; i++){
      resCroquis.push(axios.put(`https://event-henryapp-backend.herokuapp.com/api/event/editlimit`,croquis[i]))
    }  
    const responseCroquis = await Promise.all(resCroquis)
    console.log(responseCroquis)
    updateInfoLimit()
  }

  const onAuthorize = ( data, actions) => {
      return actions.payment.execute()
      .then(response => {
          console.log(response)

          upDate()//leo

          dispatch(changeModal('correct', `El pago se realizó correctamente. \n ID: ${response.id}`));
         

          tickets.map( async ticket => {
            await fetchPostTicket(ticket)
          })
           resetShopping()

           setTimeout(function () {
            redirec(`/tickets/${user.id}`);
        }, 1000);
            


      })

      .catch(error => {
        console.log('ERROR EN AUTORIZACIÓN DE PAGO: ', error);
        dispatch(changeModal('incorrect', 'Ocurrió un error.'))
    }) 
  }
  const onError = (error) => {
    console.log(error)
    dispatch(changeModal('incorrect', 'No se pudo realizar el pago.'))
  };
  const onCancel = (data, actions) => {
    dispatch(changeModal('warning', 'Pago cancelado.'))
  };
  return (
      <PaypalButton
        env={paypalConf.env}
        client={paypalConf.client}
        payment={(data, actions) => payment(data, actions)}
        onAuthorize={(data, actions) => onAuthorize(data, actions)}
        onCancel={(data, actions) => onCancel(data, actions)}
        onError={(data, actions) => onError(data, actions)}
        style={paypalConf.style}
        commit
        locale='es_MX'
      />
  )
};



function mapStateToProps(state) {
  return {
    tickets: state.ticketItems,
    user: state.userState,
    UpdateDataLimit:state.UpdateDataLimit
  };
}


export default connect(mapStateToProps, { resetShopping,updateInfoLimit })(PayPalCheckoutButton);

