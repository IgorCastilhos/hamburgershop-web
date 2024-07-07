import './global.css'
import {RouterProvider} from "react-router-dom";
import {router} from "@/routes.tsx";
import {Helmet, HelmetProvider} from "react-helmet-async";
import {Toaster} from "sonner";
import {ThemeProvider} from "@/components/theme/theme-provider.tsx";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/lib/react-query.ts";

export function App() {
    return (
        <HelmetProvider>
            <ThemeProvider storageKey={"hamburgershop-theme"} defaultTheme={"system"}>
                <Helmet titleTemplate={"%s | hamburger.shop"}/>
                <Toaster richColors/>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router}/>
                </QueryClientProvider>
            </ThemeProvider>
        </HelmetProvider>
    )
}
