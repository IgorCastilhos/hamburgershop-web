export type OrderStatus =
    | "pending"
    | "canceled"
    | "processing"
    | "delivering"
    | "delivered"

interface OrderStatusProps {
    status: OrderStatus
}

const orderStatusMap: Record<OrderStatus, string> = {
    pending: "Pendente",
    canceled: "Cancelado",
    delivered: "Entregue",
    delivering: "Em entrega",
    processing: "Em preparo",
}

export function OrderStatus({status}: OrderStatusProps) {
    return (
        <div className={"flex items-center gap-2"}>
            {status === "pending" && (
                <span data-testid={"badge"} className={"h-2 w-2 rounded-full bg-slate-400"}></span>
            )}

            <span className={"font-medium text-muted-foreground"}>{orderStatusMap[status]}</span>
        </div>
    )
}
