"use client";

import ProductUpdateForm from "@/components/admin/ProductUpdateForm";
import { useGetProducts } from "@/hooks/api";
import { useParams } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { useState, useEffect } from "react";

export default function EditProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const { data: productsData, isLoading } = useGetProducts();
  const [productLoaded, setProductLoaded] = useState(false);
  
  const products = productsData?.data?.products || [];
  const product = products.find((p) => p._id === productId);
  
  useEffect(() => {
    if (product && Object.keys(product).length > 0) {
      setProductLoaded(true);
    }
  }, [product]);

  return (
    <AdminLayout>
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
        <ProductUpdateForm product={product as any} />
      ) : (
        <div className="p-6 flex items-center justify-center h-64">
          <div className="text-lg font-medium">Preparing product data...</div>
        </div>
      )}
    </AdminLayout>
  );
}
