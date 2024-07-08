/* 07/07/2024 - Igor Castilhos
* Exports an async function that sends a PATCH request
* to update an order's status to "dispatched". It accepts
* an object with an orderId string property to specify which
* order to dispatch and sends the request off to the server.
*/
import {api} from "@/lib/axios.ts";

export interface DispatchOrderParams {
    orderId: string
}

export async function dispatchOrder({orderId}: DispatchOrderParams) {
    await api.patch(`/orders/${orderId}/dispatch`)
}
