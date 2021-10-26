import axios from 'axios'
//*detalles de evento
export const GET_DETAIL = "GET_DETAIL"
//*detalle switch
export const SWITCH_SIDE_BAR = 'SWITCH_SIDE_BAR';
//*event
export const POST_EVENT = 'POST_EVENT'; //Abi
//*user
export const SET_USER = 'SET_USER'
//*promoter
export const SET_PROMOTER = 'SET_PROMOTER'
export const GET_EVENTS_PROMOTER = 'GET_EVENTS_PROMOTER'
export const EDIT_EVENT = 'EDIT_EVENT'
//*activities home
export const GET_EVENTS_HOME = 'GET_EVENTS_HOME';
export const GET_EVENTS = 'GET_EVENTS'; //Abi
//filter

export const FILTER_TAGS = 'FILTER_TAGS';
export const FILTER_AGE_RATING = 'FILTER_AGE_RATING';
export const FILTER_WEEKDAYS = 'FILTER_WEEKDAYS';
export const FILTER_COUNTRY = 'FILTER_COUNTRY';
export const FILTER_PROVINCE = 'FILTER_PROVINCE';
export const ORDER_PRICE_ASC = 'ORDER_PRICE_ASC';
export const ORDER_PRICE_DESC = 'ORDER_PRICE_DESC';
export const REMOVE_FILTERS = 'REMOVE_FILTERS';
export const CHANGE_MODAL = 'CHANGE_MODAL';//leo
export const CHANGE_MODAL_CONFIRM = 'CHANGE_MODAL_CONFIRM';//leo
export const SEARCH_NAME = 'SEARCH_NAME'; //Abi

export const REMOVE_NAME = 'REMOVE_NAME'; //Abi
export const PROMOTER_USER =' PROMOTER_USER'//daf
export const ADD_TYPES = 'ADD_TYPES'; //Abi
export const REMOVE_TYPES = 'REMOVE_TYPES'; //Abi


//*shopping Cart
export const ADD_SHOPPING = 'ADD_SHOPPING';
export const DELETE_SHOPPING = 'DELETE_SHOPPING';
export const ADD_CHECKOUT = 'ADD_CHECKOUT';
export const DELETE_CHECKOUT = 'DELETE_CHECKOUT';
export const SET_TOTAL_CHECKOUT = 'SET_TOTAL_CHECKOUT';
export const RESET_SHOPPING = 'RESET_SHOPPING';
export const ADD_TICKET = 'ADD_TICKET';
export const DELETE_TICKET = 'DELETE_TICKET';
export const TIKETS_SECTIONS = 'TIKETS_SECTIONS'
// Follow
export const PUT_FOLLOW = 'PUT_FOLLOW';

// grafica 
export const  GET_TICKETS = 'GET_TICKETS'
//actualizar
export const UPDATE_EVENT_LIMIT='UPDATE_EVENT_LIMIT'

 

//export const API = 'http://localhost:3001/api/'
export const API = 'https://event-henryapp-backend.herokuapp.com/api/'



//*_get_activities_home______________________________________________
export function getEventsHome() {
  return function (dispatch) {
    try {
      fetch(`${API}main`)
        .then(response => response.json())
        .then(json => {
          dispatch({ type: GET_EVENTS_HOME, payload: json });
        });
    } catch (error) {
      console.log(error)
    }
  };
}
// GET_EVENTs Abi
export function getEvents() {
  return function (dispatch) {
    axios.get(`${API}main`)
      .then((res) => {
        dispatch({
          type: GET_EVENTS,
          payload: res.data
        })
      })
  }
}

//*_detalle dafne_____________________________________________________ 
export function getEventDetail(id) {
  return async function (dispatch) {
    const response = await
      axios.get(`${API}event/${id}`);
    console.log(response)
    if (response.data.consult.sectorize !== 'no sectorizar') {
      response.data.consult.sections = JSON.parse(response.data.consult.sections)
    }
    // console.log('paseee')
    dispatch({
      type: GET_DETAIL,
      payload: response.data
    })
  }
}

//*__SWITCH_DE_NAVBAR____________________________________________________

export function setSideBar(boolean) {
  return {
    type: SWITCH_SIDE_BAR,
    payload: boolean
  }
}

//*___USER_________________________________________________________________
export function setUser(user) {
  localStorage.setItem('User', JSON.stringify(user))
  return {
    type: SET_USER,
    payload: user
  }
}
//*___PROMOTER_________________________________________________________________
export function setPromoter(promoter) {
  localStorage.setItem('User', JSON.stringify(promoter))
  return {
    type: SET_PROMOTER,
    payload: promoter
  }
}
// get eventos por promotor-------------------------------------------
export function getEventPromoter(id) {
  console.log(id, 'SOY ID')
  return async function (dispatch) {
    const response = await axios(`${API}${'promoter/'}${id}`);
    return dispatch({
      type: GET_EVENTS_PROMOTER,
      payload: response.data.eventPromotor.events,
    });
  }
}

//* POST_EVENT
export function postEvent(event) {
  console.log(event, 'event ACTIONS')
  return function (dispatch) {
    axios.post(`${API}event`, event)
      .then((res) => {
        dispatch({
          type: POST_EVENT,
          payload: res.data
        })
      })
  }
}

// * FILTER
export function filterTags(type) {
  console.log(type, 'action')
  return {
    type: FILTER_TAGS,
    payload: type
  }
}
export function filterAgeRating(type) {
  console.log(type, 'action rating')
  return {
    type: FILTER_AGE_RATING,
    payload: type
  }
}
export function filterWeekdays(type) {
  console.log(type, 'action weekdays')
  return {
    type: FILTER_WEEKDAYS,
    payload: type
  }
}
export function filterCountry(type) {
  console.log(type, 'action Country')
  if (type === 'México') {
    type = 'Mexico'
  }
  console.log(type, '¿')
  return {
    type: FILTER_COUNTRY,
    payload: type
  }
}
export function filterProvince(type) {
  console.log(type, 'action province')
  return {
    type: FILTER_PROVINCE,
    payload: type
  }
}
export function orderAscPrice(type) {
  console.log(type, 'action priceASC')
  return {
    type: ORDER_PRICE_ASC,
    payload: type
  }
}
export function orderDescPrice(type) {
  console.log(type, 'action priceDESC')
  return {
    type: ORDER_PRICE_DESC,
    payload: type
  }
}

export function addTypes(types){
  // console.log('ACTION!TYPES: ',types)
  return{
    type:ADD_TYPES,
    payload:types
  }
}
export function removeTypes(){
  return{
    type:REMOVE_TYPES
  }
}
export function removeFilters(){
  return{

    type: REMOVE_FILTERS
  }
}

// Modal
export function changeModal(type, message) {
  return {
    type: CHANGE_MODAL, payload: { type, message }
  }
}
//Modal Delete
export function changeModalConfirm(type, message, response) {
  console.log('action linea 206', type, message, response)
  return {
    type: CHANGE_MODAL_CONFIRM, payload: { type, message, response }
  }
}
//modal formulario edicion
export function editEvent(eventDatails) {
  console.log('entreeeeeeeeeeee al action', eventDatails)
  return {
    type: EDIT_EVENT, payload: eventDatails
  }
}
// * Search
export function searchName(name) {
  console.log(name, 'action name')
  return {
    type: SEARCH_NAME,
    payload: name
  }
}
export function clearSearch(){
  return{
    type:REMOVE_NAME
  }
}
//daf
export function getPromoterUser(id) {
  return async function (dispatch) {
    const response = await
      axios.get(`${API}${'promoter/'}${id}`)
    dispatch({
      type: PROMOTER_USER,
      payload: response.data
    })
  }

}
//*Shopping Cart
export function addShopping(event) {
  return {
    type: ADD_SHOPPING,
    payload: event
  }
}

export function addTicket(event) {//Prueba Lucio
  return {
    type: ADD_TICKET,
    payload: event
  }
}
export function deleteTicket(event) { //TAMBIÉN Lucio
  return {
    type: DELETE_TICKET,
    payload: event
  }
}
export function deleteShopping(idEvent) {
  return {
    type: DELETE_SHOPPING,
    payload: idEvent
  }
}
export function addCheckout(Event) {
  return {
    type: ADD_CHECKOUT,
    payload: Event
  }
}
export function deleteCheckout(idEvent) {
  return {
    type: DELETE_CHECKOUT,
    payload: idEvent
  }
}
export function setTotalCheckout(total) {
  return {
    type: SET_TOTAL_CHECKOUT,
    payload: total
  }
}
export function resetShopping() {
  return {
    type: RESET_SHOPPING
  }
}
export function tiketsSections(info) {
  return {
    type: TIKETS_SECTIONS, payload: info
  }
}

export function getTickets(id){
  return async function (dispatch){
    const response = await axios.get(`${API}${'ticket/promoter/'}${id} `)
    dispatch({
      type:GET_TICKETS,
      payload: response.data
    })
  }
}

export function updateInfoLimit(data){
  return {
    type:UPDATE_EVENT_LIMIT,
    payload:data,
  }
}




// (Lucio) Seguir (PUT Follow)
// export function putFollow(follow){
//   console.log('Acá va el follow: ', follow)
//   return async function(dispatch){
//     const response = await axios.put(`${API}follow`, follow)
//     console.log("ahí va el post_follow: ", response.data)
//       dispatch({
//         type: PUT_FOLLOW,
//         payload: response.data
//       })
//     }
// }
