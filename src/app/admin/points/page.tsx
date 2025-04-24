import { Metadata } from "next"
import { CreatePointsForm } from "../../../components/admin/CreatePointsForm"
import AdminLayout from "@/components/admin/AdminLayout"

export const metadata: Metadata = {
  title: "Points Settings",
  description: "Manage points system settings",
}

export default function PointsPage() {
  return (
    <AdminLayout>    
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Points Settings</h1>
          <p className="text-muted-foreground">
            Configure points system settings for social interactions and platform usage.
          </p>
        </div>
        <div className="border rounded-lg p-6">
          <CreatePointsForm />
        </div>
      </div>
    </div>
    </AdminLayout>
  )
}