import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { appStore } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";

function App() {
  return (
    <Provider store={appStore}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      {/* </PersistGate> */}
    </Provider>
  );
}

export default App;
