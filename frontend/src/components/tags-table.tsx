import useTagsQuery from "@/hooks/use-tags-query";
import Loader from "@/components/loader";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Tag } from "@/api/tags";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { EditIcon } from "lucide-react";
import { useModalStore } from "@/stores/use-modal-store";

function TagsTable() {
  const setActiveModal = useModalStore((state) => state.setActiveModal);
  const { data: tagsData = [], isError, isPending } = useTagsQuery();

  const columns: ColumnDef<Pick<Tag, "id" | "name">>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const tag = row.original;
        return <Badge variant="secondary">{tag.name}</Badge>;
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const tag = row.original;
        return (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-primary/10"
            onClick={() => setActiveModal("update:tag", tag)}
          >
            <EditIcon className="h-3 w-3 text-primary" />
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data: tagsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
  });

  if (isPending) return <Loader />;
  if (isError) return;
  console.log("TagsTable");
  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
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
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default TagsTable;
