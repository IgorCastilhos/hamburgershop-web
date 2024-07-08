/* 07/07/2024 - Igor Castilhos
* This code exports an async function that retrieves
* daily revenue within a specified period. It accepts
* an object with optional from and to Date properties
* to define the period and returns an array of objects,
* each containing a date and a receipt number, representing
* the revenue for each day within the period.
*
* TODO: The interval cannot be greater than 7 days
*/
import {api} from "@/lib/axios.ts";

export interface GetDailyRevenueInPeriodQuery {
    from?: Date
    to?: Date
}

export type GetDailyRevenueInPeriodResponse = {
    date: string
    receipt: number
}[]

export async function getDailyRevenueInPeriod({from, to}: GetDailyRevenueInPeriodQuery) {
    const response = await api.get<GetDailyRevenueInPeriodResponse>('/metrics/daily-receipt-in-period', {
        params: {
            from, to
        }
    })
    return response.data
}
