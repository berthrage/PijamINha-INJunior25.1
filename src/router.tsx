import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./RootLayout";
import PageErrorBoundary from "./error-boundary/PageErrorBoundary";
import Login from "./pages/Login";
import Feedback from "./pages/Feedback";
import Register from "./pages/Register";
import PajamasPage from "./pages/PajamasPage";
import CartFavoritesHeader from "./components/CartFavoritesHeader";
import Cart from "./pages/Cart";
import SinglePajamaPage from "./pages/SinglePajamaPage";
// import Data from "./components/Data";
// import Payment from "./components/Payment";
// import Concluded from "./components/Concluded";

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
                    path:"/cart",
                    element: <><CartFavoritesHeader></CartFavoritesHeader><Cart></Cart></>
                },
                {
                    path:"/favorites",
                    element: <><CartFavoritesHeader></CartFavoritesHeader></>
                },
                {
                    path: "/pajamas",
                    element: <PajamasPage></PajamasPage>,
                },
                {
                    path: "/pajama/:pajamaName",
                    element: <SinglePajamaPage></SinglePajamaPage>
                },
                // {path:"/data",
                //     element: <Data></Data>
                // },
                // {
                //     path: "/pay",
                //     element: <Payment></Payment>
                // },
                // {
                //     path: "/concluded",
                //     element: <Concluded></Concluded>
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