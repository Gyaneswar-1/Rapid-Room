import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="771696950246-itjtbq8fij55t1j9bc4bg9m5na1dj3nd.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </Provider>
  // </StrictMode>
);
