"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteGame, useGetGames } from "@/hooks/api";
import React, { useState } from "react";
import { Delete, Edit, FileEdit, Loader, Trash } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { DynamicPagination } from "@/components/ui/dynamic-pagination";

const Page = () => {
  const { mutate: deleteGame } = useDeleteGame();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const {
    data: games,
    isLoading,
    refetch,
  } = useGetGames((currentPage - 1) * itemsPerPage);

  const onDelete = async (id) => {
    deleteGame(id, {
      onSuccess: () => {
        toast.success("Game deleted successfully");
        refetch();
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Failed to delete game");
      },
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <AdminLayout>
      <div className="p-4">
      <AdminBreadcrumb title="Games" />
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-44">
          <Loader size={25} className="animate-spin text-primary" />
        </div>
      ) : (
        <div className="p-4 space-y-4 bg-white rounded-md">
          <h1 className="text-2xl font-bold mb-10">Games</h1>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>GAME LOGO</TableHead>
                  <TableHead>TITLE</TableHead>
                  <TableHead>MAX SCORE</TableHead>
                  <TableHead>LEVELS</TableHead>
                  <TableHead>WINNER DETERMINATION</TableHead>
                  <TableHead>CREATED AT</TableHead>
                  <TableHead>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {games?.data?.games.map((game) => (
                  <TableRow key={game._id}>
                    <TableCell>
                      <div className="relative h-12 w-12">
                        <Image
                          src={game.logo}
                          alt={game.title}
                          className="rounded-md object-contain"
                          fill
                          unoptimized
                        />
                      </div>
                    </TableCell>
                    <TableCell>{game?.title || "N/A"}</TableCell>
                    <TableCell>
                      <div className="w-12 h-6 rounded-full flex items-center justify-center text-sm bg-blue-100 text-blue-800">
                        {game?.maxScore || "N/A"}
                      </div>
                    </TableCell>
                    <TableCell>{game?.levels || "N/A"}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <span className="text-sm">
                          <span className="text-primary font-medium">
                            Level:
                          </span>{" "}
                          {game?.winnerDetermination?.level || "N/A"}
                        </span>
                        <span className="text-sm">
                          <span className="text-primary font-medium">
                            Score:
                          </span>{" "}
                          {game?.winnerDetermination?.score || "N/A"}
                        </span>
                        <span className="text-sm">
                          <span className="text-primary font-medium">
                            Time:
                          </span>{" "}
                          {game.winnerDetermination.time}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{game.createdAt.split("T")[0]}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  router.push(`/admin/games/${game._id}`);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit Game</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  onDelete(game?._id);
                                }}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete Game</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {!games?.data?.games.length && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No games found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between py-4">
            <p className="text-sm text-gray-500">
              Displaying {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, games?.data?.total || 0)} of{" "}
              {games?.data?.total || 0} entries
            </p>
            <DynamicPagination
              totalItems={games?.data?.total || 0}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Page;
