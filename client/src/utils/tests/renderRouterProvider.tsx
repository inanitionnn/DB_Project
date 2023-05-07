import { render } from "@testing-library/react";
import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { appStore } from "../../redux/store";

export const renderRouterProvider = (
  component: ReactElement,
  initialRoute = "/"
) => {
  return render(
    <Provider store={appStore}>
      <MemoryRouter initialEntries={[initialRoute]}>{component}</MemoryRouter>
    </Provider>
  );
};
