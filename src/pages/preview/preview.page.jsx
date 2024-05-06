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
import {Minus, Plus} from "lucide-react";
import {Bar, BarChart, ResponsiveContainer} from "recharts";

import {Button} from "@/components/ui/button";



export default function PreviewPage() {
    const [data, setData] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [rowSelection, setRowSelection] = useState({});

    const {id} = useParams()
    let columns = []
    let title = ""
    let url = ""


    if (id === "customer") {
        columns = customerColumns
        title = "Customer Preview"
        url = "http://localhost:8080/app/customer/getAll"

    } else if (id === "employee") {
        columns = employeeColumns
        title = "Employee Preview"
        url = "http://localhost:8080/app/employee/getAll"

    } else if (id === "supplier") {
        columns = supplierColumns
        title = "Supplier Preview"
        url = "http://localhost:8080/app/supplier/getAll"

    } else if (id === "sale") {
        columns = saleColumns
        title = "Sale Preview"
        url = "http://localhost:8080/app/sale/getAll"
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                if (response.status === 200) {
                    setData(response.data);
                }
            } catch (error) {
                console.error('Error fetching data from backend:', error);
            }
        };

        fetchData();
    }, []);


    const table = useReactTable({
        data,
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
            <div className="absolute top-0 left-1/2 flex gap-x-5 -ms-32 mt-4 opacity-80">
                <LuView size="45"/>
                <h1 className="text-4xl ">{title}</h1>
            </div>
            <ScrollArea className=" form w-5/6 h-5/6 ms-24  mt-28 whitespace-nowrap rounded-md border p-4">

                <div className="flex items-center py-4 mb-10 z-50">
                    <Input
                        placeholder="Filter codes..."
                        value={(table.getColumn("customerCode")?.getFilterValue()) ?? ""}
                        onChange={(event) =>
                            table.getColumn("customerCode")?.setFilterValue(event.target.value)
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

                <div className="w-full h-full ">
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



        </>
    )
}
