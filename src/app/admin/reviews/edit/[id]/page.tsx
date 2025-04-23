"use client";
import { useParams, useRouter } from "next/navigation";
import { useGetReviewById } from "@/hooks/api";
import { useEffect } from "react";
import ReviewForm from "../../create/page";

const EditReviewPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data: review, isLoading, isError } = useGetReviewById(id);

  // Redirect back to reviews list page if review ID is invalid or not found
  useEffect(() => {
    if (isError) {
      router.push("/admin/reviews");
    }
  }, [isError, router]);

  // Just render the same form component
  // The form will handle the edit logic based on the ID in the URL
  return <ReviewForm />;
};

export default EditReviewPage; 