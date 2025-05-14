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
  console.log(banners);
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full flex justify-center items-center h-40">
              <Loader size={32} className="animate-spin text-primary" />
            </div>
          ) : (
            banners?.data?.map((banner: any) => (
              <div key={banner._id} className="bg-card rounded-xl shadow p-6 flex flex-col gap-4 relative">
                <div className="w-full h-48 relative rounded-lg overflow-hidden mb-2">
                  <Image
                    src={banner.image}
                    alt="banner"
                    fill
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <div className="font-bold text-lg truncate">{banner?.title || "N/A"}</div>
                  {banner?.content && (
                    <div className="prose prose-sm max-w-full" dangerouslySetInnerHTML={{ __html: banner.content }} />
                  )}
                </div>
                {banner?.link && (
                  <a href={banner.link} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full mt-2">Visit Link</Button>
                  </a>
                )}
                <Link href={`/admin/banner-settings/edit/${banner._id}`} className="absolute top-4 right-4">
                  <Button variant="secondary" size="icon" className="h-8 w-8">
                    <Edit className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Page;
