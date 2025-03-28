"use client";
import { useGetCustomerById } from "@/hooks/api";
import { useParams } from "next/navigation";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader } from "lucide-react";

const CustomerIPAdresses = () => {
  const params = useParams();
  const paramsId = params.id;
  const { data, isLoading } = useGetCustomerById(paramsId);
  console.log(data);
  const allIPs = data?.data.customer.allIps;
  console.log(allIPs);
  return isLoading ? (
    <div className="flex items-center justify-center mt-10">
      {" "}
      <Loader className="animate-spin text-primary mb-10" size={30} />
    </div>
  ) : !data?.data.customer.allIps.length ? (
    <div className="text-center text-red-500 font-bold mt-5">
      *No Api&apos;s Of This User*
    </div>
  ) : (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-primary">IP Addresses</TableHead>
          <TableHead className="text-right pr-10 text-primary">
            Created
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allIPs?.map((IP) => (
          <TableRow key={IP._id}>
            <TableCell>{IP.ip}</TableCell>
            <TableCell className="text-right pr-8">
              {IP.date.split("T")[0]}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomerIPAdresses;
