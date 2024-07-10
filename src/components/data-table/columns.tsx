import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "../../@/components/ui/button";
import { Checkbox } from "../../@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../@/components/ui/dropdown-menu";

import { Order } from "../../models/Order";
import { isDate } from "../../lib/isDate";

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
      const date = isDate(row.getValue("orderDate") as Date)
        ? (row.getValue("orderDate") as Date).toLocaleDateString()
        : (row.getValue("orderDate") as Date).toString();
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
      const date = isDate(row.getValue("productionDate") as Date)
        ? (row.getValue("productionDate") as Date).toLocaleDateString()
        : (row.getValue("productionDate") as Date).toString();
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
      const date = isDate(row.getValue("supplyDate") as Date)
        ? (row.getValue("supplyDate") as Date).toLocaleDateString()
        : (row.getValue("supplyDate") as Date).toString();
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
      const date = isDate(row.getValue("coordinateDate") as Date)
        ? (row.getValue("coordinateDate") as Date).toLocaleDateString()
        : (row.getValue("coordinateDate") as Date).toString();
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
