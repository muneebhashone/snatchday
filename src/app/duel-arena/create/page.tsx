"use client";

import React, { useState } from "react";
import DuelCards from "@/components/landing-page/DuelCards";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ClientLayout from "@/components/landing-page/ClientLayout";
import { useGetDuelGames } from "@/hooks/api";
import { Loader2 } from "lucide-react";

const CreateDuelPage = () => {
  const router = useRouter();
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const { data: duelGamesData, isLoading } = useGetDuelGames();
  const games = duelGamesData?.data || [];

  const handleSuccess = () => {
    setSelectedGame(null);
    // You can add additional success handling here
  };

  if (isLoading) {
    return (
      <ClientLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="container mx-auto px-4 py-64">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Select a Game to Create Duel
          </h1>

          {/* Game Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {games.map((game) => (
              <button
                key={game._id}
                onClick={() => setSelectedGame(game)}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center gap-4 w-full"
              >
                <div className="w-16 h-16 relative flex-shrink-0">
                  <Image
                    src={game.logo}
                    alt={game.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xl font-semibold">{game.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Game Selection Dialog */}
      <Dialog open={!!selectedGame} onOpenChange={() => setSelectedGame(null)}>
        <DialogContent className="sm:max-w-md">
          <div className="py-4">
            {selectedGame && (
              <DuelCards
                gameId={selectedGame._id}
                gameTitle={selectedGame.title}
                gameIcon={selectedGame.logo}
                onSuccess={handleSuccess}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </ClientLayout>
  );
};

export default CreateDuelPage;
