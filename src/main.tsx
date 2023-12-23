import React from "react";
import ReactDOM from "react-dom/client";
import { Provider, getDefaultStore } from "jotai";
import { App } from "./App";
import { generateDefaultTemplates } from "./libs/templates/utils";
import { memo } from "./state/atoms/memo";

const initialStore = getDefaultStore();
initialStore.set(memo, generateDefaultTemplates());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={initialStore}>
      <App />
    </Provider>
  </React.StrictMode>
);