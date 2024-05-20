import {Checkbox} from "../../../components/ui/checkbox.jsx";
import {Button} from "../../../components/ui/button.jsx";
import { ArrowUpDown} from 'lucide-react';

const formatDate = (dateString) => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = parseInt(dateString.substring(6, 8))+1;
    return `${year}-${month}-${day}`;
};

export const panelColumns = [
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
        accessorKey: "date",
        header: ({column}) => {
            return (
                <Button
                    className="text-center text-xl text-metal "
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: ({row}) => <div className="capitalize">{formatDate(row.getValue("date"))}</div>,
    },
    {
        accessorKey: "totalSales",
        header: ({column}) => {
            return (
                <Button
                    className="text-center text-xl text-metal "
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Total Sales
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: ({row}) => <div className="capitalize">{row.getValue("totalSales")}</div>,
    },
    {
        accessorKey: "totalProfit",
        header: ({column}) => {
            return (
                <Button
                    className="text-center text-xl text-metal "
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Total Profit
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: ({row}) => <div className="capitalize">{row.getValue("totalProfit")}</div>,
    },
    {
        accessorKey: "mostSaleItem",
        header: "Most Sold Item",
        cell: ({row}) => <div className="capitalize">  {row.getValue("mostSaleItem")}</div>,
    },
    {
        accessorKey: "mostSaleItemQty",
        header: "Most Sold Item Qty",
        cell: ({row}) => <div className="capitalize">  {row.getValue("mostSaleItemQty")}</div>,
    }
]