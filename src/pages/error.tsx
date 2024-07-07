import {Link} from "react-router-dom";

export function Error() {
    return (
        <div className={"flex h-screen flex-col items-center justify-center gap-2"}>
            <h1 className={"text-4xl font-bold"}>Whoops, algo de errado aconteceu...</h1>
            <div className={"h-64 w-64"}>
                <img src={"/public/img.svg"} alt={"Imaged de Erro"}/>
            </div>
            <a className={'font-medium text-xs'} href="https://storyset.com/people">People illustrations by Storyset</a>

            <p className={"text-accent-foreground"}>
                Voltar para o{' '}
                <Link to={"/"} className={"text-sky-600 dark:text-sky-400"}>Dashboard</Link>
            </p>
        </div>
    )
}
