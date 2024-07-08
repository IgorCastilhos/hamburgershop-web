/* 07/07/2024 - Igor Castilhos
* This module exports an async function deliverOrder
* that sends a PATCH request to mark an order as delivered.
* It accepts an object with an orderId string property to
* specify the order and sends the request off to the server.
*/
import {api} from "@/lib/axios.ts";

export interface DeliverOrderParams {
    orderId: string
}

export async function deliverOrder({orderId}:DeliverOrderParams){
    await api.patch(`/orders/${orderId}/deliver`)
}
