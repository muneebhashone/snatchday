import { useState } from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { X, PlusCircle } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Control } from 'react-hook-form';

interface FilterData {
  _id: string;
  name: string;
  value: string[];
}

interface ProductAttributesFieldProps {
  control: Control<any>;
  name: string;
  filtersArray: FilterData[];
  selectedFilters: Record<string, string[]>;
  setSelectedFilters: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
}

const ProductAttributesField = ({
  control,
  name,
  filtersArray,
  selectedFilters,
  setSelectedFilters,
}: ProductAttributesFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Product Filters</FormLabel>
          <FormDescription>
            Select product attributes and values
          </FormDescription>
          
          <div className="space-y-4">
            {/* Add filter button & dropdown */}
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Attributes</h3>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-1"
                      disabled={Object.keys(selectedFilters).length === filtersArray.length}
                    >
                      <PlusCircle className="h-4 w-4" />
                      Add Attribute
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-0" align="end">
                    <Command>
                      <CommandInput placeholder="Search attributes..." />
                      <CommandEmpty>No attributes found.</CommandEmpty>
                      <CommandGroup className="max-h-48 overflow-auto">
                        {filtersArray
                          .filter(filter => !selectedFilters.hasOwnProperty(filter.name))
                          .map((filter) => (
                            <CommandItem
                              key={filter._id}
                              value={filter.name}
                              onSelect={() => {
                                setSelectedFilters(prev => {
                                  const newFilters = {...prev};
                                  // Initialize with empty array
                                  newFilters[filter.name] = [];
                                  // Update form field
                                  field.onChange(newFilters);
                                  return newFilters;
                                });
                              }}
                            >
                              {filter.name}
                            </CommandItem>
                          ))
                        }
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            
              {/* Selected filters with their radio button selections */}
              {Object.keys(selectedFilters).length > 0 ? (
                <div className="space-y-4 border rounded-md p-3">
                  {Object.entries(selectedFilters).map(([filterName, values]) => {
                    // Find the corresponding filter object to get available values
                    const filter = filtersArray.find(f => f.name === filterName);
                    if (!filter) return null;
                    
                    return (
                      <div key={filterName} className="space-y-2 pb-3 border-b last:border-b-0 last:pb-0">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-medium">{filterName}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              setSelectedFilters(prev => {
                                const newFilters = {...prev};
                                delete newFilters[filterName];
                                field.onChange(newFilters);
                                return newFilters;
                              });
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          {filter.value.map((value: string) => {
                            // Check if this value is the selected one
                            const isSelected = values[0] === value;
                            
                            return (
                              <div key={value} className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  id={`${filterName}-${value}`}
                                  name={`filter-${filterName}`}
                                  className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                  checked={isSelected}
                                  onChange={() => {
                                    setSelectedFilters(prev => {
                                      const newFilters = {...prev};
                                      // Set single value
                                      newFilters[filterName] = [value];
                                      field.onChange(newFilters);
                                      return newFilters;
                                    });
                                  }}
                                />
                                <label 
                                  htmlFor={`${filterName}-${value}`}
                                  className="text-sm font-medium leading-none cursor-pointer"
                                >
                                  {value}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center p-4 border rounded-md text-muted-foreground text-sm">
                  No attributes selected. Click &quot;Add Attribute&quot; to select product attributes.
                </div>
              )}
            </div>
          </div>
          
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProductAttributesField; 