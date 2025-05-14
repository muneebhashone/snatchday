"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import { useGetCompetitionParticipants } from "@/hooks/api";
import { useParams } from "next/navigation";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";

const Page = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetCompetitionParticipants(id as string);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminBreadcrumb
          title="Participants"
          items={[{ title: "Competitions", href: "/admin/competitions" }]}
        />
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Competition Participants List</CardTitle>

              <Badge variant="secondary" className="text-sm">
                Total: {data?.data.length || 0}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Name</TableHead>
                      <TableHead className="font-semibold">Email</TableHead>
                      <TableHead className="font-semibold">Group</TableHead>
                      <TableHead className="font-semibold">Answer</TableHead>
                      <TableHead className="font-semibold">
                        Participated At
                      </TableHead>
                      <TableHead className="font-semibold">Winner</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.data.map((participant) => (
                      <TableRow
                        key={participant._id}
                        className="hover:bg-muted/50 transition-colors"
                      >
                        <TableCell className="font-medium">
                          {participant.user.name}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {participant.user.email}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`${
                              participant.user.group === "VIP"
                                ? "bg-amber-100 text-amber-700 border-amber-300 hover:bg-amber-200"
                                : "hover:bg-muted/60"
                            } cursor-default transition-colors`}
                          >
                            {participant.user.group}
                          </Badge>
                        </TableCell>
                        <TableCell>{participant.answer}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {format(new Date(participant.participatedAt), "PPp")}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              participant.winner ? "success" : "secondary"
                            }
                            className={`${
                              participant.winner
                                ? "bg-green-100 text-green-700 border-green-300 hover:bg-green-200"
                                : "hover:bg-muted/60"
                            } cursor-default transition-all duration-200 transform hover:scale-105`}
                          >
                            {participant.winner ? "🏆 Winner" : "No"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Page;
