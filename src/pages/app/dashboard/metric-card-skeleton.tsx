import {Skeleton} from "@/components/ui/skeleton.tsx";

export function MetricCardSkeleton(){
    return (
        <>
            <Skeleton className={"h-7 w-36 mt-1"}/>
            <Skeleton className={"h-4 w-52"}/>
        </>
    )
}
