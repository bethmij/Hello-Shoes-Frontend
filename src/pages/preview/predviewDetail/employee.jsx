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
import {Dialog} from "../../../components/ui/dialog.jsx";
import {useState} from "react";


// const formatDate = (dateString) => {
//     const year = dateString.substring(0, 4);
//     const month = dateString.substring(4, 6);
//     const day = dateString.substring(6, 8);
//     return `${year}-${month}-${day}`;
// };

const  deleteEmployee =  (employeeCode) => {
    deleteEntity("employee", employeeCode)
}




export const employeeColumns = [


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
        accessorKey: "employeeCode",
        header: ({column}) => {
            return (
                <Button
                    className="text-center text-xl text-metal"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Employee Code
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: ({row}) => <div className="capitalize">{row.getValue("employeeCode")}</div>,
    },
    {
        accessorKey: "employeeName",
        header: "Employee Name",
        cell: ({row}) => <div className="capitalize">{row.getValue("employeeName")}</div>,
    },
    {
        accessorKey: "gender",
        header: "Gender",
        cell: ({row}) => <div className="capitalize">{row.getValue("gender")}</div>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({row}) => <div className="capitalize">  {row.getValue("status")}</div>,
    },
    {
        accessorKey: "designation",
        header: "Designation",
        cell: ({row}) => <div className="capitalize">  {row.getValue("designation")}</div>,
    },
    {
        accessorKey: "attachedBranch",
        header: "Attached Branch",
        cell: ({row}) => <div className="capitalize">  {row.getValue("attachedBranch")}</div>,
    },
    {
        accessorKey: "dob",
        header: "DOB",
        cell: ({row}) => <div className="capitalize">  {row.getValue("dob")}</div>,
    },
    {
        accessorKey: "dateJointed",
        header: "Date Jointed",
        cell: ({row}) => <div className="capitalize">  {row.getValue("dateJointed")}</div>,
    },
    {
        accessorKey: "accessRole",
        header: ({column}) => {
            return (
                <Button
                    className="text-center text-xl text-metal"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Access Role
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: ({row}) => <div className="capitalize">  {row.getValue("accessRole")}</div>,
    },
    {
        accessorKey: "contactNo",
        header: "Contact",
        cell: ({row}) => <div className="capitalize">  {row.getValue("contactNo")}</div>,
    },
    {
        accessorKey: "emergencyContact",
        header: "Emergency Contact",
        cell: ({row}) => (
            <div className="capitalize">
                {row.getValue("dob")}
            </div>
        ),
    },
    {
        accessorKey: "guardian",
        header: "Guardian",
        cell: ({row}) => <div className="capitalize">{row.getValue("guardian")}</div>,
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
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            const data = row.original;
            const [isDialogOpen, setIsDialogOpen] = useState(false);

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
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(data.employeeCode)}>
                            Copy Employee Code
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <Link to={`/form/employee/update-${data.employeeCode}`}>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(data.employeeCode)}>Update
                                Employee</DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem onClick={()=>{deleteEmployee(data.employeeCode)}}>Delete Employee</DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>{alert("sdfsdfsdfsdf")}}>View Image</DropdownMenuItem>

                        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <Dialog.Panel className="w-full max-w-md p-6 bg-white rounded">
                                    <Dialog.Title className="text-lg font-medium">Employee Image</Dialog.Title>
                                    <Dialog.Description className="mt-2">
                                        {/*{employeeImage ? (*/}
                                        {/*    <img src={employeeImage} alt="Employee" className="w-full h-auto" />*/}
                                        {/*) : (*/}
                                        {/*    <p>No image available</p>*/}
                                        {/*)}*/}
                                    </Dialog.Description>
                                    <div className="mt-4">
                                        <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
                                    </div>
                                </Dialog.Panel>
                            </div>
                        </Dialog>


                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];