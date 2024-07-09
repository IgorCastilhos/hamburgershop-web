import { Outlet } from "react-router-dom";
import { FaHamburger } from "react-icons/fa";

export function AuthLayout() {
    return (
        <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
            <div className="hidden bg-muted lg:block">
                <img
                    src="/hero.png"
                    alt="Image"
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="flex flex-col items-center justify-center w-full h-screen">
                <div className="w-full p-10 text-muted-foreground flex flex-col items-center justify-between h-full">
                    <div className="flex items-center gap-3 text-lg font-medium text-foreground">
                        <FaHamburger className="h-5 w-5 text-orange-400" />
                        <span className="font-semibold">Hamburger.shop</span>
                    </div>
                    <div className="flex flex-grow items-center justify-center">
                        <Outlet />
                    </div>
                    <footer className="text-sm">
                        Painel do parceiro &copy; hamburger.shop - {new Date().getFullYear()}
                    </footer>
                </div>
            </div>
        </div>
    );
}
