import { useState } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Control } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Category {
  _id: string;
  name: string;
  displayName?: string;
}

interface ProductCategoryFieldProps {
  control: Control<any>;
  name: string;
  categories: Category[];
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ProductCategoryField = ({ 
  control, 
  name, 
  categories,
  open,
  setOpen
}: ProductCategoryFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Product Categories *</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !field.value?.length && "text-muted-foreground"
                  )}
                >
                  {field.value?.length
                    ? `${field.value.length} categories selected`
                    : "Select categories"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search categories..." />
                <CommandEmpty>No categories found.</CommandEmpty>
                <CommandGroup className="max-h-48 overflow-auto">
                  {categories?.map((category) => (
                    <CommandItem
                      key={category._id}
                      value={category.name}
                      onSelect={() => {
                        const currentCategories = field.value || [];
                        const selected = currentCategories.includes(category._id);
                        
                        const updatedCategories = selected
                          ? currentCategories.filter(id => id !== category._id)
                          : [...currentCategories, category._id];
                        
                        field.onChange(updatedCategories);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          field.value?.includes(category._id) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {category.displayName || category.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          
          {field.value?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {field.value.map(categoryId => {
                const category = categories?.find(c => c._id === categoryId);
                return category ? (
                  <div 
                    key={categoryId}
                    className="flex items-center bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm"
                  >
                    {category.displayName || category.name}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1 hover:bg-transparent"
                      onClick={() => {
                        field.onChange(field.value.filter(id => id !== categoryId));
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : null;
              })}
            </div>
          )}
          
          <FormDescription>
            Select one or more categories for this product
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProductCategoryField; 