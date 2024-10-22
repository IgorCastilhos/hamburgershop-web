import {z} from "zod";
import {Link, useSearchParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import {toast} from "sonner";
import {Helmet} from "react-helmet-async";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {signIn} from "@/api/sign-in.ts";

const signInForm = z.object({
    email: z.string().email()
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
    const [searchParams] = useSearchParams()

    const {
        register,
        handleSubmit,
        formState: {isSubmitting}
    } = useForm<SignInForm>({
        defaultValues: {
            email: searchParams.get("email") ?? '',
        }
    })

    const {mutateAsync: authenticate} = useMutation({
        mutationFn: signIn,
    })

    async function handleSignIn(data: SignInForm) {
        try {
            await authenticate({email: data.email})

            toast.success("Enviamos um link de autenticação para o seu e-mail.", {
                action: {
                    label: "Reenviar",
                    onClick: () => handleSignIn(data)
                }
            })
        } catch {
            toast.error("Credenciais inválidas")
        }
    }

    return (
        <>
        <Helmet title={"Login"}/>
            <div className={"p-8"}>
                <div className={"flex w-[350px] flex-col justify-center gap-6"}>
                    <div className={"flex flex-col gap-2 text-center"}>
                        <h1 className={"text-2xl font-semibold tracking-tight"}>Acessar painel</h1>
                        <p className={"text-sm text-muted-foreground"}>Acompanhe as suas vendas pelo painel do parceiro!</p>
                    </div>

                    <form onSubmit={handleSubmit(handleSignIn)} className={"space-y-4"}>
                        <div className={"space-y-2"}>
                            <Label htmlFor={"email"}>Seu e-mail</Label>
                            <Input id={"email"} type={"email"} {...register ('email')}/>
                        </div>

                        <Button disabled={isSubmitting} className={"w-full"} type={"submit"}>Acessar painel</Button>
                        <Button className={"w-full"} variant={"secondary"} type={"button"}><Link to={"/sign-up"} className={"w-full"}>Cliente novo? Comece por aqui</Link></Button>
                    </form>
                </div>
            </div>
        </>
    )
}

