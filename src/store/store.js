import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/reducers";
import thunk from "redux-thunk";

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
       typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?  window.__REDUX_DEVTOOLS_EXTENSION__(): f => f
      )
    );
export default store;
