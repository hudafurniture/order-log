import * as React from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
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
import { Button } from "../../@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../@/components/ui/dropdown-menu";
import { Input } from "../../@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../@/components/ui/table";
import { Order } from "../../models/Order";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../@/components/ui/select";
import { getKeyNameByStringValue } from "../../models/Order";
import { columns } from "./columns";

interface DataTableProps {
  data: Order[];
}

export function DataTable({ data }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [searchColumn, setSearchColumn] =
    React.useState<string>("customerName");

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
      <div className="flex  py-4">
        <div className="flex-1">
          <div className="inputContainer flex">
            <Input
              placeholder={`חיפוש ${getKeyNameByStringValue(searchColumn)}...`}
              value={
                (table.getColumn("customerName")?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn("customerName")
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <div className="selectWrapper mr-4">
              <Select
                defaultValue={searchColumn}
                onValueChange={(value: string) => setSearchColumn(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={"בחר נושא חיפוש"} />
                </SelectTrigger>
                <SelectContent>
                  {table
                    .getAllColumns()
                    .filter(
                      (column) =>
                        column.getIsVisible() && column.id !== "rowNum"
                    )
                    .map((column) => {
                      return (
                        <SelectItem
                          key={column.id}
                          value={column.id}
                          className=""
                        >
                          {column.columnDef.meta as string}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex-2">
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
                        column.id === searchColumn
                          ? null
                          : column.toggleVisibility(!!value)
                      }
                    >
                      {column.columnDef.meta as string}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
