"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useShareTournament } from "@/hooks/api";
import { toast } from "sonner";

interface ShareTournamentModalProps {
  tournamentId: string;
  open: boolean;
  onClose: () => void;
}

export const ShareTournamentModal = ({ tournamentId, open, onClose }: ShareTournamentModalProps) => {
  const [email, setEmail] = useState("");
  const { mutate: shareTournament, isPending } = useShareTournament();

  const handleShare = () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    shareTournament(
      { id: tournamentId, email },
      {
        onSuccess: () => {
          toast.success("Tournament shared successfully");
          setEmail("");
          onClose();
        },
        onError: (error: any) => {
          console.error("Sharing failed:", error);
          toast.error(error?.message || "Failed to share tournament");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Share Tournament</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={handleShare} disabled={isPending}>
            {isPending ? "Sharing..." : "Share Tournament"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 