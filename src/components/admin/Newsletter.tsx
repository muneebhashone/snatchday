"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetNewsletters } from "@/hooks/api";
import { NewsletterTypes } from "@/types";
import { Button } from "../ui/button";

const Newsletter = () => {
  const { data: newsletters, isLoading, isError } = useGetNewsletters();
  console.log(newsletters, "newsletters");
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Newsletters</h1>
        <a href="/admin/newsletters/send">
          <Button className="hover:bg-primary hover:border border-primary">
            Send
          </Button>
        </a>
      </div>
      <div className="bg-white rounded-md shadow-sm">
        {isLoading ? (
          <div className="p-8 text-center">Loading newsletters...</div>
        ) : isError ? (
          <div className="p-8 text-center text-red-500">
            Error loading newsletters
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subscribed At</TableHead>
                  <TableHead>Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newsletters?.data?.map((newsletter: NewsletterTypes) => (
                  <TableRow key={newsletter._id}>
                    <TableCell>{newsletter.email || "N/A"}</TableCell>
                    <TableCell>
                      {new Date(newsletter.subscribedAt).toLocaleDateString() ||
                        "N/A"}
                    </TableCell>
                    <TableCell>
                      {new Date(newsletter.createdAt).toLocaleDateString() ||
                        "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
                {newsletters?.data?.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-center py-8 text-gray-500"
                    >
                      No newsletters found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
