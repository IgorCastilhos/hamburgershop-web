import {z} from "zod";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";

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

    const {mutateAsync: registerRestaurantFn} = useMutation({mutationFn: registerRestaurant})

    async function handleSignUp(data: SignUpForm) {
        try {
            await registerRestaurantFn({
            })
        }
    }
}
