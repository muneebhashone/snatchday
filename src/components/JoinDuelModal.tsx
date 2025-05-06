import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useJoinDuel } from "@/hooks/api";
import { toast } from "sonner";

const JoinDuelModal = ({
  openModal,
  setOpenModal,
  duelId,
}: {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  duelId: string;
}) => {
  const [openJoinDuelModal, setOpenJoinDuelModal] = useState(false);
  const { mutate: joinDuel } = useJoinDuel(duelId);

  return (
    <div>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to join this duel?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                joinDuel(undefined, {
                  onSuccess: () => {
                    toast.success("Duel joined successfully");
                    setOpenModal(false);
                    setOpenJoinDuelModal(true);
                  },
                  onError: (error: any) => {
                    toast.error(
                      error?.response?.data?.message || "Failed to join duel"
                    );
                  },
                });
              }}
            >
              Join
            </Button>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={openJoinDuelModal} onOpenChange={setOpenJoinDuelModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              You have joined the duel successfully, do you wanna play duel
              right now?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() =>
                (window.location.href = `/duel-arena/duel/${duelId}`)
              }
            >
              Play
            </Button>
            <Button onClick={() => setOpenJoinDuelModal(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JoinDuelModal;
