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
import {Link} from "react-router-dom";
import {deleteEntity} from "../../cart/cardDetail/fetchData.jsx";
import {isAdmin} from "../../auth/authentication.jsx";

const deleteSupplier = (supplierCode) => {
    deleteEntity("supplier", supplierCode,"Supplier")
}

export const supplierColumns = [
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
        accessorKey: "supplierCode",
        header: ({column}) => {
            return (
                <Button
                    className="text-center text-xl text-metal"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Supplier Code
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: ({row}) => <div className="capitalize">{row.getValue("supplierCode")}</div>,
    },
    {
        accessorKey: "supplierName",
        header: "Supplier Name",
        cell: ({row}) => <div className="capitalize">{row.getValue("supplierName")}</div>,
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({row}) => <div className="capitalize">  {row.getValue("category")}</div>,
    },
    {
        accessorKey: "contactNo1",
        header: "Contact - Mobile ",
        cell: ({row}) => <div className="capitalize">  {row.getValue("contactNo1")}</div>,
    },
    {
        accessorKey: "contactNo2",
        header: "Contact - Land",
        cell: ({row}) => <div className="capitalize">{row.getValue("contactNo2")}</div>,
    },
    {
        accessorKey: "address",
        header: "Address",
        cell: ({row}) => (
            <div className="capitalize">
                {`${row.original.addressLine01}, ${row.original.addressLine02}, ${row.original.addressLine03}, ${row.original.addressLine04}, ${row.original.addressLine05}, ${row.original.addressLine06}`}
            </div>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({row}) => <div className="lowercase">{row.getValue("email")}</div>,
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
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(data.supplierCode)}>
                            Copy Supplier Code
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuSeparator/>
                        {isAdmin() &&
                            <Link to={`/form/supplier/update-${data.supplierCode}`}>
                                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(data.supplierCode)}>Update
                                    Supplier</DropdownMenuItem>
                            </Link>
                        }
                        {/*{isAdmin() &&*/}
                        {/*    <DropdownMenuItem onClick={() => deleteSupplier(data.supplierCode)}>Delete*/}
                        {/*        Supplier</DropdownMenuItem>*/}
                        {/*}*/}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];