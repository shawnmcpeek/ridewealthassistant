import React from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App";
import { auth } from "./utils/firebase/firebase.utils"; // Import Firebase Authentication
import reportWebVitals from "./reportWebVitals";

// Check authentication state when the app loads
const checkAuthState = () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, you can proceed with rendering the app
      renderApp();
    } else {
      renderApp();// No user is signed in, handle accordingly (e.g., redirect to sign-in page)
      console.log("No user is signed in");
    }
  });
};

// Render the app when the user is signed in
const renderApp = () => {
  const root = createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Check authentication state and render the app
checkAuthState();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
