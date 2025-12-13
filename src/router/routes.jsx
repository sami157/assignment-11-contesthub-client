import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import NotFound from "../components/NotFound";
import Dashboard from "../pages/Dashboard";
import AddContest from "../pages/AddContest";
import CreatorRoute from "../pages/CreatorRoute";
import ContestsCreated from "../pages/ContestsCreated";
import PrivateRoute from "../pages/PrivateRoute";
import ContestsParticipated from "../pages/ContestsParticipated";
import AdminRoute from "../pages/AdminRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/register',
                Component: Register
            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/dashboard',
                element: <AdminRoute><Dashboard/></AdminRoute>
            },
            {
                path: "*",
                Component: NotFound
            },
            {
                path: '/add-contest',
                element: <CreatorRoute><AddContest/></CreatorRoute>
            },
            {
                path: '/contests-created',
                element: <CreatorRoute><ContestsCreated /></CreatorRoute>
            },
            {
                path: '/contests-participated',
                element: <PrivateRoute><ContestsParticipated/></PrivateRoute>
            }
        ]
    },
]);