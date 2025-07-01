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
import { useMemo } from "react";
import type { Tag } from "@/api/tags";
import { Badge } from "./ui/badge";

function TagsTable() {
  console.log("TagsTable");
  const { data: tags, isError, isPending } = useTagsQuery();
  const tagsData = useMemo(() => {
    if (!tags?.length) return [];
    return tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
    }));
  }, [tags]);

  const columns: ColumnDef<Pick<Tag, "id" | "name">>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const tag = row.original;
        return <Badge variant="secondary">{tag.name}</Badge>;
      },
    },
  ];

  const table = useReactTable({
    data: tagsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isPending) return <Loader />;
  if (isError) return;
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
