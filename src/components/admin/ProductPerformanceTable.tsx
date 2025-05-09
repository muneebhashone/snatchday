"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, HelpCircle, Eye } from "lucide-react";
import { useProductAnalytics } from "@/hooks/api";
import { Select as ShadcnSelect, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const retentionColor = {
  green: "bg-green-500",
  orange: "bg-orange-500",
  red: "bg-red-500",
};

const ProductPerformanceTable = () => {
  const [timeFilter, setTimeFilter] = useState<'last7days' | 'last30days' | 'lastyear' | 'all'>('last7days');
  const [page, setPage] = useState(0);
  const limit = 10;
  const offset = page * limit;
  const { data: productAnalytics } = useProductAnalytics({ timeFilter, limit, offset });
  const products = productAnalytics?.data?.products || [];
  const hasMore = productAnalytics?.data?.pagination?.hasMore;

  // Reset page to 0 when filter changes
  useEffect(() => {
    setPage(0);
  }, [timeFilter]);

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Product Performance</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Show</span>
          <div className="relative">
            <ShadcnSelect value={timeFilter} onValueChange={v => setTimeFilter(v as any)}>
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last7days">Last 7 days</SelectItem>
                <SelectItem value="last30days">Last 30 days</SelectItem>
                <SelectItem value="lastyear">Last year</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </ShadcnSelect>
          </div>
        </div>
      </div>
      <Card>
        <CardContent className="overflow-x-auto p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[220px] text-left px-6 py-4 font-medium text-muted-foreground">Product</TableHead>
                <TableHead className="text-center px-6 py-4 font-medium text-muted-foreground">Orders</TableHead>
                <TableHead className="text-center px-6 py-4 font-medium text-muted-foreground">Quantity</TableHead>
                <TableHead className="text-center px-6 py-4 font-medium text-muted-foreground">
                  <div className="flex items-center justify-center">
                    Revenue
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </div>
                </TableHead>
                <TableHead className="text-center px-6 py-4 font-medium text-muted-foreground">
                  <div className="flex items-center justify-center">
                    Retention
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-60">Percentage of customers who made repeat purchases</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableHead>
                <TableHead className="text-center px-6 py-4 font-medium text-muted-foreground">New Customers</TableHead>
                <TableHead className="text-center px-6 py-4 font-medium text-muted-foreground">Repeat Customers</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product: any, idx: number) => (
                <TableRow key={product.productId || idx}>
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 mr-4">
                        <Image
                          src={product.productImage}
                          alt={product.productName}
                          width={60}
                          height={60}
                          className="object-contain rounded-md"
                        />
                      </div>
                      <div>
                        <div className="font-medium truncate max-w-[150px]">{product.productName}</div>
                        <div className="text-sm text-muted-foreground">
                          --
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <Button variant="outline" size="sm" className="h-8 px-2 gap-1">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>{product.orders}</span>
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-center">
                    <div>
                      <div>{product.quantitySold}</div>
                      <div className="text-xs text-muted-foreground">{/* percent not in API */}</div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-center">
                    <div>
                      <div>{product.revenue?.toFixed ? `$${product.revenue.toFixed(2)}` : product.revenue}</div>
                      <div className="text-xs text-muted-foreground">{/* percent not in API */}</div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center w-full">
                      <div className="font-medium mb-1">{product.retentionRate}%</div>
                      <div className="w-full max-w-[120px] h-2 bg-muted rounded-full border border-gray-200 overflow-hidden">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            product.retentionRate >= 50 ? 'bg-green-500' : product.retentionRate >= 20 ? 'bg-orange-400' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(product.retentionRate, 100)}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-center">
                    <div>{product.uniqueCustomers}</div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-center">
                    <div>{product.repeatCustomers}</div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Pagination Controls */}
          <div className="flex justify-end items-center gap-2 p-4">
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>
              Previous
            </Button>
            <span className="text-sm">Page {page + 1}</span>
            <Button variant="outline" size="sm" onClick={() => setPage(p => p + 1)} disabled={!hasMore}>
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductPerformanceTable;