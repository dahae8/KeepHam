// React
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import App from "./App/App.tsx";
import SignUp, { action as signUpAction } from "./Components/SignUp/signUp.tsx";

// Styles
import "./Styles/global.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "SignUp",
        element: <SignUp />,
        action: signUpAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
