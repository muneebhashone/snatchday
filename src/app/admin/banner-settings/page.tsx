"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import { useDeleteBanner, useGetBanners } from "@/hooks/api";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  Table,
  TableBody,
} from "@/components/ui/table";
import { Edit, Loader, Plus, Trash } from "lucide-react";
import Image from "next/image";
import noProductImage from "@/app/images/noProductImage.jpeg";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import Link from "next/link";
import { toast } from "sonner";
import { IError } from "../games/create/page";

const Page = () => {
  const { data: banners, isLoading, refetch } = useGetBanners();
  const { mutate: deleteBanner, isPending } = useDeleteBanner();

  const handleDelete = (id: string) => {
    deleteBanner(id, {
      onSuccess: () => {
        toast.success("you have succesfully delete this banner");
        refetch();
      },
      onError: (err) => {
        toast.error(
          (err as unknown as IError).response?.data?.message ||
            "Failed to delete banner"
        );
      },
    });
  };

  return (
    <AdminLayout>
      <AdminBreadcrumb title="Banners" />
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Banner Settings
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your promotional banners and featured products
            </p>
          </div>
          <Link href="/admin/banner-settings/create">
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Banner
            </Button>
          </Link>
        </div>

        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    <div className="flex justify-center items-center h-full">
                      <Loader size={32} className="animate-spin text-primary" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                banners?.data?.map((banner: any) => (
                  <TableRow key={banner._id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="w-20 h-20 relative rounded-lg overflow-hidden">
                        <Image
                          src={banner.image}
                          alt="banner"
                          width={100}
                          height={100}
                          className="object-contain w-full h-full"
                        />
                      </div>
                    </TableCell>
                    <TableCell>{banner?.title || "N/A"}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-muted">
                          {/* <Image
                            src={banner?.productId?.images[0] || noProductImage}
                            alt={banner?.productId?.name || "Product"}
                            className="object-contain w-full h-full"
                            width={48}
                            height={48}
                          /> */}
                        </div>
                        <div className="flex flex-col w-full md:w-[300px]">
                          <span className="font-medium truncate">
                            {banner?.productId?.name || "N/A"}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Product ID:{" "}
                            {banner?.productId?._id?.slice(-8) || "N/A"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(banner?.productId?.price) || "N/A"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          banner?.status === "active" ? "success" : "secondary"
                        }
                      >
                        {banner?.status || "N/A"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/banner-settings/edit/${banner._id}`}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          onClick={() => handleDelete(banner._id)}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                        >
                          {isPending ? (
                            <Loader className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Page;
