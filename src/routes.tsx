import {createBrowserRouter} from "react-router-dom";

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
