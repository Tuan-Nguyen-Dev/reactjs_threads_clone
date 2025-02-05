import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./stores/store.ts";
import SocialLogin from "./components/SocialLogin/SocialLogin.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SocialLogin>
          <App />
        </SocialLogin>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
