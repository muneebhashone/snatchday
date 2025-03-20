"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
;
import { User } from "@/types";

const page = ({ data, isLoading }: { data: User[], isLoading: boolean }) => {
  return (
    <div className="py-10 px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">All Participants</h1>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Vip Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                  Loading...
                </TableCell>
              </TableRow>
            ) :
             data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                  No participants found
                </TableCell>
              </TableRow>
             ) :    
            (
              data?.map((user: User, index: number) => (
                <TableRow key={index}>
                <TableCell>
                  {user.image && (
                    <div className="relative h-16 w-16">
                      <img
                        src={user.image}
                        alt={user.name}
                        className="rounded-md object-cover w-full h-full"
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell>{user.username || "N/A"}</TableCell>
                <TableCell>{user.email || "N/A"}</TableCell>
                <TableCell>{user.vip ? "VIP" : "Regular"}</TableCell>
              </TableRow>
              ))
            )}
        
              
            
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default page;
