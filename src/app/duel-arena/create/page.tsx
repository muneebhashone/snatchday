git"use client";
import ClientLayout from "@/components/landing-page/ClientLayout";
import React from "react";
import { useGetDuelGames } from "@/hooks/api";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";

const CreateDuelPage = () => {
  const { data: duelGames, isLoading: isDuelGamesLoading } = useGetDuelGames();
  const games = duelGames?.data;

  return (
    <ClientLayout>
      <div className="py-44 mx-auto max-w-[1440px] px-4">
        {/* Breadcrumb */}
        <AdminBreadcrumb
          title="Create"
          items={[{ title: "Duel Arena", href: "/duel-arena" }]}
        />

        {/* Hero Section with Trophies */}
        <div className="mb-10 relative">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Create duel
            </h1>
          </div>
        </div>

        {/* Game cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isDuelGamesLoading ? (
            <div className="col-span-full text-center py-10">
              Loading games...
            </div>
          ) : (
            games?.map((game) => (
              <Link key={game._id} href={`/duel-arena/create/${game._id}`}>
                <Card className="hover:shadow-md transition-shadow overflow-hidden border border-gray-200 h-full">
                  <CardContent className="p-0">
                    <div className="flex items-center p-6">
                      <div className="w-16 h-16 min-w-16 mr-4 relative">
                        <Image
                          src={game.logo || "/images/game-placeholder.png"}
                          alt={game.title || "N/A"}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h3 className="text-xl font-semibold uppercase">
                        {game.title || "N/A"}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}

          {/* Fallback if no games */}
          {!isDuelGamesLoading && (!games || games.length === 0) && (
            <div className="col-span-full text-center py-10">
              No games available at the moment.
            </div>
          )}
        </div>
      </div>
    </ClientLayout>
  );
};

export default CreateDuelPage;
