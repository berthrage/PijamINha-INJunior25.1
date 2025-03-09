import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";

export default function RootLayout() {
    return (
        <>
            <Header></Header>
            <main>
                <Login></Login>
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </>
    )
}