"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { 
  PlusCircle, 
  Trash2, 
  Edit, 
  ChevronDown, 
  ChevronUp,
  Search,
  Plus,
  Delete,
} from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

// Sample data for demonstration
const sampleCategories = [
  { id: 1, name: 'Audio, Video & HiFi', series: 0 },
  { id: 2, name: 'Audio, Video & HiFi > Audio Input/Output Devices', series: 0 },
  { id: 3, name: 'Audio, Video & HiFi > Audio Input/Output Devices > Audio', series: 0 },
  { id: 4, name: 'Audio, Video & HiFi > Audio Input/Output Devices > Headset', series: 0 },
  { id: 5, name: 'Audio, Video & HiFi > Audio Input/Output Devices > Headphones', series: 0 },
  { id: 6, name: 'Audio, Video & HiFi > Audio Input/Output Devices > Speakers', series: 0 },
  { id: 7, name: 'Audio, Video & HiFi > Audio Input/Output Devices > Microphone', series: 0 },
  { id: 8, name: 'Audio, Video & HiFi > DVD/BluRay players/recorders/set-top boxes', series: 0 },
  { id: 9, name: 'Audio, Video & HiFi > DVD/BluRay players/recorders/set-top boxes > DVD players', series: 0 },
  { id: 10, name: 'Audio, Video & HiFi > DVD/BluRay players/recorders/set-top boxes > DVD recorders', series: 0 },
]

// Form validation schema
const categoryFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  description: z.string().optional(),
})

type CategoryFormValues = z.infer<typeof categoryFormSchema>

const defaultValues: Partial<CategoryFormValues> = {
  name: "",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  description: "",
}

const Categories = () => {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [newCategoryName, setNewCategoryName] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const itemsPerPage = 5
  
  // Calculate pagination
  const totalPages = Math.ceil(sampleCategories.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = sampleCategories.slice(startIndex, endIndex)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  const handleSort = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    
    // Add animation for page transition
    const tableBody = document.querySelector('tbody')
    if (tableBody) {
      tableBody.style.opacity = '0'
      tableBody.style.transform = 'translateY(10px)'
      
      setTimeout(() => {
        tableBody.style.opacity = '1'
        tableBody.style.transform = 'translateY(0)'
      }, 300)
    }
  }

  // Form
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues,
  })

  function onSubmit(data: CategoryFormValues) {
    console.log(data)
    // Here you would typically save the category
    setIsDialogOpen(false)
  }
  
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-6"
      >
        <h1 className="text-2xl font-semibold">Categories</h1>
        <div className='flex gap-2'>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="bg-blue-500 text-white hover:bg-blue-600">
                  <Plus className='w-4 h-4' />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                  <DialogDescription>
                    Create a new category for your products.
                  </DialogDescription>
                </DialogHeader>
                
                <Tabs defaultValue="generally" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="generally">Generally</TabsTrigger>
                    <TabsTrigger value="data">Data</TabsTrigger>
                    <TabsTrigger value="design">Design</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="generally" className="space-y-4 py-4">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <div className="w-20 flex-shrink-0">
                              <span className="text-red-500">*</span> name
                            </div>
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <Input placeholder="name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div>
                            <div className="mb-2">Description</div>
                            <FormField
                              control={form.control}
                              name="description"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <div className="border rounded-md">
                                      <div className="flex items-center border-b p-2 gap-1">
                                        <button type="button" className="p-1 hover:bg-gray-100 rounded">
                                          <span className="font-bold">B</span>
                                        </button>
                                        <button type="button" className="p-1 hover:bg-gray-100 rounded">
                                          <span className="italic">I</span>
                                        </button>
                                        <button type="button" className="p-1 hover:bg-gray-100 rounded">
                                          <span className="underline">U</span>
                                        </button>
                                        <span className="mx-1">|</span>
                                        <select className="text-xs border rounded px-1 py-0.5">
                                          <option>Helvetica Neue</option>
                                        </select>
                                      </div>
                                      <textarea 
                                        className="w-full p-2 min-h-[200px] outline-none" 
                                        placeholder="Description"
                                        {...field}
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className="w-20 flex-shrink-0">
                              <span className="text-red-500">*</span> metatag title
                            </div>
                            <FormField
                              control={form.control}
                              name="metaTitle"
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <Input placeholder="metatag title" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className="w-20 flex-shrink-0">
                              meta tag description
                            </div>
                            <FormField
                              control={form.control}
                              name="metaDescription"
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <textarea 
                                      className="w-full p-2 border rounded-md min-h-[80px]" 
                                      placeholder="meta tag description"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className="w-20 flex-shrink-0">
                              metatag keywords
                            </div>
                            <FormField
                              control={form.control}
                              name="metaKeywords"
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <textarea 
                                      className="w-full p-2 border rounded-md min-h-[80px]" 
                                      placeholder="metatag keywords"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button type="submit">Save</Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </TabsContent>
                  
                  <TabsContent value="data" className="py-4">
                    <div className="text-center p-8 text-gray-500">
                      Data configuration options will appear here
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="design" className="py-4">
                    <div className="text-center p-8 text-gray-500">
                      Design configuration options will appear here
                    </div>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
            <Button variant="ghost" size="icon" className="bg-red-500 text-white hover:bg-red-600">
              <Delete className='w-4 h-4'/>
            </Button>
        </div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-md shadow-sm"
      >
        <div className="pb-4 border-b">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="category1">Audio, Video & HiFi</SelectItem>
                    <SelectItem value="category2">Audio Input/Output Devices</SelectItem>
                    <SelectItem value="category3">Headphones</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <div className="relative">
                <Input 
                  placeholder="name" 
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
            <div>
              <Button>Submit</Button>
            </div>
          </div>
        </div>

        <motion.div variants={itemVariants} className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <input type="checkbox" className="rounded border-gray-300" />
                </TableHead>
                <TableHead className="cursor-pointer" onClick={handleSort}>
                  <div className="flex items-center">
                    name
                    {sortDirection === 'asc' ? 
                      <ChevronUp className="ml-1 h-4 w-4" /> : 
                      <ChevronDown className="ml-1 h-4 w-4" />
                    }
                  </div>
                </TableHead>
                <TableHead className="text-right">Series</TableHead>
                <TableHead className="text-right">action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((category) => (
                <TableRow key={category.id} className="hover:bg-gray-50">
                  <TableCell>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell className="text-right">{category.series}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-blue-500">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </motion.div>
      
      {/* Pagination */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay: 0.3
        }}
        className="py-4 flex justify-center"
      >
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage > 1) handlePageChange(currentPage - 1)
                }}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show first page, last page, current page, and pages around current
              if (
                page === 1 || 
                page === totalPages || 
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink 
                      href="#" 
                      isActive={page === currentPage}
                      onClick={(e) => {
                        e.preventDefault()
                        handlePageChange(page)
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              }
              
              // Show ellipsis for gaps
              if (
                (page === 2 && currentPage > 3) || 
                (page === totalPages - 1 && currentPage < totalPages - 2)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationEllipsis />
                  </PaginationItem>
                )
              }
              
              return null
            })}
            
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage < totalPages) handlePageChange(currentPage + 1)
                }}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </motion.div>
    </div>
  )
}

export default Categories