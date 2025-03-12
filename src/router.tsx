import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./RootLayout";
import PageErrorBoundary from "./error-boundary/PageErrorBoundary";
import Login from "./pages/Login";
import Feedback from "./pages/Feedback";
import Register from "./pages/Register";
import SecondHeader from "./components/SecondHeader";
import WishList from "./pages/WishList";

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
                {
                    path: '/feedback',
                    element: <Feedback></Feedback>
                },
                {
                    path: "/register",
                    element: <><Register></Register></>,
                    
                },
                {
                    path:"/carrinho",
                    element: <><SecondHeader></SecondHeader></>
                },
                {
                    path:"/favoritos",
                    element: <><SecondHeader></SecondHeader>
                    <WishList></WishList></>
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
        
    ]
);

export default router;