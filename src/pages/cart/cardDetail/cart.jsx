
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button.jsx";
import { AiOutlineDelete } from "react-icons/ai";

export const cartColumns = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "orderID",
        header: "Order ID",
        cell: ({row}) => <div className="capitalize">{row.getValue("orderID")}</div>,
    },
    {
        accessorKey: "itemCode",
        header: "Item Code",
        cell: ({row}) => <div className="capitalize">{row.getValue("itemCode")}</div>,
    },
    {
        accessorKey: "qty",
        header: "Quantity",
        cell: ({row}) => <div className="capitalize">  {row.getValue("qty")}</div>,
    },
    {
        accessorKey: "unitPrice",
        header: "Unit Price",
        cell: ({row}) => <div className="capitalize">  {row.getValue("unitPrice")}</div>,
    },
    {
        accessorKey: "itemDesc",
        header: "Item Desc",
        cell: ({row}) => <div className="capitalize">{row.getValue("itemDesc")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            const data = row.original;
            // navigator.clipboard.writeText(data.customerCode)
            return(
                <>
                    <Button>
                        <AiOutlineDelete/>
                    </Button>
                </>
                )
        },
    },
];