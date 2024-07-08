import {api} from "@/lib/axios.ts";

export interface GetProfileResponse {
    name: string
    id: string
    email: string
    phone: string | null
    role: "manager" | "customer"
    createdAt: Date | null
    updatedAt: Date | null
}

export async function getProfile(): Promise<GetProfileResponse> {
    const response = await api.get<GetProfileResponse>("/me")
    return response.data
}
