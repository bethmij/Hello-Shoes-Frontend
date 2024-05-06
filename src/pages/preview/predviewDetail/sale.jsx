import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button.jsx";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import Tables from "../../../components/shared/table.jsx";



const formatDate = (dateString) => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${year}-${month}-${day}`;
};

// function setItems() {
//     return (
//         <>
//             <Drawer>
//                 <DrawerTrigger asChild>
//                     <Button variant="outline">Open Drawer</Button>
//                 </DrawerTrigger>
//                 <DrawerContent className=" w-full flex items-center justify-center">
//                     <div className="w-2/3 ">
//                         <DrawerHeader>
//                             <DrawerTitle>Sale - SP00-001 - Item</DrawerTitle>
//                         </DrawerHeader>
//                         <Tables columns={saleInventoryColumns} data={data.saleInventory}></Tables>
//                         <DrawerFooter>
//                             <DrawerClose asChild>
//                                 <Button variant="outline">Cancel</Button>
//                             </DrawerClose>
//                         </DrawerFooter>
//                     </div>
//                 </DrawerContent>
//             </Drawer>
//         </>
//     )
// }

export const saleColumns = [
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
        accessorKey: "orderNo",
        header: ({column}) => {
            return (
                <Button
                    className="text-center text-xl text-metal"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Order ID
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: ({row}) => <div className="capitalize">{row.getValue("orderNo")}</div>,
    },
    {
        accessorKey: "totalPrice",
        header: () => <div className="text-right">Total Price</div>,
        cell: ({row}) => {
            const amount = parseFloat(row.getValue("totalPrice"));

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount);

            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "purchaseDate",
        header: "Purchase Date",
        cell: ({row}) => (
            <div className="capitalize">
                {formatDate(row.getValue("purchaseDate"))}
            </div>
        ),
    },
    {
        accessorKey: "addedPoints",
        header: "Added Points",
        cell: ({row}) => <div className="capitalize">{row.getValue("addedPoints")}</div>,
    },
    {
        accessorKey: "cashier",
        header: "Cashier Name",
        cell: ({row}) => <div className="lowercase">{row.getValue("cashier")}</div>,
    },
    {
        accessorKey: "customerName",
        header: "Customer Name",
        cell: ({row}) => <div className="lowercase">{row.getValue("customerName")}</div>,
    },

    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            const data = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(data.orderNo)}>
                            Copy Customer Code
                        </DropdownMenuItem>
                        <DropdownMenuItem >
                            View Items
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];