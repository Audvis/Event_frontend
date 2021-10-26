import {
    GET_DETAIL, 
   SWITCH_SIDE_BAR,
   POST_EVENT,
   SET_USER,
   SET_PROMOTER,
   GET_EVENTS_HOME,
   FILTER_TAGS,
   FILTER_AGE_RATING,
   FILTER_WEEKDAYS,
   FILTER_COUNTRY,
   FILTER_PROVINCE,
   ORDER_PRICE_ASC,
   ORDER_PRICE_DESC,
   ADD_TYPES,
   REMOVE_TYPES,
   REMOVE_FILTERS,
   CHANGE_MODAL,
   SEARCH_NAME,
 REMOVE_NAME,
   GET_EVENTS,
   GET_EVENTS_PROMOTER,
   EDIT_EVENT,
   PROMOTER_USER,
   ADD_SHOPPING,
  DELETE_SHOPPING,
  ADD_CHECKOUT,
  DELETE_CHECKOUT,
  SET_TOTAL_CHECKOUT,
  RESET_SHOPPING,
  ADD_TICKET,
  DELETE_TICKET,
  TIKETS_SECTIONS,
  CHANGE_MODAL_CONFIRM,
  GET_TICKETS,
  UPDATE_EVENT_LIMIT,
  } from "../actions/actions";

  // Pruebas para guardar usuario en el local storage
  // let loginUser = JSON.parse(localStorage.getItem( user )) 
  const initialState = {
    eventsHome: [],
    //*detalles de evento
    detailsEvent:{},
    //*switch de nav-bar
    sideBarSwitch: false,
    //*post //Abi
    posts:[],
    //*user
    userState:{},
    //*promoter
    promoterState:{},
    promoterEvents:[],
   //modal
    modal:{
      render:false,
      type:null,
      message:null,
    },
    //modal confirm
    modalConfirm:{
      render:false,
      type:null,
      message:null,
      response:null,
    },
    //modL FORM 
    modalForm:{
      render:false,
      data:{},
    },
    //*filter //Abi
    filters:[],
    home:[],
  typesFilters:[],
    //promoter user 
    promoterUser:[],
   //*shopping cart
    cartState:[],
    checkoutItems:[],
    checkoutTotal:0,
    ticketItems: [],

    // grafica 
    grafica:[],
    ticketsSections:[],
    UpdateDataLimit:[],
  };



function rootReducer(state = initialState, action) {
  //*__GET_DE_EVENTOS_EN_HOME
  if(action.type=== GET_EVENTS_HOME){
    return{
      ...state,
      eventsHome: action.payload,
    } 
  }
  // Abi
  if(action.type === GET_EVENTS){
    return{
      ...state,
      home:action.payload
    }
  }
  //*__DETALLES_DE_EVENTOS
  if(action.type=== GET_DETAIL){
    return{
      ...state,
      detailsEvent: action.payload,
    } 
  }
  //*__SWITCH_NAV_BAR
  if(action.type=== SWITCH_SIDE_BAR){
    return{
      ...state,
      sideBarSwitch: action.payload
    }
  }
  //*__POST //Abi
  if(action.type=== POST_EVENT){
    return{
      ...state,
      posts: action.payload
    }
  }
  //*_USER_______
  if(action.type=== SET_USER){
    return{
      ...state,
      userState: action.payload
    }
  }
  //*_PRMOTER_______
  if(action.type=== SET_PROMOTER){
    return{
      ...state,
      promoterState: action.payload
    }
  }
  if(action.type=== GET_EVENTS_PROMOTER){
    return{
      ...state,
      promoterEvents: action.payload
    }
  }
  //*__FILTER  //Abi
  if(action.type === FILTER_TAGS){
    return{
      ...state,
      eventsHome: action.payload
    }
  }
  if(action.type === FILTER_AGE_RATING){
    return{
      ...state,
      eventsHome: action.payload
    }
  }
  if(action.type === FILTER_WEEKDAYS){
    return{
      ...state,
      eventsHome: action.payload
    }
  }
  if(action.type === FILTER_COUNTRY){
    return{
      ...state,
      eventsHome: action.payload
    }
  }
  if(action.type === FILTER_PROVINCE){
    return{
      ...state,
      eventsHome: action.payload
    }
  }
  if(action.type === ORDER_PRICE_ASC){
    return{
      ...state,
      eventsHome: action.payload
    }
  }
  if(action.type === ORDER_PRICE_DESC){
    return{
      ...state,
      eventsHome: action.payload
    }
  }
  if(action.type === ADD_TYPES){
    return{
      ...state,
      typesFilters: action.payload
    }
  }
  if(action.type === REMOVE_TYPES){
    return{
      ...state,
      typesFilters:[]
    }
  }
  if(action.type === REMOVE_FILTERS){
    return{
      ...state,
      eventsHome:state.home
    }
  }
  if(action.type === CHANGE_MODAL){    
    return{
      ...state,
      modal:{
        ...state.modal,
        render:!state.modal.render,
        message: action.payload.message,
        type: action.payload.type
      }
    }
  }
  if(action.type === CHANGE_MODAL_CONFIRM){    
    return{
      ...state,
      modalConfirm:{
        ...state.modalConfirm,
        render:!state.modalConfirm.render,
        message: action.payload.message,
        type: action.payload.type,
        response: action.payload.response,
      }
    }
  }
  if(action.type === EDIT_EVENT){    
    console.log('en el reducer',action.payload)
    return{
      ...state,
      modalForm:{
        ...state.modalForm,
        render:!state.modalForm.render,
        data: action.payload,
      }
    }
  }
  if(action.type === SEARCH_NAME){
    return{
      ...state,
      filters: action.payload
    }
  }
  if(action.type === REMOVE_NAME){
    return{
      ...state,
      filters: []

    }
  }
  if(action.type === TIKETS_SECTIONS){
    return{
      ...state,
      ticketsSections:[...state.ticketsSections,action.payload],
    }
  }

  if(action.type === GET_TICKETS){
    return{
      ...state,
      grafica: action.payload
    }
  }
   
  if(action.type=== PROMOTER_USER){
    return {
      ...state,
      promoterUser: action.payload
    }
    }
 //*__SHOPPING_CART
 if(action.type === ADD_SHOPPING){
  return{
    ...state,
    cartState: state.cartState.concat(action.payload) 
  }
}
if(action.type === DELETE_SHOPPING){
  return{
    ...state,
    cartState: state.cartState.filter(e => e.id !== action.payload) 
  }
}
if(action.type === ADD_CHECKOUT){
  const event =  state.checkoutItems.filter(e => e.sku !== action.payload.sku) 

  return{
    ...state,
    checkoutItems: event.concat(action.payload) 
  }
}
if(action.type === DELETE_CHECKOUT){
  return{
    ...state,
    checkoutItems: state.checkoutItems.filter(e => e.sku !== action.payload) 
  }
}
if(action.type === SET_TOTAL_CHECKOUT){
  return{
    ...state,
    checkoutTotal: action.payload
  }
}
if(action.type === RESET_SHOPPING){
  return{
    ...state,
    cartState: [],
    checkoutItems: [],
    checkoutTotal: [],
    ticketItems: []
  }
}
if(action.type === ADD_TICKET){
  const ticket =  state.ticketItems.filter(e => e.idEvent !== action.payload.idEvent)
  return{
    ...state,
    ticketItems: ticket.concat(action.payload) 
  }
}
if(action.type === DELETE_TICKET){
  return{
    ...state,
    ticketItems: state.ticketItems.filter(e => e.idEvent !== action.payload) 
  }
}
if(action.type === UPDATE_EVENT_LIMIT){
  if(!action.payload){
    return{
      ...state,
      UpdateDataLimit:[]
    }
  }else{
    return{
      ...state,
      UpdateDataLimit:[...state.UpdateDataLimit,action.payload]

    }
  }
}
   return state;
}
export default rootReducer;