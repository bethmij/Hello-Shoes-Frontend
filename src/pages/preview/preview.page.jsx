import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {ChevronDown} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {
    Table,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {TableBody, TableCell} from "@/components/ui/table.jsx";
import axios from "axios";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.jsx";
import {LuView} from "react-icons/lu";
import {customerColumns} from "./predviewDetail/customer.jsx";
import {useParams} from "react-router-dom";
import {employeeColumns} from "./predviewDetail/employee.jsx";
import {supplierColumns} from "./predviewDetail/supplier.jsx";
import {saleColumns} from "./predviewDetail/sale.jsx";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {fetchData} from "../cart/cardDetail/fetchData.jsx";
import aiGeneratedImage from '../../assets/img/ai-generated-8181045.jpg';
import CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';
import {inventoryColumns} from "./predviewDetail/inventory.jsx";
import Tables from "../../components/shared/table.jsx";

let columnID;

export default function PreviewPage() {
    const [previewData, setPreviewData] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [rowSelection, setRowSelection] = useState({});
    const [img, setImg] = useState()

    const {id} = useParams()
    let columns = []
    let title = ""
    let url = ""


    if (id === "customer") {
        columns = customerColumns
        title = "Customer Preview"
        url = "http://localhost:8080/app/customer/getAll"
        columnID = "customerCode"


    } else if (id === "employee") {
        columns = employeeColumns
        title = "Employee Preview"
        url = "http://localhost:8080/app/employee/getAll"
        columnID = "employeeCode"

    } else if (id === "supplier") {
        columns = supplierColumns
        title = "Supplier Preview"
        url = "http://localhost:8080/app/supplier/getAll"
        columnID = "supplierCode"

    } else if (id === "sale") {
        columns = saleColumns
        title = "Sale Preview"
        url = "http://localhost:8080/app/sale/getAll"
    }
    else if (id === "inventory") {
        columns = inventoryColumns
        title = "Inventory Preview"
        url = "http://localhost:8080/app/inventory/getAll"
    }

    useEffect(() => {
        fetchData(url).then(data => {
            setPreviewData(data)
            // let image = data[1].profilePic.split(',')[1];

        })

    }, [url]);


    const table = useReactTable({
        data: previewData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });


    return (
        <>

            <div className="absolute top-0 left-1/2 flex gap-x-5 -ms-32 mt-4 opacity-80 ">
                <LuView size="45"/>
                <h1 className="text-4xl ">{title}</h1>
            </div>

            <div className="h-[88vh] w-[80vw] flex-col z-50 ms-16 mt-28 ">
                <div className="flex justify-around w-4/6 ms-72 items-center  z-50 ">
                    <Input
                        placeholder="Filter codes..."
                        value={(table.getColumn(columnID)?.getFilterValue()) ?? ""}
                        onChange={(event) =>
                            table.getColumn(columnID)?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    <DropdownMenu className=" ">
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ms-20 z-50">
                                Columns <ChevronDown className="  h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <ScrollArea className=" form w-[85vw] h-[75vh] mt-10 whitespace-nowrap rounded-md border p-3   ">
                    <div className="w-full h-full">
                        {/*<Tables columns={columns} data={previewData}/>*/}
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id} className="text-center text-xl  text-metal ">
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            className="text-center text-lg  text-opacity-80"
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center text-xl"
                                        >
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex items-center justify-end space-x-2 py-4">
                        <div className="flex-1 text-m text-muted-foreground">
                            {table.getFilteredSelectedRowModel().rows.length} of{" "}
                            {table.getFilteredRowModel().rows.length} row(s) selected.
                        </div>
                        <div className="space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                Next
                            </Button>
                        </div>
                    </div>

                    <ScrollBar orientation="horizontal"/>
                </ScrollArea>
            </div>
        </>
    )
}
