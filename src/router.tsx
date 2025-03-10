import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./RootLayout";
import PageErrorBoundary from "./error-boundary/PageErrorBoundary";
import Login from "./pages/Login";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <RootLayout></RootLayout>,
            children: [
                {
                    path: '/home',
                    element: <Home></Home>
                },
                {
                    path: "/",
                    element: <Login></Login>,
                    index: true,
                },
                // {
                //     path: "/genero/:genero",
                //     element: <GenrePage></GenrePage>,
                //     errorElement: <PageErrorBoundary></PageErrorBoundary>,
                // },
                {
                    path: "*", 
                    element: <PageErrorBoundary></PageErrorBoundary>,
                }
            ]
        },
        // {
        //     path: "/login",
        //     element: <Login></Login>
        // },
        
    ]
);

export default router;