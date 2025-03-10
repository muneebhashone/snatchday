"use client";

import ProductUpdateForm from "@/components/admin/ProductUpdateForm";
import { useGetProducts } from "@/hooks/api";
import { useParams } from "next/navigation";

export default function EditProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const { data: productsData } = useGetProducts();
  const products = productsData?.data?.products || [];
  const product = products.find(p => p._id === productId);

  if (!product) {
    return <div className="p-6">Loading...</div>;
  }

  return <ProductUpdateForm product={product} />;
}