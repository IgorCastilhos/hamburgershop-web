import {z} from "zod";

const signUpForm = z.object({
    restaurantName: z.string(),
    managerName: z.string(),
    email: z.string().email(),
    phone: z.string(),
})

type SignUpForm = z.infer<typeof signUpForm>
