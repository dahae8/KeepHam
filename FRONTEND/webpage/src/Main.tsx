// React
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import App from "./App/App.tsx";
import SignUp, { action as signUpAction } from "@/Pages/SignUp/SignUp.tsx";
import Main from "./Pages/Main/Landing.tsx";
import ChatList from "./Components/Landing/ChatList.tsx";
import ChatRoom from "./Pages/Chatroom/ChatRoom.tsx";

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
        path: "SignUp",
        element: <SignUp />,
        action: signUpAction,
      },
      {
        path: "Login",
        element: <SignUp />,
      },
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/chatList/:boxId",
        element: <ChatList />,
      },
      {
        path: "chatRoom/:RoomId",
        element: <ChatRoom />,
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
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
