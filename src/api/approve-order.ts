/* 07/07/2024 - Igor Castilhos
* This code defines a module for approving orders through
* an API call. It uses an Axios instance to make the http
* request.
*
* ApproveOrderParams Interface: it specifies the shape of
* objects that can be used as parameters for the approveOrder
* function. It requires a orderId prop of type string.
*
* approveOrder function: this function is asynchronous and it
* indicates that it returns a Promise (network request).
* The func takes a single parameter, an object that conforms
* to the ApproveOrderParams interface. This parameter is des-
* tructured to extract the orderId directly in the func signature.
* Inside the func, an async operation is performed using the api
* object's patch method. The method sends a PATCH request to the
* URL. The request is intended to change the status of the order
* to "approved" on the server side.
*/

import {api} from "@/lib/axios.ts";

export interface ApproveOrderParams {
    orderId: string
}

export async function approveOrder({ orderId }: ApproveOrderParams) {
    await api.patch(`/orders/${orderId}/approve`)
}
