// React
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/Store/store.ts";

// Pages
import App from "@/App/App.tsx";
import Landing from "@/Pages/Landing/Landing.tsx";
import ChatList from "@/Components/Landing/ChatList.tsx";
import Auth from "@/Pages/Auth/Auth.tsx";
import UserInfo from "@/Pages/UserInfo/UserInfo.tsx";
// import Main from "@/Pages/Main/Landing.tsx";
// import User from "./Pages/User/User.tsx";
import RoomList, {
  loader as roomListLoader,
} from "./Pages/RoomList/RoomList.tsx";
import CreateRoom from "./Pages/CreateRoom/CreateRoom.tsx";
import ChatRoom from "./Pages/Chatroom/ChatRoom.tsx";
import SelectRoom from "./Pages/SelectRoom/SelectRoom.tsx";
import Terms from "./Pages/Terms/Terms.tsx";
import AboutMe from "./Pages/AboutMe/AboutMe.tsx";
import ContactUs from "./Pages/ContactUs/ContactUs.tsx";
import ServiceArea from "./Pages/ServiceArea/ServiceArea.tsx";

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
    path: "/Home",
    element: <App />,
    children: [
      {
        path: "/Home/ServiceArea",
        element: <ServiceArea />,
      },
      {
        path: "/Home/ChatList/:boxId",
        element: <ChatList />,
      },
      {
        path: "/Home/RoomList/:areaId",
        element: <RoomList />,
        loader: roomListLoader,
      },
      {
        path: "/Home/chatRoom/:boxId",
        element: <ChatRoom />,
      },
      {
        path: "/Home/CreateRoom",
        element: <CreateRoom />,
      },
      {
        path: "/Home/Terms",
        element: <Terms />,
      },
      {
        path: "/Home/AboutMe",
        element: <AboutMe />,
      },
      {
        path: "/Home/ContactUs",
        element: <ContactUs />,
      },
      {
        path: "/Home/UserInfo",
        element: <UserInfo />
      }
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
