import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "../@/components/ui/button";
import { Checkbox } from "../@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../@/components/ui/dropdown-menu";
import { Input } from "../@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../@/components/ui/table";
import { Order } from "../models/Order";
import { useEffect } from "react";

// const data: Order[] = [
//   {
//     customerName: "GEGE",
//     customerCode: 1,
//     orderDate: new Date(Date.now()),
//     docNum: 11,
//     customerOrder: "344/HH",
//     total: 1130,
//     agentName: "goku",
//     createdBy: "tb",
//     notes: "nothing",
//     city: "Haifa",
//     driver: "hamido",
//     urgency: "urgenttttt",
//     hh: "550",
//     orderSymbol: "32GT",
//     productionDate: new Date(Date.now()),
//     supplyDate: new Date(Date.now()),
//     coordinateDate: new Date(Date.now()),
//     review: "good",
//   },
//   {
//     customerName: "DEDEEE",
//     customerCode: 2,
//     orderDate: new Date(Date.now()),
//     docNum: 22,
//     customerOrder: "344/HH",
//     total: 1130,
//     agentName: "goku",
//     createdBy: "tb",
//     notes: "nothing",
//     city: "Haifa",
//     driver: "hamido",
//     urgency: "urgenttttt",
//     hh: "550",
//     orderSymbol: "32GT",
//     productionDate: new Date(Date.now()),
//     supplyDate: new Date(Date.now()),
//     coordinateDate: new Date(Date.now()),
//     review: "good",
//   },
// ];

export const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="mx-4"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="mx-4"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "rowNum",
    meta: "שורה",
    header: ({ column }) => {
      return (
        <Button
          dir="rtl"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          שורה
          <CaretSortIcon direction={"rtl"} className="ml-2 h-4 w-4 mx-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="px-4">{row.index + 1}</div>,
  },
  {
    accessorKey: "customerName",
    meta: "שם לקוח",
    header: ({ column }) => {
      return (
        <Button
          dir="rtl"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          שם לקוח
          <CaretSortIcon direction={"rtl"} className="ml-2 h-4 w-4 mx-1" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("customerName") as string;
      return (
        <div className="capitalize px-4">
          {value !== undefined && value !== null ? value : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "customerCode",
    meta: "קוד לקוח",
    header: ({ column }) => {
      return (
        <Button
          dir="rtl"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          קוד לקוח
          <CaretSortIcon direction={"rtl"} className="ml-2 h-4 w-4 mx-1" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("customerCode") as string;
      return (
        <div className="capitalize px-4">
          {value !== undefined && value !== null ? value : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "orderDate",
    meta: "תאריך הפקה",
    header: ({ column }) => {
      return (
        <Button
          dir="rtl"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          תאריך הפקה
          <CaretSortIcon direction={"rtl"} className="ml-2 h-4 w-4 mx-1" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = (row.getValue("orderDate") as Date).toLocaleDateString();
      return date !== "Invalid Date" && <div className="px-4">{date}</div>;
    },
  },
  {
    accessorKey: "docNum",
    meta: "מס׳ מסמך",
    header: ({ column }) => {
      return (
        <Button
          dir="rtl"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          מס׳ מסמך
          <CaretSortIcon direction={"rtl"} className="ml-2 h-4 w-4 mx-1" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("docNum") as string;
      return (
        <div className="capitalize px-4">
          {value !== undefined && value !== null ? value : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "customerOrder",
    meta: "הזמנת לקוח",
    header: ({ column }) => {
      return (
        <Button
          dir="rtl"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          הזמנת לקוח
          <CaretSortIcon direction={"rtl"} className="ml-2 h-4 w-4 mx-1" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("customerOrder") as string;
      return (
        <div className="capitalize px-4">
          {value !== undefined && value !== null ? value : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    meta: "סה״כ",
    header: ({ column }) => {
      return (
        <Button
          dir="rtl"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          סה״כ
          <CaretSortIcon direction={"rtl"} className="ml-2 h-4 w-4 mx-1" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("total") as string;
      return (
        <div className="capitalize px-4">
          {value !== undefined && value !== null ? value : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "agentName",
    meta: "שם סוכן",
    header: ({ column }) => {
      return (
        <Button
          dir="rtl"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          שם סוכן
          <CaretSortIcon direction={"rtl"} className="ml-2 h-4 w-4 mx-1" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("agentName") as string;
      return (
        <div className="capitalize px-4">
          {value !== undefined && value !== null ? value : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "createdBy",
    meta: "הופק ע״י",
    header: ({ column }) => {
      return (
        <Button
          dir="rtl"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          הופק ע״י
          <CaretSortIcon direction={"rtl"} className="ml-2 h-4 w-4 mx-1" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("createdBy") as string;
      return (
        <div className="capitalize px-4">
          {value !== undefined && value !== null ? value : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "notes",
    id: "notes",
    meta: "הערות",
    header: ({ column }) => {
      return (
        <Button
          dir="rtl"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          הערות
          <CaretSortIcon direction={"rtl"} className="ml-2 h-4 w-4 mx-1" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("notes") as string;
      return (
        <div className="capitalize px-4">
          {value !== undefined && value !== null ? value : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "city",
    meta: "עיר",
    header: ({ column }) => {
      return (
        <Button
          dir="rtl"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          עיר
          <CaretSortIcon direction={"rtl"} className="ml-2 h-4 w-4 mx-1" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("city") as string;
      return (
        <div className="capitalize px-4">
          {value !== undefined && value !== null ? value : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "driver",
    meta: "מרכיב",
    header: ({ column }) => {
      return (
        <Button
          dir="rtl"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          מרכיב
          <CaretSortIcon direction={"rtl"} className="ml-2 h-4 w-4 mx-1" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("driver") as string;
      return (
        <div className="capitalize px-4">
          {value !== undefined && value !== null ? value : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "urgency",
    meta: "דחיפות",
    header: ({ column }) => {
      return (
        <Button
          dir="rtl"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          דחיפות
          <CaretSortIcon direction={"rtl"} className="ml-2 h-4 w-4 mx-1" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("urgency") as string;
      return (
        <div className="capitalize px-4">
          {value !== undefined && value !== null ? value : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "hh",
    meta: "ה״ה",
    header: ({ column }) => {
      return (
        <Button
          dir="rtl"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ה״ה
          <CaretSortIcon direction={"rtl"} className="ml-2 h-4 w-4 mx-1" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("hh") as string;
      return (
        <div className="capitalize px-4">
          {value !== undefined && value !== null ? value : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "orderSymbol",
    meta: "סימון הזמנה",
    header: ({ column }) => {
      return (
        <Button
          dir="rtl"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          סימון הזמנה
          <CaretSortIcon direction={"rtl"} className="ml-2 h-4 w-4 mx-1" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("orderSymbol") as string;
      return (
        <div className="capitalize px-4">
          {value !== undefined && value !== null ? value : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "productionDate",
    meta: "ת. כניסה ליצור",
    header: ({ column }) => {
      return (
        <Button
          dir="rtl"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ת. כניסה ליצור
          <CaretSortIcon direction={"rtl"} className="ml-2 h-4 w-4 mx-1" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = (
        row.getValue("productionDate") as Date
      ).toLocaleDateString();
      return date !== "Invalid Date" && <div className="px-4">{date}</div>;
    },
  },
  {
    accessorKey: "supplyDate",
    meta: "תאריך משלוח למחסן",
    header: ({ column }) => {
      return (
        <Button
          dir="rtl"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          תאריך משלוח למחסן
          <CaretSortIcon direction={"rtl"} className="ml-2 h-4 w-4 mx-1" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = (row.getValue("supplyDate") as Date).toLocaleDateString();
      return date !== "Invalid Date" && <div className="px-4">{date}</div>;
    },
  },
  {
    accessorKey: "coordinateDate",
    meta: "תאריך תיאום",
    header: ({ column }) => {
      return (
        <Button
          dir="rtl"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          תאריך תיאום
          <CaretSortIcon direction={"rtl"} className="ml-2 h-4 w-4 mx-1" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = (
        row.getValue("coordinateDate") as Date
      ).toLocaleDateString();
      return date !== "Invalid Date" && <div className="px-4">{date}</div>;
    },
  },
  {
    accessorKey: "review",
    meta: "חוות דעת",
    header: ({ column }) => {
      return (
        <Button
          dir="rtl"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          חוות דעת
          <CaretSortIcon direction={"rtl"} className="ml-2 h-4 w-4 mx-1" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("review") as string;
      return (
        <div className="capitalize px-4">
          {value !== undefined && value !== null ? value : ""}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original;
      if (order.customerCode === undefined) {
        return <></>;
      } else {
        return (
          <DropdownMenu dir="rtl">
            <DropdownMenuTrigger asChild dir="rtl">
              <Button variant="ghost" className="h-8 w-8 p-0" dir="rtl">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  order.customerCode !== undefined &&
                  navigator.clipboard.writeText(order.customerCode.toString())
                }
              >
                Copy order ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View order details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    },
  },
];

interface DataTableProps {
  data: Order[];
}

export function DataTable({ data }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const getColVisibility = () => {
    let visibilityObject = {
      notes: false,
    };
    const visibility = localStorage.getItem("columns_visibility");
    if (visibility) {
      visibilityObject = JSON.parse(visibility);
    }
    return visibilityObject;
  };

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(getColVisibility());
  const [rowSelection, setRowSelection] = React.useState({});

  useEffect(() => {
    localStorage.setItem(
      "columns_visibility",
      JSON.stringify(columnVisibility)
    );
  }, [columnVisibility]);

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
    initialState: {
      pagination: {
        pageSize: 10000,
      },
    },
  });

  return (
    <div className="w-full" dir="rtl">
      <div className="flex items-center py-4">
        <Input
          placeholder="חיפוש לקוח..."
          value={
            (table.getColumn("customerName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("customerName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto mx-6">
              עמודות <ChevronDownIcon className="ml-2 h-4 w-4 mx-1" />
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
                    className=""
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.columnDef.meta as string}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border mt-1">
        <div className="h-[74vh] relative overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-gray-200">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id as string}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id as string}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id as string}
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
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4 mx-4">
        <div className="flex-1 text-sm text-muted-foreground mx-4">
          {table.getFilteredSelectedRowModel().rows.length} מ{" "}
          {table.getFilteredRowModel().rows.length} שורות נבחרו.
        </div>
        <div className="space-x-2">
          {/* <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-7"
          >
            לפני
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-7"
          >
            אחרי
          </Button> */}
        </div>
      </div>
    </div>
  );
}
