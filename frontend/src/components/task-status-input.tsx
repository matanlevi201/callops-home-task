import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TaskStatus } from "@/api/tasks";

interface TaskStatusInputProps {
  selectedStatus: TaskStatus;
  onSelect: (staus: TaskStatus) => Promise<void> | void;
}

function formatEnumLabel(value: string): string {
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}
function TaskStatusInput({ selectedStatus, onSelect }: TaskStatusInputProps) {
  console.log("TaskStatusInput");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedStatus);
  const statuses = Object.values(TaskStatus);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {formatEnumLabel(value ?? selectedStatus) ?? "Select status..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search status..." className="h-9" />
          <CommandList>
            <CommandEmpty>No statuses found.</CommandEmpty>
            <CommandGroup>
              {statuses.map((status) => (
                <CommandItem
                  key={status}
                  value={status}
                  onSelect={async (currentValue) => {
                    await onSelect(currentValue as TaskStatus);
                    setValue(currentValue as TaskStatus);
                    setOpen(false);
                  }}
                >
                  {formatEnumLabel(status)}
                  <Check
                    className={cn(
                      "ml-auto",
                      status === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default TaskStatusInput;
