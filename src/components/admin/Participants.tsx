"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/types";
import Image from "next/image";

const page = ({ data, isLoading }: { data: User[]; isLoading: boolean }) => {
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
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-8 text-gray-500"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-8 text-gray-500"
                >
                  No participants found
                </TableCell>
              </TableRow>
            ) : (
              data?.map((user: User, index: number) => (
                <TableRow key={index}>
                  <TableCell>
                    {user.image && (
                      <div className="relative h-10 w-16">
                        <Image
                          src={user.image}
                          alt={user.name}
                          width={64}
                          height={64}
                          className="rounded-md object-contain w-full h-full"
                        />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{user.username || "N/A"}</TableCell>
                  <TableCell>{user.email || "N/A"}</TableCell>
                  <TableCell>{user.vip ? "VIP" : "BASIC"}</TableCell>
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
