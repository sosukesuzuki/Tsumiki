import { createStore, applyMiddleware } from "redux";
import createSagaMiddleWare from "redux-saga";
import reducer from "./reducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleWare();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
