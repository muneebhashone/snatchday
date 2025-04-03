"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetGames } from "@/hooks/api";
import React, { useState } from "react";
import { FileEdit, Loader } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const skip = 10;
  const { data: games, isLoading } = useGetGames(page);
  console.log(games);

  return (
    <AdminLayout>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader size={25} className="animate-spin text-primary" />
        </div>
      ) : (
        <Table className="border border-primary">
          <TableHeader>
            <TableRow className="border border-primary">
              <TableHead className="text-primary font-bold ">
                Game Logo
              </TableHead>
              <TableHead className="text-primary font-bold">Title</TableHead>
              <TableHead className="text-primary font-bold">
                Max Score
              </TableHead>
              <TableHead className="text-primary font-bold">Levels</TableHead>
              <TableHead className="text-primary font-bold">
                Winner Determination
              </TableHead>
              <TableHead className="text-primary font-bold">
                Created At
              </TableHead>
              <TableHead className="text-primary font-bold">
                Is Active
              </TableHead>
              <TableHead className="text-primary font-bold text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {games?.data?.map((game) => (
              <TableRow key={game._id}>
                {/* <TableCell className="font-bold">{game._id}</TableCell> */}
                <TableCell>
                  <Image
                    src={game.logo}
                    alt={game.title}
                    width={40}
                    height={40}
                    className="object-contain"
                    unoptimized
                  />
                </TableCell>
                <TableCell>{game.title}</TableCell>
                <TableCell>{game.maxScore}</TableCell>
                <TableCell>{game.levels}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <p>
                      <span className="text-primary">Level:</span>{" "}
                      {game.winnerDetermination.level}
                      {","}
                    </p>
                    <p>
                      <span className="text-primary">Score:</span>{" "}
                      {game.winnerDetermination.score}
                      {","}
                    </p>
                    <p>
                      <span className="text-primary">Time:</span>{" "}
                      {game.winnerDetermination.time}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{game.createdAt.split("T")[0]}</TableCell>
                <TableCell>{game.isActive ? "Yes" : "No"}</TableCell>
                <TableCell className="flex mt-3 justify-end">
                  <FileEdit
                    onClick={() => {
                      router.push(`/admin/games/${game._id}`);
                    }}
                    className="cursor-pointer"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="w-full">
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                <button
                  className={`${
                    page === 0 ? "text-gray-300 cursor-not-allowed" : ""
                  }`}
                  disabled={page === 0}
                  onClick={() => setPage((prev) => Math.max(prev - skip, 0))}
                >
                  Prev
                </button>
                {Array.from(
                  {
                    length: Math.ceil((games?.data?.total || 0) / skip),
                  },
                  (_, index) => (
                    <button
                      key={index}
                      className={`page-indicator m-1 ${
                        index === page / skip
                          ? "bg-primary px-2 text-white"
                          : ""
                      }`}
                      onClick={() => setPage(index * skip)}
                    >
                      {index + 1}
                    </button>
                  )
                )}
                <button
                  className={`${
                    page + skip >= (games?.data?.total || 0) && "text-gray-300"
                  }`}
                  disabled={page + skip >= (games?.data?.total || 0)}
                  onClick={() =>
                    setPage((prev) =>
                      Math.min(prev + skip, games?.data?.total - page)
                    )
                  }
                >
                  Next
                </button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </AdminLayout>
  );
};

export default Page;
