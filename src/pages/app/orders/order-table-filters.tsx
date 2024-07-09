import {z} from "zod";
import {useSearchParams} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Search, X} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

const orderFiltersSchema = z.object({
    orderId: z.string().optional(),
    customerName: z.string().optional(),
    status: z.string().optional(),
})

type OrderTableFiltersSchema = z.infer<typeof orderFiltersSchema>

export function OrderTableFilters() {
    const [searchParams, setSearchParams] = useSearchParams()
    const orderId = searchParams.get("orderId")
    const customerName = searchParams.get("customerName")
    const status = searchParams.get("status")
    const {register, handleSubmit, control, reset} = useForm<OrderTableFiltersSchema>({
        resolver: zodResolver(orderFiltersSchema),
        defaultValues: {orderId: orderId ?? '', customerName: customerName ?? '', status: status ?? ''}
    })

    function handleFilter({orderId, customerName, status}: OrderTableFiltersSchema) {
        setSearchParams(url => {
            if (orderId) {
                url.set("orderId", orderId)
            } else {
                url.delete("orderId")
            }

            if (customerName) {
                url.set("customerName", customerName)
            } else {
                url.delete("customerName")
            }

            if (status) {
                url.set("status", status)
            } else {
                url.delete("status")
            }

            url.set("page", "1")

            return url
        })
    }

    function handleClearFilters() {
        setSearchParams((url) => {
            url.delete("orderId")
            url.delete("customerName")
            url.delete("status")
            url.set("page", "1")
            return url
        })

        reset({
            orderId: '',
            customerName: '',
            status: 'all',
        })
    }

    return (
        <form onSubmit={handleSubmit(handleFilter)} className={"flex items-center gap-2"}>
            <span className={"text-sm font-semibold"}>Filtros:</span>
            <Input className={"h-8 w-auto"} placeholder={"ID do pedido"} {...register("orderId")}/>
            <Input className={"h-8 w-[320px]"} placeholder={"Nome do cliente"} {...register("customerName")}/>
            {/* Do not access any of the properties inside the control object. It's for internal usage only.*/}
            <Controller
                control={control}
                name={"status"}
                render={({field: {name, onChange, value, disabled}}) => {
                    return (
                        <Select defaultValue={"all"} name={name} onValueChange={onChange} value={value}
                                disabled={disabled}>
                            <SelectTrigger className={"h-8 w-[180px]"}>
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={"all"}>Todos</SelectItem>
                                <SelectItem value={"pending"}>Pendente</SelectItem>
                                <SelectItem value={"canceled"}>Cancelado</SelectItem>
                                <SelectItem value={"processing"}>Em preparo</SelectItem>
                                <SelectItem value={"delivering"}>Em entrega</SelectItem>
                                <SelectItem value={"delivered"}>Entregue</SelectItem>
                            </SelectContent>
                        </Select>
                    )
                }}
            ></Controller>
            <Button type={"submit"} variant={"secondary"} size={"xs"}>
                <Search className={"h-4 w-4 mr-2"}/>
                Filtrar resultados
            </Button>

            <Button onClick={handleClearFilters} type={"button"} variant={"destructive"} size={"xs"}>
                <X className={"h-4 w-4 mr-2"}/>
                Remover filtros
            </Button>
        </form>
    )
}
