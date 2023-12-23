import React from "react";
import ReactDOM from "react-dom/client";
import { Provider, getDefaultStore } from "jotai";
import { App } from "./App";

const initialStore = getDefaultStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={initialStore}>
      <App />
    </Provider>
  </React.StrictMode>
);