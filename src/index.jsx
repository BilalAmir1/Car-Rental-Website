import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { MantineProvider, createTheme } from '@mantine/core';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const client = process.env.REACT_APP_AUTH0_CLIENT_ID;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
    
      <React.StrictMode>
            <Auth0Provider 
            domain="dev-ol47weqwemc0rbzx.us.auth0.com"
            clientId="7EbUTq88v4o9BSnKWE4Z2NOSbvpo1NMt"
            authorizationParams={{
                  redirect_uri: "http://localhost:5173/"
            }}
            audience="http://localhost:8000"
            scope="openid profile email"
            >
            <MantineProvider>
            <App />
            </MantineProvider>
            </Auth0Provider>
      </React.StrictMode>
      
    
);
