import './css/App.css';
import './css/Buttons.css';
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setUser, addShopping } from "./actions/actions";
import { Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import FormUsers from './components/FormUsers/FormUsers.jsx';
import FormPromoter from './components/FormPromoter/FormPromoter.jsx';
import EventDetailsUsario from './components/Details/EventDetailsUsario/EventDetailsUsario';
import EventsDetailsPromoter from './components/EventDetailsPromotor/EventsDetailsPromoter'
import FormEvent from './components/FormEvent/FormEvent';
import Comments from './components/Comments/CreateComment/CreateComment.jsx'
import Registration from './components/Registration/Registration';
import UserPorfile from './components/UserPorfile/UserPorfile';
import { Redirect } from 'react-router-dom';
import Modal from './components/Modal/Modal';
import LoginContainer from './components/LoginContainer/LoginContainer';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import PromotorePorfile from './components/PromotorePorfile/PromotoreProfile';
import PromoterProfileUser from './components/PromotorePorfile/PerfilPromoterUsuario'
import EditForm from './components/Details/EventDetailsUsario/EditForm';
import ShoppingCheckout from './components/ShoppingCheckout/ShoppingCheckout';
import ModalConfirm from './components/ModalConfirm/ModalConfirm';
import TicketsContainer from './components/TicketsContainer/TicketsContainer';
import TicketPdf from './components/TicketPdf/TicketPdf';


function App({ setUser, user, modal, modalForm, cart, addShopping, modalConfirm }) {

  let loginUser = JSON.parse(localStorage.getItem('User'))
  let shoppingCart = JSON.parse(localStorage.getItem('Cart'))
  useEffect(() => {
    if (loginUser) {
      setUser(loginUser)
    } else
      setUser({})
      if (shoppingCart) {
        addShopping(shoppingCart)
      } 
  }, [setUser, addShopping]) 
  useEffect(() => {
    localStorage.setItem('Cart',JSON.stringify(cart))
  }, [cart]) 

  return (
    <>

      <NavBar />

      <Route exact path='/'>
        <Home />
      </Route>

      <Route exact path='/login'>
        {user.msg? <Redirect to='/perfil'/>:  <LoginContainer />}
       
      </Route>

      <Route exact path='/registration'>
        <Registration />
      </Route>

      <Route path='/formUser' >
        <FormUsers />
      </Route>

      <Route path='/formPromoter' >
        <FormPromoter />
      </Route>

      <Route path='/eventDetailsUsuario/:id' >
        <EventDetailsUsario />
      </Route>

      <Route path='/FormEvent' >
        {user.msg ? user.type === 'user' ? <Home /> : <FormEvent promoterId={user.id} /> : <Redirect to='/login' />}
      </Route>

      <Route path='/EventsDetailsPromoter/:id' >
        <EventsDetailsPromoter />
      </Route>

      <Route path='/perfil' >
        {user.msg ? user.type === 'user' ? <UserPorfile /> : <PromotorePorfile userData={user} /> : <Redirect to='/login' />}
      </Route>


      <Route path='/nuevoComentario'>
        <Comments />
      </Route>

      {/* <Route path='/perfilPromotor'>
        <PromotorePorfile />
      </Route> */}

      <Route path='/shoppingCart'>
        <ShoppingCart />
      </Route>

      <Route path='/checkout'>
        <ShoppingCheckout />
      </Route>

       <Route path='/tickets/:id'>
        <TicketsContainer />
      </Route>

      <Route path='/ticketpdf/:id'>
        <TicketPdf />
      </Route>

      <Route path='/PromoterPorfileUser/:id'>
        <PromoterProfileUser />
      </Route>

      {/* <Route path= '/croquis/:id'>
        <Croquis/>
      </Route> */}

      <Footer />
      {modal.render ? <Modal message={modal.message} type={modal.type} /> : null}
      {modalConfirm.render && <ModalConfirm message={modalConfirm.message} type={modalConfirm.type}/>}
      {modalForm.render && <EditForm />}
    </>
  );
}

function mapStateToProps(state) {
  return {
    user: state.userState,
    modal: state.modal,
    modalForm: state.modalForm,
    modalConfirm: state.modalConfirm,
    cart: state.cartState
  };
}
export default connect(mapStateToProps, { setUser, addShopping })(App);