import React from "react";
import ReactDOM from "react-dom";
// import { Provider } from 'react-redux';
// import { combineReducers, createStore } from 'redux';
import { BrowserRouter } from "react-router-dom";
import ProductProvider from "./context/product-context";

import "./index.css";
import App from "./App";
// import productReducer from './store/reducers/products';

// const rootReducer = combineReducers({
//   shop: productReducer
// });

// const store = createStore(rootReducer);

ReactDOM.render(
  // <Provider store={store}>
  <ProductProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ProductProvider>,
  // </Provider>,
  document.getElementById("root")
);
