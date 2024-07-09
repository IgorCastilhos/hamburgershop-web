/* 08/07/2024 - Igor Castilhos
* This code defines an async function that fetches
* data about a managed restaurant using a GET req.
* It expects the response to conform to the
* GetManagedRestaurantsResponse interface,
* which includes properties like name, id and
* createdAt, and returns the data from the response.
*/
import {api} from "@/lib/axios.ts";

export interface GetManagedRestaurantResponse {
    name: string
    id: string
    createdAt: Date | null
    updatedAt: Date | null
    description: string | null
    managerId: string | null
}

export async function getManagedRestaurant() {
    const response = await api.get<GetManagedRestaurantResponse>('/managed-restaurant')
    return response.data
}
