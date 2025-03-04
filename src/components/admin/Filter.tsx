'use client';

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { useDeleteFilter, useGetFilters, useGetCategories } from '@/hooks/api'
import { CreateFilterDialog } from './CreateFilterDialog'
import { EditFilterDialog } from './EditFilterDialog'
import { toast } from 'sonner'

interface Category {
  _id: string;
  name: string;
  displayName: string;
}

interface Filter {
  _id: string;
  name: string;
  value: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
}

const Filter = () => {
  // Fetch filters and categories using the hooks
  const { data: getFilters, isLoading, isError } = useGetFilters()
  const { data: getCategories } = useGetCategories()
  const { mutate: deleteFilter } = useDeleteFilter()
  
  const filters = getFilters?.data
  const categories = getCategories?.data.categories || []
  console.log("categories", categories)
  console.log("filters[9]", filters)

  // Function to get category name by ID
  const getCategoryName = (categoryId: string) => {
    console.log("categoryId", categoryId)
    const category = categories.find((cat: Category) => cat._id === categoryId)
    return category ? category.displayName || category.name : 'Unknown Category'
  }

  const handleDelete = (id: string) => {
    deleteFilter(id, {
      onSuccess: () => {
        toast.success("Filter deleted successfully")
      },
      onError: (error) => {
        toast.error("Failed to delete filter")
        console.error(error)
      }
    })
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Filters</h1>
        <div className='flex gap-2'>
          <CreateFilterDialog />
        </div>
      </div>

      <div className="bg-white rounded-md shadow-sm">
        {isLoading ? (
          <div className="p-8 text-center">Loading filters...</div>
        ) : isError ? (
          <div className="p-8 text-center text-red-500">Error loading filters</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Values</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filters?.map((filter: Filter) => (
                  <TableRow key={filter._id} className="hover:bg-gray-50">
                    <TableCell>{filter.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {filter.value.map((value, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                          >
                            {value}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{getCategoryName(filter.category)}</TableCell>
                    <TableCell>{new Date(filter.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <EditFilterDialog filter={filter} />
                      <Button 
                        onClick={() => handleDelete(filter._id)}
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {!filters?.length && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No filters found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Filter