import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <Auth0Provider
domain='dev-mf6lqfng.us.auth0.com'
clientId='5c1HQIOd6HlVEi2CLLfTPO7HCImJ9qZr'
redirectUri={window.location.origin}>
<App />
</Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);
