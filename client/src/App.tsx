import React from "react";
import AppRouter from "./AppRouter";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
