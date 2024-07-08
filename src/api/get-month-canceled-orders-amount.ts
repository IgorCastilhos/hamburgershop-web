/* 08/08/2024 - Igor Castilhos
*
* The function getMonthCanceledOrdersAmount fetches
* the total amount of orders canceled within the
* current month and the difference in cancellation
* amounts compared to the previous month. It returns
* the response data, which includes the amount and
* diffFromLastMonth properties.
*/
import {api} from "@/lib/axios.ts";

export interface GetMonthCanceledOrdersAmountResponse {
    amount: number
    diffFromLastMonth: number
}

export async function getMonthCanceledOrdersAmount() {
    const response = await api.get<GetMonthCanceledOrdersAmountResponse>('/metrics/month-canceled-orders-amount')
    return response.data
}
