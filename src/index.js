import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./services/store";
import App from "./components/App/App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  rootElement
);
