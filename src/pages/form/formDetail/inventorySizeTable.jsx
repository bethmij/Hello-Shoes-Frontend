
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button.jsx";
import { AiOutlineDelete } from "react-icons/ai";

export const sizeTableColumns = (tableData, setTableData) => [
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
        accessorKey: "size",
        header: "Item Size",
        cell: ({row}) => <div className="capitalize">{row.getValue("size")}</div>,
    },
      {
        accessorKey: "itemQuantity",
        header: "Quantity",
        cell: ({row}) => <div className="capitalize">  {row.getValue("itemQuantity")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            const data = row.original;

            const handleDelete = () => {
                setTableData(prevData => prevData.filter(item => item.size !== data.size));
            };
            return (
                <Button onClick={handleDelete}>
                    <AiOutlineDelete size="25" />
                </Button>
            );
        },
    },
];