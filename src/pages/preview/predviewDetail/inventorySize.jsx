
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button.jsx";
import { AiOutlineDelete } from "react-icons/ai";

export const tableColumns = (tableData, setTableData) => [

    {
        accessorKey: "size",
        header: "Item Size",
        cell: ({row}) => <div>{row.getValue("size")}</div>,
    },
      {
        accessorKey: "quantity",
        header: "Quantity",
        cell: ({row}) => <div>  {row.getValue("quantity")}</div>,
    }
];