import {FaHamburger} from "react-icons/fa";
import {Outlet} from "react-router-dom";

export function AuthLayout() {
    return (
        <div className={"min-h-screen grid grid-cols-2 antialiased"}>
            <div
                className={"h-full border-r border-foreground/5 bg-muted p-10 text-muted-foreground flex flex-col justify-between"}>
                <div className={"flex items-center gap-3 text-lg font-medium text-foreground"}>
                    <FaHamburger className={"h-5 w-5"}/>
                    <span className={"font-semibold"}>Hamburger.shop</span>
                </div>
                <footer className={"text-sm"}>
                    Painel do parceiro &copy; hamburger.shop - {new Date().getFullYear()}
                </footer>
            </div>

            <div className={"flex flex-col items-center justify-center relative"}>
                <Outlet/>
            </div>
        </div>
    )
}
