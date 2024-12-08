import MainTable from "./table";
import { useState } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { defaultData } from "../../../data/table";
import { defaultColumns } from "./column";
import TableToolbar from "./toolbar";
import TablePagination from "./pagination";


type IdeaTableProps = {
  data: any;
};


export default function IdeaTable({data}:IdeaTableProps){

    const table = useReactTable({
        data,
        columns: defaultColumns,
        initialState: {
          pagination: {
            pageIndex: 0,
            pageSize: 5,
          },
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
      });

      return<>
        <TableToolbar table={table} />
      <MainTable table={table} />
      <TablePagination table={table} />
      </>
}