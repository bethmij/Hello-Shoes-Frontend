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

const deleteUser = async (email) => {
    // alert(email)
    await deleteEntity("user", email, "User")
}


const UserImageDialog = ({isOpen, onClose, email}) => {
    const [userImage, setUserImage] = useState('');

    useEffect(() => {
        if (isOpen) {
            fetchUserImage(email);
        }
    }, [isOpen, email]);

    const fetchUserImage = async (email) => {
        try {
            const user = await getDetails('user', email);
            setUserImage(user.profilePic || noImageAvailable);
        } catch (error) {
            console.error('Error fetching User image:', error);
            setUserImage(noImageAvailable);
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogDescription>
                        {/*{UserImage ? (*/}
                            <img src={userImage} alt="User Image" className="w-full h-auto"/>
                        {/*) : (*/}
                        {/*    <img src={noImageAvailable} alt="User Image" className="w-full h-auto"/>*/}
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

export const userColumns = [
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
        accessorKey: "employeeID",
        header: ({column}) => (
            <Button
                className="text-center text-xl text-metal"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Employee ID
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>
        ),
        cell: ({row}) => <div className="capitalize">{row.getValue("employeeID")}</div>,
    },
    {
        accessorKey: "employeeName",
        header: "Employee Name",
        cell: ({row}) => <div className="capitalize">{row.getValue("employeeName")}</div>,
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({row}) => <div className="capitalize">{row.getValue("role")}</div>,
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({row}) => <div>{row.getValue("email")}</div>,
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
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(data.employeeID)}>
                                Copy User ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>

                            {isAdmin() &&
                                <DropdownMenuItem onClick={() => deleteUser(data.email)}>
                                    Delete User
                                </DropdownMenuItem>
                            }

                            <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                                View Image
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <UserImageDialog
                        isOpen={isDialogOpen}
                        onClose={() => setIsDialogOpen(false)}
                        email={data.email}
                    />
                </div>
            );
        },
    },
];
