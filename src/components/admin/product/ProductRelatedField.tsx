import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Control } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Product {
  _id: string;
  name: string;
}

interface ProductRelatedFieldProps {
  control: Control<any>;
  name: string;
  products: Product[];
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ProductRelatedField = ({ 
  control, 
  name, 
  products,
  open,
  setOpen
}: ProductRelatedFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Related Products</FormLabel>
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
                    ? `${field.value.length} products selected`
                    : "Select related products"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search products..." />
                <CommandEmpty>No products found.</CommandEmpty>
                <CommandGroup className="max-h-48 overflow-auto">
                  {products?.map((product) => (
                    <CommandItem
                      key={product._id}
                      value={product.name}
                      onSelect={() => {
                        const currentProducts = field.value || [];
                        const selected = currentProducts.includes(product._id);
                        
                        const updatedProducts = selected
                          ? currentProducts.filter(id => id !== product._id)
                          : [...currentProducts, product._id];
                        
                        field.onChange(updatedProducts);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          field.value?.includes(product._id) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {product.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          
          {field.value?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {field.value.map((productId: string) => {
                const product = products?.find(p => p._id === productId);
                return product ? (
                  <div 
                    key={productId}
                    className="flex items-center bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm"
                  >
                    {product.name}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1 hover:bg-transparent"
                      onClick={() => {
                        field.onChange(field.value.filter((id: string) => id !== productId));
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
            Products that are related to this one and may be shown together
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProductRelatedField; 