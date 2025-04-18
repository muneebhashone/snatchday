"use client";

import ProductUpdateForm from "@/components/admin/ProductUpdateForm";
import { useGetProductById, useGetProducts } from "@/hooks/api";
import { useParams } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { useState, useEffect } from "react";
import { MainProduct } from "@/types";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";

export default function EditProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const { data: productsData, isLoading } = useGetProductById(productId);
  console.log(productsData, "productsData");

  const [productLoaded, setProductLoaded] = useState(false);
  
  const product = productsData?.data;
  
  useEffect(() => {
    if (product && Object.keys(product).length > 0) {
      setProductLoaded(true);
    }
  }, [product]);

  return (
    <AdminLayout>
      <AdminBreadcrumb
        title="Edit Product"
        items={[
          {
            title: "Products",
            href: "/admin/products",
          },
        ]}
      />
      {isLoading ? (   
        <div className="p-6 flex items-center justify-center h-64">
          <div className="text-lg font-medium">Loading product data...</div>
        </div>
      ) : !product ? (
        <div className="p-6 flex flex-col items-center justify-center h-64">
          <div className="text-lg font-medium text-red-500">Product not found</div>
          <p className="text-gray-500 mt-2">The product you&apos;re looking for could not be found.</p>
        </div>
      ) : productLoaded ? (
        <ProductUpdateForm product={product} />
      ) : (
        <div className="p-6 flex items-center justify-center h-64">
          <div className="text-lg font-medium">Preparing product data...</div>
        </div>
      )}
    </AdminLayout>
  );
}
