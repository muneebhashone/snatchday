import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import CategoriesForm from "./CategoriesForm"

export function CreateCategoryDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost"className="bg-primary text-white hover:bg-primary transition-colors">
         Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription>
            Add a new category to your store
          </DialogDescription>
        </DialogHeader>
        <CategoriesForm />
      </DialogContent>
    </Dialog>
  )
} 