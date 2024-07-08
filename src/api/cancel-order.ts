/* 07/07/2024 - Igor Castilhos
* This module exports a function cancelOrder for sending a
* PATCH request to cancel an order by its ID. It uses an Axios
* instance. The function accepts an object with an orderId
* property, indicating the specific order to cancel, and sends the
* request to the endpoint '/orders/:id/cancel'.
*/

import {api} from "@/lib/axios.ts";

export interface CancelOrderParams {
    orderId: string
}

export async function cancelOrder({ orderId }: CancelOrderParams) {
    await api.patch(`/orders/${orderId}/cancel`)
}
