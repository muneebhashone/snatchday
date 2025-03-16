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
import { useDeleteCategory, useGetCategories } from '@/hooks/api'
import { CreateCategoryDialog } from './CreateCategoryDialog'
import { EditCategoryDialog } from './EditCategoryDialog'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'  
interface CategoryType  {
  _id: string;
  name: string;
  description: string;
  displayName: string;
  image: string;
  parentCategory: string | null;
  shop: boolean;
  above: boolean;
  filters: string[];
  subCategories: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const Categories = () => {
  // Fetch categories using the hook
  const { data : getCategories, isLoading, isError } = useGetCategories()
  const categories = getCategories?.data.categories
  const { mutate: deleteCategory } = useDeleteCategory()
  const queryClient = useQueryClient()
  const handleDelete = (id: string) => {
    deleteCategory(id, {
      onSuccess: () => {
        toast.success('Category deleted successfully');
        queryClient.invalidateQueries({ queryKey: ['categories'] });
      },
      onError: (error) => {
        toast.error('Failed to delete category');
        console.error(error);
      },
    });
  }
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <div className='flex gap-2'>
          <CreateCategoryDialog />
          {/* <Button variant="ghost" size="icon" className="bg-red-500 text-white hover:bg-red-600 transition-colors">
            <Delete className='w-4 h-4'/>
          </Button> */}
        </div>
      </div>

      <div className="bg-white rounded-md shadow-sm">
        {isLoading ? (
          <div className="p-8 text-center">Loading categories...</div>
        ) : isError ? (
          <div className="p-8 text-center text-red-500">Error loading categories</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {/* <TableHead className="w-[40px]">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableHead> */}
                  <TableHead>Name</TableHead>
                  <TableHead>Display Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories?.map((category: CategoryType) => (
                  <TableRow key={category._id} className="hover:bg-gray-50">
                    {/* <TableCell>
                      <input type="checkbox" className="rounded border-gray-300" />
                    </TableCell> */}
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.displayName}</TableCell>
                    <TableCell className='max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap'>{category.description}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {category.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(category.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <EditCategoryDialog category={category} />
                      <Button onClick={() => handleDelete(category._id)} variant="ghost" size="icon" className="text-red-500 hover:text-red-600 transition-colors">
                        <Trash className='w-4 h-4' />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {!categories?.length && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No categories found
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

export default Categories