import React from "react";
import ReactDOM from "react-dom/client";
import { Provider, getDefaultStore } from "jotai";
import { App } from "./App";
import { wrapperGetMemo } from "./libs/templates/utils";
import { MemoState, memo } from "./state/atoms/memo";

const initialStore = getDefaultStore();
(async() => {
  const storagedState = await wrapperGetMemo() as MemoState[];
  initialStore.set(memo, storagedState);
})();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={initialStore}>
      <App />
    </Provider>
  </React.StrictMode>
);