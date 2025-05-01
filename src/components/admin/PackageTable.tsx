"use client";

import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { useDeleteSubscriptionPlan, useGetSubscriptionPlan } from '@/hooks/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Loader, PackageOpen, Plus, Search, Trash, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface SubscriptionPackage {
  _id: string;
  name: string;
  description: string;
  price: number;
  interval: string;
  times: number;
  features: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const PackageTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  
  const { data: packages, isLoading, refetch } = useGetSubscriptionPlan({
    search: debouncedSearch
  });
  const { mutate: deletePackage } = useDeleteSubscriptionPlan();
  const router = useRouter();
  
  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery("");
    setDebouncedSearch("");
  };

  // Format interval for display
  const formatInterval = (interval: string) => {
    switch (interval) {
      case "3months":
        return "3 Months";
      case "6months":
        return "6 Months";
      case "month":
        return "Monthly";
      case "year":
        return "Yearly";
      default:
        return interval;
    }
  };

  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price);
  };

  const handleStatusToggle = (id: string, currentStatus: boolean) => {
    // Mock function - would be hooked up to a real API call
    toast.success(`Status ${currentStatus ? "deactivated" : "activated"} successfully`);
  };

  const handleEditPackage = (id: string) => {
    // Navigate to edit page
    router.push(`/admin/packages/edit/${id}`);
  };

  const handleDeletePackage = (id: string) => {
    deletePackage(id);
    refetch();
    // Mock function - would be hooked up to a real API call
    toast.success("Package deleted successfully");
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            <PackageOpen className="h-4 w-4" />
          </div>
          Subscription Packages
        </h2>
        <Button 
          variant="default" 
          size="sm" 
          onClick={() => router.push('/admin/packages/create')}
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" /> Add Package
        </Button>
      </div>
      
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search packages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 bg-background"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={handleClearSearch}
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </Button>
          )}
        </div>
      </div>
      
      <div className="border rounded-md bg-white">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : packages.data?.packages && packages.data?.packages.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-600 py-3">Name</TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-600 py-3">Price</TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-600 py-3">Interval</TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-600 py-3">Features</TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-600 py-3 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packages.data?.packages.map((pkg: SubscriptionPackage) => (
                <TableRow key={pkg._id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{pkg.name}</TableCell>
                  <TableCell>{formatPrice(pkg.price)}</TableCell>
                  <TableCell>{formatInterval(pkg.interval)}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {pkg.features && pkg.features.length > 0 ? (
                        pkg.features.slice(0, 2).map((feature, index) => (
                          <Badge key={index} variant="outline" className="bg-primary/5 text-xs">
                            {feature.length > 20 ? `${feature.substring(0, 20)}...` : feature}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground text-sm">No features</span>
                      )}
                      {pkg.features && pkg.features.length > 2 && (
                        <Badge variant="outline" className="bg-primary/5 text-xs">
                          +{pkg.features.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
            
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditPackage(pkg._id)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePackage(pkg._id)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : searchQuery && packages.data?.total > 0 ? (
          <div className="flex flex-col justify-center items-center h-40 text-muted-foreground">
            <p className="mb-2">No packages found for &quot;{searchQuery}&quot;</p>
            <Button variant="outline" size="sm" onClick={handleClearSearch}>
              Clear search
            </Button>
          </div>
        ) : (
          <div className="flex justify-center items-center h-40 text-muted-foreground">
            No subscription packages found
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageTable;