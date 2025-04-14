"use client";

import ProductUpdateForm from "@/components/admin/ProductUpdateForm";
import { useGetProducts } from "@/hooks/api";
import { useParams } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";

export default function EditProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const { data: productsData } = useGetProducts();
  const products = productsData?.data?.products || [];
  const product = products.find((p) => p._id === productId);
  // console.log(product, "product for update");
  // if (!product) {
  //   return <div className="p-6">Loading...</div>;
  // }

  return (
    <AdminLayout>
      <ProductUpdateForm product={product} />
    </AdminLayout>
  );
}
