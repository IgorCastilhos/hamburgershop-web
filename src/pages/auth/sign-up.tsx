import {z} from "zod";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import {registerRestaurant} from "@/api/register-restaurant.ts";
import {toast} from "sonner";
import {Helmet} from "react-helmet-async";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";

const signUpForm = z.object({
    restaurantName: z.string(),
    managerName: z.string(),
    email: z.string().email(),
    phone: z.string(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
    const navigate = useNavigate()
    const {register, handleSubmit, formState: {isSubmitting}} = useForm<SignUpForm>()

    const {mutateAsync: registerRestaurantFn} = useMutation({
        mutationFn: registerRestaurant,
    })

    async function handleSignUp(data: SignUpForm) {
        try {
            await registerRestaurantFn({
                restaurantName: data.restaurantName,
                managerName: data.managerName,
                email: data.email,
                phone: data.phone,
            })
            toast.success("Restaurante cadastrado com sucesso!", {
                action: {
                    label: "Login",
                    onClick: () => navigate(`/sign-in?email=${data.email}`)
                }
            })
        } catch {
            toast.error("Erro ao cadastrar restaurante.")
        }
    }

    return (
        <>
            <Helmet title={"Cadastro"}/>
            <div className={"p-8"}>
                <div className={"flex w-[350px] flex-col justify-center gap-6"}>
                    <div className={"flex flex-col gap-2 text-center"}>
                        <h1 className={"text-2xl font-semibold tracking-tight"}>
                            Criar conta grátis
                        </h1>
                        <p className={"text-sm text-muted-foreground"}>
                            Seja um parceiro e comece as suas vendas!
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(handleSignUp)} className={"space-y-4"}>
                        <div className={"space-y-2"}>
                            <Label htmlFor={"restaurantName"}>Nome do restaurante</Label>
                            <Input id={"restaurantName"} type={"text"} {...register("restaurantName")}/>
                        </div>

                        <div className={"space-y-2"}>
                            <Label htmlFor={"managerName"}>Seu nome</Label>
                            <Input id={"managerName"} type={"text"} {...register("managerName")}/>
                        </div>

                        <div className={"space-y-2"}>
                            <Label htmlFor={"email"}>Seu e-mail</Label>
                            <Input id={"email"} type={"email"} {...register("email")}/>
                        </div>

                        <div className={"space-y-2"}>
                            <Label htmlFor={"phone"}>Seu celular</Label>
                            <Input id={"phone"} type={"tel"} {...register("phone")}/>
                        </div>

                        <Button disabled={isSubmitting} className={"w-full"} type={"submit"}>Finalizar cadastro</Button>
                        <Button className={"w-full"} variant={"secondary"} type={"button"}><Link to={"/sign-in"} className={"w-full"}>Já possui cadastro? Faça login</Link></Button>

                        <p className={"px-6 text-center text-sm leading-relaxed text-muted-foreground"}>
                            Ao continuar, você concorda com nossos{' '}<a className={"underline underline-offset-4"}
                                                                          href={"#"}>termos de serviço
                        </a>{' '}e{' '}
                            <a className={"underline underline-offset-4"} href={"#"}>
                                políticas de privacidade
                            </a>.
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}
