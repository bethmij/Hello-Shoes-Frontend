import {useState, useEffect} from 'react';
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
import Tables from "../../../components/shared/table.jsx";
import {tableColumns} from "./inventorySize.jsx";



const ItemImageDialog = ({isOpen, onClose, itemCode}) => {
    const [itemImage, setItemImage] = useState('');

    useEffect(() => {
        if (isOpen) {
            fetchItemImage(itemCode);
        }
    }, [isOpen, itemCode]);

    const fetchItemImage = async (code) => {
        try {
            const item = await getDetails('inventory', code);
            setItemImage(item.itemPicture || noImageAvailable);
        } catch (error) {
            console.error('Error fetching item image:', error);
            setItemImage(noImageAvailable);
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogDescription>
                        {itemImage ? (
                            <img src={itemImage} alt="Item Image" className="w-full h-auto"/>
                        ) : (
                            <img src={noImageAvailable} alt="Item Image" className="w-full h-auto"/>
                        )}
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4 flex justify-center items-center">
                    <Button onClick={onClose}>Close</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const ItemTable = ({isOpen, onClose, itemCode}) => {
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        if (isOpen) {
            getDetails("inventory","sizes/"+itemCode).then(
                (sizes)=>{setTableData(sizes)}
            )
        }
    }, [isOpen, itemCode]);

    // const fetchItemImage = async (code) => {
    //     try {
    //         const item = await getDetails('inventory', code);
    //         setItemImage(item.itemPicture || noImageAvailable);
    //     } catch (error) {
    //         console.error('Error fetching item image:', error);
    //         setItemImage(noImageAvailable);
    //     }
    // };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogDescription>
                       <Tables columns={tableColumns(tableData,setTableData)} data={tableData}/>
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4 flex justify-center items-center">
                    <Button onClick={onClose}>Close</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export const inventoryColumns = [
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
        accessorKey: "itemCode",
        header: ({column}) => (
            <Button
                className="text-center text-xl text-metal"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Item Code
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>
        ),
        cell: ({row}) => <div className="capitalize">{row.getValue("itemCode")}</div>,
    },
    {
        accessorKey: "itemDesc",
        header: "Item Desc",
        cell: ({row}) => <div className="capitalize">{row.getValue("itemDesc")}</div>,
    },
    {
        accessorKey: "itemQty",
        header: "Item Qty",
        cell: ({row}) => <div className="capitalize">{row.getValue("itemQty")}</div>,
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({row}) => <div className="capitalize">{row.getValue("category")}</div>,
    },
    {
        accessorKey: "supplierCode",
        header: "Supplier Code",
        cell: ({row}) => <div className="capitalize">{row.getValue("supplierCode")}</div>,
    },
    {
        accessorKey: "supplierName",
        header: "Supplier Name",
        cell: ({row}) => <div className="capitalize">{row.getValue("supplierName")}</div>,
    },
    {
        accessorKey: "saleUnitPrice",
        header: " UnitPrice - Sale",
        cell: ({row}) => <div className="capitalize">{row.getValue("saleUnitPrice")}</div>,
    },
    {
        accessorKey: "buyUnitPrice",
        header: "UnitPrice - Buy",
        cell: ({row}) => <div className="capitalize">{row.getValue("buyUnitPrice")}</div>,
    },
    {
        accessorKey: "expectedProfit",
        header: "Expected Profit",
        cell: ({row}) => <div className="capitalize">{row.getValue("expectedProfit")}</div>,
    },
    {
        accessorKey: "profitMargin",
        header: "Profit Margin",
        cell: ({row}) => <div className="capitalize">{row.getValue("profitMargin")}</div>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({row}) => <div className="lowercase">{row.getValue("status")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            const data = row.original;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [isDialogOpen, setIsDialogOpen] = useState(false);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [isTableOpen, setIsTableOpen] = useState(false);
            // eslint-disable-next-line react-hooks/rules-of-hooks


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
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(data.itemCode)}>
                                Copy Item Code
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            {isAdmin() &&
                                <Link to={`/form/inventory/update-${data.itemCode}`}>
                                    <DropdownMenuItem>Update Item</DropdownMenuItem>
                                </Link>
                            }

                            <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                                View Image
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setIsTableOpen(true)}>
                                View Size Chart
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <ItemImageDialog
                        isOpen={isDialogOpen}
                        onClose={() => setIsDialogOpen(false)}
                        itemCode={data.itemCode}
                    />
                    <ItemTable
                        isOpen={isTableOpen}
                        onClose={() => setIsTableOpen(false)}
                        itemCode={data.itemCode}
                    />
                </div>
            );
        },
    },
];
