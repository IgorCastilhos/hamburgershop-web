import {useSearchParams} from "react-router-dom";
import {z} from "zod";
import {useQuery} from "@tanstack/react-query";
import {getOrders} from "@/api/get-orders.ts";
import {Helmet} from "react-helmet-async";
import {OrderTableFilters} from "@/pages/app/orders/order-table-filters.tsx";
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {OrderTableSkeleton} from "@/pages/app/orders/order-table-skeleton.tsx";
import {OrderTableRow} from "@/pages/app/orders/order-table-row.tsx";
import {Pagination} from "@/components/pagination.tsx";

export function Orders() {
    const [searchParams, setSearchParams] = useSearchParams()
    const orderId = searchParams.get("orderId")
    const customerName = searchParams.get("customerName")
    const status = searchParams.get("status")
    const pageIndex = z.coerce.number()
        .transform(page => page - 1)
        .parse(searchParams.get("page") ?? "1")

    const {data: result, isLoading: isLoadingOrders} = useQuery({
        queryKey: ["orders", pageIndex, orderId, customerName, status],
        queryFn: () => getOrders({pageIndex, orderId, customerName, status: status === "all" ? null : status}),
    })

    function handlePaginate(pageIndex: number) {
        setSearchParams(url => {
            url.set("page", (pageIndex + 1).toString())
            return url
        })
    }

    return (
        <>
            <Helmet title={"Pedidos"}/>
            <div className={"flex flex-col gap-4"}>
                <h1 className={"text-3xl font-bold tracking-tight"}>Pedidos</h1>
                <div className={"space-y-2.5"}>
                    <OrderTableFilters/>
                    <div className={"border rounded-md"}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className={"w-[64px]"}></TableHead>
                                    <TableHead className={"w-[140px]"}>Identificador</TableHead>
                                    <TableHead className={"w-[180px]"}>Realizado há</TableHead>
                                    <TableHead className={"w-[140px]"}>Status</TableHead>
                                    <TableHead>Cliente</TableHead>
                                    <TableHead className={"w-[140px]"}>Total do pedido</TableHead>
                                    <TableHead className={"w-[164px]"}></TableHead>
                                    <TableHead className={"w-[132px]"}></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoadingOrders && <OrderTableSkeleton/>}
                                {result && result.orders.map(order => {
                                    return <OrderTableRow key={order.orderId} order={order}/>
                                })}
                            </TableBody>
                        </Table>
                    </div>
                    {result && (
                        <Pagination
                            onPageChange={handlePaginate}
                            pageIndex={result.meta.pageIndex}
                            totalCount={result.meta.totalCount}
                            perPage={result.meta.perPage}
                        />
                    )}
                </div>
            </div>
        </>
    )
}
