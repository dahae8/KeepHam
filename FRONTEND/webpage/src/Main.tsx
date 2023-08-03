// React
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/Store/store.ts";

// Pages
import App from "./App/App.tsx";
import Landing from "@/Pages/Landing/Landing.tsx";
import ChatList from "@/Components/Landing/ChatList.tsx";
import Auth from "./Pages/Auth/Auth.tsx";
import RoomList, {
  loader as roomListLoader,
} from "./Pages/RoomList/RoomList.tsx";
import CreateRoom from "./Pages/CreateRoom/CreateRoom.tsx";

// Styles
import "./Styles/global.ts";
import { createTheme, ThemeProvider } from "@mui/material";

// React Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/App",
    element: <App />,
    children: [
      
      {
        path: "/App/chatList/:boxId",
        element: <ChatList />,
      },
      {
        path: "/App/RoomList/:boxId",
        element: <RoomList />,
        loader: roomListLoader,
      },
      {
        path: "/App/CreateRoom",
        element: <CreateRoom />,
      },
    ],
  },
  {
    path: "Auth",
    element: <Auth />,
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
