import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import NotFound from "../components/NotFound";
import Dashboard from "../pages/Dashboard";
import AddContest from "../pages/AddContest";
import CreatorRoute from "../pages/CreatorRoute";

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
                Component: Dashboard
            },
            {
                path: "*",
                Component: NotFound
            },
            {
                path: '/add-contest',
                element: <CreatorRoute><AddContest/></CreatorRoute>
            }
        ]
    },
]);