import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useCreateFilter, useGetCategories } from "@/hooks/api"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useQueryClient } from "@tanstack/react-query"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Category {
  _id: string;
  name: string;
  displayName: string;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  value: z.array(z.string()).min(1, "At least one value is required"),
  category: z.string().min(1, "Category is required"),
})

export function CreateFilterDialog() {
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState<string[]>([])
  const [currentValue, setCurrentValue] = useState("")
  const { mutate: createFilter } = useCreateFilter()
  const { data: getCategories } = useGetCategories()
  const categories = getCategories?.data.categories || []
  const queryClient = useQueryClient()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      value: [],
      category: "",
    },
  })

  const handleAddValue = () => {
    if (currentValue.trim()) {
      const newValues = [...values, currentValue.trim()]
      setValues(newValues)
      form.setValue('value', newValues)
      setCurrentValue("")
    }
  }

  const handleRemoveValue = (index: number) => {
    const newValues = values.filter((_, i) => i !== index)
    setValues(newValues)
    form.setValue('value', newValues)
  }

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data, "data")
    createFilter({
      name: data.name,
      value: data.value,
      category: data.category
    }, {
      onSuccess: () => {
        toast.success("Filter created successfully")
        setOpen(false)
        queryClient.invalidateQueries({ queryKey: ['filters'] });
        form.reset()
        setValues([])
      },
      onError: (error) => {
        toast.error("Failed to create filter")
        console.error(error)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-white hover:bg-blue-600 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Add Filter
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Filter</DialogTitle>
          <DialogDescription>
            Add a new filter with multiple values
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Filter name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={() => (
                <FormItem>
                  <FormLabel>Values *</FormLabel>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a value"
                      value={currentValue}
                      onChange={(e) => setCurrentValue(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleAddValue()
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={handleAddValue}
                      variant="outline"
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {values.map((value, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-2"
                      >
                        {value}
                        <button
                          type="button"
                          onClick={() => handleRemoveValue(index)}
                          className="text-red-500 hover:text-red-600"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category: Category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.displayName || category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Create Filter
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 