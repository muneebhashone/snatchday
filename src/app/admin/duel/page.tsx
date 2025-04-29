"use client"

import React, { useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import DuelTable from '@/components/admin/DuelTable';
import { useGetDuels } from '@/hooks/api'
import AdminBreadcrumb from '@/components/admin/AdminBreadcrumb';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

const DuelPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const { data, isLoading, isError, refetch } = useGetDuels({
    search: searchQuery || undefined,
    limit,
    offset,
    priceRange: undefined,
   
  });

  const duels = data?.data?.duels || [];
  const total = data?.data?.total || 0;
  console.log(duels);

  const handleNextPage = () => {
    if (total > offset + limit) {
      setOffset(offset + limit);
    }
  };

  const handlePrevPage = () => {
    if (offset >= limit) {
      setOffset(offset - limit);
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <AdminBreadcrumb
          title="Duel Management"
          items={[{ title: "Dashboard", href: "/admin" }]}
        />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl font-bold">Manage Duels</h1>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="flex gap-2 w-full md:w-auto">
                <Input
                  placeholder="Search duels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-sm"
                />
             
              </div>

            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : isError ? (
            <div className="text-center p-8 text-red-500">
              Error loading duels. Please try again.
            </div>
          ) : duels.length > 0 ? (
            <>
              <DuelTable duels={duels} />
              
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-500">
                  Showing {offset + 1} to {Math.min(offset + limit, total)} of {total} duels
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevPage}
                    disabled={offset === 0}
                  >
                    Previous
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleNextPage}
                    disabled={offset + limit >= total}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center p-8 text-gray-500">
              No duels found.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export default DuelPage;