"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "./badge";
import { Command, CommandGroup, CommandItem } from "./command";
import { Command as CommandPrimitive } from "cmdk";

interface MultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  items?: string[];
}

export function MultiSelect({
  value,
  onChange,
  placeholder = "Select items...",
  items = [],
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = (item: string) => {
    onChange(value.filter((i) => i !== item));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "" && value.length > 0) {
          onChange(value.slice(0, -1));
        }
      }
      if (e.key === "Enter" && input.value !== "") {
        e.preventDefault();
        if (!value.includes(input.value)) {
          onChange([...value, input.value]);
          setInputValue("");
        }
      }
    }
  };

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {value.map((item) => (
            <Badge key={item} variant="secondary" className="hover:bg-secondary">
              {item}
              <button
                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
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
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && inputValue.length > 0 && (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {items
                .filter((item) =>
                  item.toLowerCase().includes(inputValue.toLowerCase())
                )
                .map((item) => (
                  <CommandItem
                    key={item}
                    onSelect={() => {
                      if (!value.includes(item)) {
                        onChange([...value, item]);
                      }
                      setInputValue("");
                    }}
                  >
                    {item}
                  </CommandItem>
                ))}
              {!items.includes(inputValue) && (
                <CommandItem
                  onSelect={() => {
                    onChange([...value, inputValue]);
                    setInputValue("");
                  }}
                >
                  Add &quot;{inputValue}&quot;
                </CommandItem>
              )}
            </CommandGroup>
          </div>
        )}
      </div>
    </Command>
  );
}
