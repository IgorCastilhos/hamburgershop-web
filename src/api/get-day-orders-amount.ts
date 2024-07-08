/* 07/07/2024 - Igor Castilhos
* This code exports an async function that retrieves the
* day's total orders amount the difference from yesterday's
* orders. It performs a GET request to the endpoint and
* returns the response data, which includes the amount and
* diffFromYesterday properties.
*/
import {api} from "@/lib/axios.ts";

export interface GetDayOrdersAmountResponse {
    amount: number
    diffFromYesterday: number
}

export async function getDayOrdersAmount() {
    const response = await api.get<GetDayOrdersAmountResponse>('/metrics/day-orders-amount')
    return response.data
}
