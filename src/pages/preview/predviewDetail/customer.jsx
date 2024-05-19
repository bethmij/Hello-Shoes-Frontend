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
import {Link} from "react-router-dom"
import axios from "axios";
import {deleteEntity} from "../../cart/cardDetail/fetchData.jsx";

// const formatDate = (dateString) => {
//     const year = dateString.substring(0, 4);
//     const month = dateString.substring(4, 6);
//     const day = dateString.substring(6, 8);
//     return `${year}-${month}-${day}`;
// };

const  deleteCustomer =  (customerCode) => {
     deleteEntity("customer", customerCode)
}

export const customerColumns = [
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
        accessorKey: "customerCode",
        header: ({column}) => {
            return (
                <Button
                    className="text-center text-xl text-metal "
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Customer Code
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: ({row}) => <div className="capitalize">{row.getValue("customerCode")}</div>,
    },
    {
        accessorKey: "customerName",
        header: "Customer Name",
        cell: ({row}) => <div className="capitalize">{row.getValue("customerName")}</div>,
    },
    {
        accessorKey: "gender",
        header: "Gender",
        cell: ({row}) => <div className="capitalize">{row.getValue("gender")}</div>,
    },
    {
        accessorKey: "loyaltyJoinedDate",
        header: "Joined Date",
        cell: ({row}) => <div className="capitalize">  {row.getValue("loyaltyJoinedDate")}</div>,
    },
    {
        accessorKey: "totalPoints",
        header: ({column}) => {
            return (
                <Button
                    className="text-center text-xl text-metal "
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Total Points
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: ({row}) => <div className="capitalize">  {row.getValue("totalPoints")}</div>,
    },
    {
        accessorKey: "contactNo",
        header: "Contact",
        cell: ({row}) => <div className="capitalize">  {row.getValue("contactNo")}</div>,
    },
    {
        accessorKey: "dob",
        header: "DOB",
        cell: ({row}) => (
            <div className="capitalize">
                {row.getValue("dob")}
            </div>
        ),
    },
    {
        accessorKey: "level",
        header: "Level",
        cell: ({row}) => <div className="capitalize">{row.getValue("level")}</div>,
    },
    {
        accessorKey: "address",
        header: "Address",
        cell: ({row}) => (
            <div className="capitalize">
                {`${row.original.addressLine01}, ${row.original.addressLine02}, ${row.original.addressLine03}, ${row.original.addressLine04}, ${row.original.addressLine05}`}
            </div>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({row}) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    // {
    //     accessorKey: "amount",
    //     header: () => <div className="text-right">Amount</div>,
    //     cell: ({ row }) => {
    //         const amount = parseFloat(row.getValue("amount"));
    //
    //         // Format the amount as a dollar amount
    //         const formatted = new Intl.NumberFormat("en-US", {
    //             style: "currency",
    //             currency: "USD",
    //         }).format(amount);
    //
    //         return <div className="text-right font-medium">{formatted}</div>;
    //     },
    // },
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
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(data.customerCode)}>
                            Copy Customer Code
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <Link to={`/form/customer/update-${data.customerCode}`}>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(data.customerCode)}>Update
                                customer</DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem onClick={() => deleteCustomer(data.customerCode)}>Delete Customer</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];