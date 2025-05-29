import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function DefaultLayout() {
    return (
        <>
            <Header />
            <Sidebar />
            <main className="pt-[60px]"> 
                <Outlet />
            </main>
        </>
    );
}
