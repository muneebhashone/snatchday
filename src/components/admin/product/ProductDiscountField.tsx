import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PlusCircle, AlertCircle } from "lucide-react";
import {
  Control,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  useFormContext,
} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

interface ProductDiscountFieldProps {
  control: Control<any>;
  discountFields: any[];
  append: UseFieldArrayAppend<any, "discounts">;
  remove: UseFieldArrayRemove;
}

const ProductDiscountField = ({
  control,
  discountFields,
  append,
  remove,
}: ProductDiscountFieldProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { watch, formState: { errors } } = useFormContext();
  const productPrice = watch('price');
  
  return (
    <div className="border rounded-md p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Discounts</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setStartDate(null);
            setEndDate(null);
            append({ customerGroup: "BASIC", price: 0 });
          }}
        >
          <PlusCircle className="h-4 w-4 mr-2" /> Add Discount
        </Button>
      </div>

      {errors.discounts && typeof errors.discounts.message === 'string' && (
        <div className="text-destructive text-sm font-medium flex items-center gap-1 bg-destructive/10 p-2 rounded">
          <AlertCircle className="h-4 w-4" />
          {errors.discounts.message}
        </div>
      )}

      {discountFields.map((field, index) => {
        // Get specific errors for this discount item
        const discountError = errors.discounts && 
          Array.isArray(errors.discounts) ? 
          errors.discounts[index] : undefined;
          
        return (
          <div key={field.id} className="space-y-4 border-b pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name={`discounts.${index}.customerGroup`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Group</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select customer group" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="BASIC">Basic</SelectItem>
                        <SelectItem value="VIP">VIP</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`discounts.${index}.price`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Discounted price"
                        onKeyDown={(e) => {
                          if (e.key === "-") {
                            e.preventDefault();
                          }
                        }}
                        {...field}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          field.onChange(value);
                        }}
                        className={productPrice > 0 && field.value > productPrice ? "border-destructive" : ""}
                      />
                    </FormControl>
                    <FormMessage />
                    {productPrice > 0 && field.value > productPrice && (
                      <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Discount price cannot be greater than product price ({productPrice})
                      </p>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name={`discounts.${index}.away`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className="w-full pl-3 text-left font-normal"
                          >
                            {field.value
                              ? format(new Date(field.value), "PPP")
                              : "Pick a start date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) => {
                            field.onChange(date?.toISOString());
                            if (date) {
                              const nextDay = new Date(date);
                              nextDay.setDate(nextDay.getDate() + 1);
                              setStartDate(nextDay);
                            }
                          }}
                          disabled={(date) => {
                            if (endDate) {
                              return (
                                date > new Date(endDate) || date < new Date()
                              );
                            }
                            return date < new Date();
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`discounts.${index}.until`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className="w-full pl-3 text-left font-normal"
                          >
                            {field.value
                              ? format(new Date(field.value), "PPP")
                              : "Pick an end date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) => {
                            field.onChange(date?.toISOString());
                            if (date) {
                              const previousDay = new Date(date);
                              previousDay.setDate(previousDay.getDate() - 1);
                              setEndDate(previousDay);
                            }
                          }}
                          disabled={(date) => {
                            if (startDate) {
                              return (
                                date < new Date(startDate) || date < new Date()
                              );
                            }
                            return date < new Date();
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => remove(index)}
              >
                Remove Discount
              </Button>
            </div>
          </div>
        );
      })}

      {discountFields.length === 0 && (
        <p className="text-sm text-muted-foreground">No discounts added yet.</p>
      )}
    </div>
  );
};

export default ProductDiscountField;
