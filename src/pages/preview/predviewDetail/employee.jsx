import React, {useState, useEffect} from 'react';
import {ArrowUpDown, MoreHorizontal} from 'lucide-react';
import {Checkbox} from '@/components/ui/checkbox';
import {Button} from '@/components/ui/button';
import noImageAvailable from '../../../assets/img/no-image-available.jpg';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Link} from 'react-router-dom';
import {deleteEntity, getDetails} from '../../cart/cardDetail/fetchData';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import {isAdmin} from "../../auth/authentication.jsx";

const deleteEmployee = (employeeCode) => {
    deleteEntity("employee", employeeCode,"Employee")
}


const EmployeeImageDialog = ({isOpen, onClose, employeeCode}) => {
    const [employeeImage, setEmployeeImage] = useState('');

    useEffect(() => {
        if (isOpen) {
            fetchEmployeeImage(employeeCode);
        }
    }, [isOpen, employeeCode]);

    const fetchEmployeeImage = async (code) => {
        try {
            const employee = await getDetails('employee', code);
            setEmployeeImage(employee.profilePic || noImageAvailable);
        } catch (error) {
            console.error('Error fetching employee image:', error);
            setEmployeeImage(noImageAvailable);
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogDescription>
                        {/*{employeeImage ? (*/}
                            <img src={employeeImage} alt="Employee Image" className="w-full h-auto"/>
                        {/*) : (*/}
                        {/*    <img src={noImageAvailable} alt="Employee Image" className="w-full h-auto"/>*/}
                        {/*)}*/}
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4 flex justify-center items-center">
                    <Button onClick={onClose}>Close</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

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
        header: ({column}) => (
            <Button
                className="text-center text-xl text-metal"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Employee Code
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>
        ),
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
        cell: ({row}) => <div className="capitalize">{row.getValue("status")}</div>,
    },
    {
        accessorKey: "designation",
        header: "Designation",
        cell: ({row}) => <div className="capitalize">{row.getValue("designation")}</div>,
    },
    {
        accessorKey: "attachedBranch",
        header: "Attached Branch",
        cell: ({row}) => <div className="capitalize">{row.getValue("attachedBranch")}</div>,
    },
    {
        accessorKey: "dob",
        header: "DOB",
        cell: ({row}) => <div className="capitalize">{row.getValue("dob")}</div>,
    },
    {
        accessorKey: "dateJointed",
        header: "Date Jointed",
        cell: ({row}) => <div className="capitalize">{row.getValue("dateJointed")}</div>,
    },
    {
        accessorKey: "accessRole",
        header: ({column}) => (
            <Button
                className="text-center text-xl text-metal"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Access Role
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>
        ),
        cell: ({row}) => <div className="capitalize">{row.getValue("accessRole")}</div>,
    },
    {
        accessorKey: "contactNo",
        header: "Contact",
        cell: ({row}) => <div className="capitalize">{row.getValue("contactNo")}</div>,
    },
    {
        accessorKey: "emergencyContact",
        header: "Emergency Contact",
        cell: ({row}) => <div className="capitalize">{row.getValue("emergencyContact")}</div>,
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
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [isDialogOpen, setIsDialogOpen] = useState(false);

            return (
                <div>
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
                            {isAdmin() &&
                                <Link to={`/form/employee/update-${data.employeeCode}`}>
                                    <DropdownMenuItem>Update Employee</DropdownMenuItem>
                                </Link>
                            }
                            {isAdmin() &&
                                <DropdownMenuItem onClick={() => deleteEmployee(data.employeeCode)}>
                                    Delete Employee
                                </DropdownMenuItem>
                            }

                            <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                                View Image
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <EmployeeImageDialog
                        isOpen={isDialogOpen}
                        onClose={() => setIsDialogOpen(false)}
                        employeeCode={data.employeeCode}
                    />
                </div>
            );
        },
    },
];
