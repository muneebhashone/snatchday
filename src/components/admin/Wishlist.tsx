"use client";
import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useWishList } from '@/hooks/api';

export function Wishlist() {
    const { data: wishlistData } = useWishList();
    console.log(wishlistData, "wishlistData");

  return (
    <Table>
      <TableCaption>Wishlist</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Added On</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Product 1</TableCell>
          <TableCell>$100</TableCell>
          <TableCell>2025-04-03</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}