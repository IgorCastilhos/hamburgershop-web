import {createBrowserRouter} from "react-router-dom";
import {AppLayout} from "@/pages/_layouts/app.tsx";
import {SignIn} from "@/pages/auth/sign-in.tsx";
import {SignUp} from "@/pages/auth/sign-up.tsx";
import {Error} from "@/pages/error.tsx";
import {NotFound} from "@/pages/404.tsx";
import {AuthLayout} from "@/pages/_layouts/auth.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>,
        errorElement: <Error/>,
        children: [
            {path: "/", element: <Dashboard/>},
            {path: "/orders", element: <Orders/>},
        ]
    },

    {
        path: "/",
        element: <AuthLayout/>,
        children: [
            {path: "/sign-in", element: <SignIn/>},
            {path: "/sign-up", element: <SignUp/>},
        ]
    },
    {
        path: "*",
        element: <NotFound/>
    }
])
