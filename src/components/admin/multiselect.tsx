import * as React from "react";
import { X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function CustomMultiSelect({
  options,
  selected = [],
  onChange,
  placeholder = "Select items...",
  emptyMessage = "No results found.",
  className,
}) {
  const [open, setOpen] = React.useState(false);

  // Function to unselect an item (remove from selected array)
  const handleUnselect = (item: string) => {
    const updatedSelected = selected.filter((i) => i !== item);
    console.log(updatedSelected,"updateselected",selected,options)
    onChange(updatedSelected);  // Update selected state
  };

  // Function to select an item (add to selected array)
  const handleSelect = (item: string) => {
    if (!selected.includes(item)) {
      const updatedSelected = [...selected, item]; // Add item to selected array
      onChange(updatedSelected);  // Update selected state
    }
  };

  // Find labels for selected values
  const selectedLabels = selected?.map(
    (value) => options.find((option) => option.value === value)?.label || value
  );

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            role="combobox"
            aria-expanded={open}
            className="flex min-h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <div className="flex flex-wrap gap-1">
              {selected.length > 0 ? (
                selected.map((item) => {
                  const label = options.find((option) => option.value === item)?.label || item;
                  return (
                    <Badge
                      key={item}
                      variant="secondary"
                      className="mr-1 mb-1 px-2 py-1"
                    >
                      {label}
                      <button
                        className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleUnselect(item);
                          }
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onClick={() => handleUnselect(item)}
                      >
                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                      </button>
                    </Badge>
                  );
                })
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command className="max-h-60">
            <CommandInput placeholder="Search..." />
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options?.map((option) => {
                const isSelected = selected.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        handleUnselect(option.value);
                      } else {
                        handleSelect(option.value);
                      }
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <svg
                        className={cn("h-4 w-4")}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="mt-3">
        <p className="text-sm font-medium">Selected items:</p>
        <p className="text-sm">
          {selectedLabels.length > 0
            ? selectedLabels.join(", ")
            : "No items selected"}
        </p>
      </div>
    </div>
  );
}
