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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import type { SuggestedTask } from "@/api/suggested-tasks";
import { useModalStore } from "@/stores/use-modal-store";

interface SuggestedTasksTable {
  suggestedTasks: SuggestedTask[];
}

function SuggestedTasksTable({ suggestedTasks }: SuggestedTasksTable) {
  const setActiveModal = useModalStore((state) => state.setActiveModal);
  const columns: ColumnDef<
    Pick<SuggestedTask, "id" | "description" | "tags">
  >[] = [
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "tags",
      header: "Tags",
      cell: ({ row }) => {
        const suggestedTask = row.original;
        if (!suggestedTask.tags.length) return;
        return (
          <div className="flex flex-wrap gap-1">
            {suggestedTask.tags.map((tag) => (
              <Badge key={tag.id} variant="secondary">
                {tag.name}
              </Badge>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const suggestedTask = row.original;
        return (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-primary/10"
            onClick={() =>
              setActiveModal("update:suggested:task", {
                id: suggestedTask.id,
                description: suggestedTask.description,
                tags: suggestedTask.tags.map((tag) => tag.id),
              })
            }
          >
            <EditIcon className="h-3 w-3 text-primary" />
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data: suggestedTasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
  });

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

export default SuggestedTasksTable;
