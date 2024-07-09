import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {OrderStatus} from "@/components/order-status.tsx";
import {GetOrdersResponse} from "@/api/get-orders.ts";
import {cancelOrder} from "@/api/cancel-order.ts";
import {approveOrder} from "@/api/approve-order.ts";
import {dispatchOrder} from "@/api/dispatch-order.ts";
import {deliverOrder} from "@/api/deliver-order.ts";
import {TableCell, TableRow} from "@/components/ui/table.tsx";
import {Dialog, DialogTrigger} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ArrowRight, Search, X} from "lucide-react";
import {OrderDetails} from "@/pages/app/orders/order-details.tsx";
import {formatDistanceToNow} from "date-fns";
import {ptBR} from "date-fns/locale";

export interface OrderTableRowProps {
    order: {
        orderId: string
        createdAt: string
        status: "pending" | "canceled" | "processing" | "delivering" | "delivered"
        customerName: string
        total: number
    }
}

export function OrderTableRow({order}: OrderTableRowProps) {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const queryClient = useQueryClient()

    function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
        const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
            queryKey: ['orders'],
        })

        ordersListCache.forEach(([cacheKey, cacheData]) => {
            if (!cacheData) return

            queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
                ...cacheData,
                orders: cacheData.orders.map((order) => {
                    if (order.orderId === orderId) {
                        return {...order, status}
                    }
                    return order
                })
            })
        })
    }

    const {mutateAsync: cancelOrderFn, isPending: isCancelingOrder} = useMutation({
        mutationFn: cancelOrder,
        async onSuccess(_, {orderId}) {
            updateOrderStatusOnCache(orderId, "canceled")
        }
    })

    const {mutateAsync: approveOrderFn, isPending: isApprovingOrder} = useMutation({
        mutationFn: approveOrder,
        async onSuccess(_, {orderId}) {
            updateOrderStatusOnCache(orderId, "processing")
        }
    })

    const {mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder} = useMutation({
        mutationFn: dispatchOrder,
        async onSuccess(_, {orderId}) {
            updateOrderStatusOnCache(orderId, "delivering")
        }
    })

    const {mutateAsync: deliverOrderFn, isPending: isDeliveringOrder} = useMutation({
        mutationFn: deliverOrder,
        async onSuccess(_, {orderId}) {
            updateOrderStatusOnCache(orderId, "delivered")
        }
    })

    return (
        <TableRow>
            <TableCell>
                <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                    <DialogTrigger asChild>
                        <Button variant={"outline"} size={"xs"}>
                            <Search className={"h-3 w-3"}/>
                            <span className={"sr-only"}>Detalhes do pedido</span>
                        </Button>
                    </DialogTrigger>

                    <OrderDetails orderId={order.orderId} open={isDetailsOpen}/>
                </Dialog>
            </TableCell>
            <TableCell className={"font-mono text-xs font-medium"}>{order.orderId}</TableCell>
            <TableCell className={"text-muted-foreground"}>{formatDistanceToNow(order.createdAt, {
                locale: ptBR,
                addSuffix: true
            })}</TableCell>
            <TableCell><OrderStatus status={order.status}/></TableCell>
            <TableCell className={"font-medium"}>{order.customerName}</TableCell>
            <TableCell className={"font-medium"}>{(order.total / 100).toLocaleString('pt-BR', {
                style: "currency",
                currency: "BRL"
            })}</TableCell>
            <TableCell>
                {order.status === "pending" && (
                    <Button onClick={() => approveOrderFn({orderId: order.orderId})} variant={"outline"} size={"xs"}
                            disabled={isApprovingOrder}>
                        <ArrowRight className={"mr-2 h-3 w-3"}/>
                        Aprovar
                    </Button>
                )}

                {order.status === "processing" && (
                    <Button onClick={() => dispatchOrderFn({orderId: order.orderId})} variant={"outline"} size={"xs"}
                            disabled={isDispatchingOrder}>
                        <ArrowRight className={"mr-2 h-3 w-3"}/>
                        Em entrega
                    </Button>
                )}

                {order.status === "delivering" && (
                    <Button onClick={() => deliverOrderFn({orderId: order.orderId})} variant={"outline"} size={"xs"}
                            disabled={isDeliveringOrder}>
                        <ArrowRight className={"mr-2 h-3 w-3"}/>
                        Entregue
                    </Button>
                )}
            </TableCell>
            <TableCell>
                <Button
                    disabled={!['pending', 'processing'].includes(order.status) || isCancelingOrder}
                    variant={"ghost"}
                    size={"xs"}
                    onClick={() => cancelOrderFn({orderId: order.orderId})}>
                    <X className={"mr-2 h-3 w-3"}/>
                    Cancelar
                </Button>
            </TableCell>
        </TableRow>
    )

}
