// React
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/Store/store.ts";

// Pages
import App from "./App/App.tsx";
import SignUp, { action as signUpAction } from "@/Components/User/SignUp.tsx";
import LogIn, { action as logInAction } from "@/Components/User/LogIn.tsx";
import Main from "@/Pages/Main/Main.tsx";
import ChatList from "@/Components/Main/ChatList.tsx";
import User from "./Pages/User/User.tsx";
import RoomList, {loader as roomListLoader} from "./Pages/RoomList/RoomList.tsx";


// Styles
import "./Styles/global.ts";
import { createTheme, ThemeProvider } from "@mui/material";

// React Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/chatList/:boxId",
        element: <ChatList />,
      },
      {
        path: "/RoomList/:boxId",
        element: <RoomList />,
        loader: roomListLoader,
      }
    ],
  },
  {
    path: "User",
    element: <User />,
    children: [
      {
        path: "LogIn",
        element: <LogIn />,
        action: logInAction,
      },
      {
        path: "SignUp",
        element: <SignUp />,
        action: signUpAction,
      },
    ],
  },
]);

// Mui Theme
declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const theme = createTheme({
  typography: {
    fontFamily: "Pretendard",
    htmlFontSize: 10,
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
