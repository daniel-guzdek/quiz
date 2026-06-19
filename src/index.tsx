import * as ReactDOMClient from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";

const root = ReactDOMClient.createRoot(
  document.getElementById("root") as HTMLDivElement,
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
