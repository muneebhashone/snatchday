"use client";

import React, { useState } from "react";
import DuelCards from "@/components/landing-page/DuelCards";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ClientLayout from "@/components/landing-page/ClientLayout";
import { useGetDuelGames } from "@/hooks/api";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const CreateDuelPage = () => {
  const [showPlayConfirmation, setShowPlayConfirmation] = useState(false);
  const router = useRouter();
  const [selectedGame, setSelectedGame] = useState("");
  const { data: duelGamesData, isLoading } = useGetDuelGames();
  const games = duelGamesData?.data || [];

  const handleSuccess = (data: any) => {
    setShowPlayConfirmation(true);
    setSelectedGame(data?.data?._id);
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
  console.log(selectedGame);

  return (
    <ClientLayout>
      <div className="container mx-auto px-4 py-64">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-8"
          >
            Select a Game to Create Duel
          </motion.h1>

          {/* Game Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {games.map((game, index) => (
              <motion.button
                key={game._id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 * index,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                className={`border border-gray-200 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center gap-4 w-full h-max ${
                  selectedGame === game._id &&
                  "flex-col justify-center gap-0 items-center p-0"
                }`}
              >
                <motion.div
                  className="w-16 h-16 relative flex-shrink-0"
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 30,
                  }}
                >
                  <Image
                    src={game.logo}
                    alt={game.title}
                    fill
                    className="object-contain"
                    onClick={() => {
                      console.log(game._id);
                      setSelectedGame(
                        selectedGame === game._id ? "" : game._id
                      );
                    }}
                  />
                </motion.div>
                {selectedGame !== game._id.toString() && (
                  <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2 * index,
                    }}
                    className="text-xl font-semibold"
                  >
                    {game.title}
                  </motion.span>
                )}
                {selectedGame === game._id.toString() && (
                  <div className="py-4">
                    <DuelCards
                      gameId={game._id}
                      gameTitle={game.title}
                      gameIcon={game.logo}
                      onSuccess={handleSuccess}
                    />
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Game Selection Dialog */}
      {/* <Dialog open={!!selectedGame} onOpenChange={() => setSelectedGame(null)}>
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
      </Dialog> */}

      <Dialog
        open={showPlayConfirmation}
        onOpenChange={setShowPlayConfirmation}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Duel Created Successfully!</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground">
              Your duel has been created successfully. You can now start
              playing!
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPlayConfirmation(false)}
            >
              Close
            </Button>
            <Button
              className="bg-primary hover:bg-primary"
              onClick={() => {
                console.log(selectedGame);
                setShowPlayConfirmation(false);
                router.push(`/duel-arena/play/${selectedGame}`);
              }}
            >
              Start Playing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ClientLayout>
  );
};

export default CreateDuelPage;
