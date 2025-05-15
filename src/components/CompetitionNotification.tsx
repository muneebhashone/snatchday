import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { NotificationItem } from "@/types";
import { CheckCheck } from "lucide-react";
import { useMarkAsRead } from "@/hooks/api";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { IError } from "@/app/admin/games/create/page";
import Link from "next/link";
import Image from "next/image";

const CompetitionNotification = ({
  isNotificationDialogOpen,
  setIsNotificationDialogOpen,
  myprofile,
  refetch,
}: {
  isNotificationDialogOpen: boolean;
  setIsNotificationDialogOpen: (open: boolean) => void;
  myprofile: any;
  refetch: () => void;
}) => {
  const [notificationReadID, setNotificationReadID] = useState<string>("");
  const { mutate: markAsRead } = useMarkAsRead(notificationReadID);

  const markNotificationRead = (id: string) => {
    setNotificationReadID(id);
    markAsRead(undefined, {
      onSuccess: () => {
        toast.success("Notification marked as read");
        refetch();
      },
      onError: (error) => {
        toast.error(
          (error as unknown as IError)?.response?.data?.message ||
            "Failed to mark notification as read"
        );
      },
    });
  };

  return (
    <div>
      <Dialog
        open={isNotificationDialogOpen}
        onOpenChange={setIsNotificationDialogOpen}
      >
        <DialogContent className="max-w-[600px] left-[50%] top-[30%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-4"
          >
            <h2 className="text-lg font-bold text-primary mb-2">
              Competition Notifications
            </h2>
            <div className="max-h-[600px] overflow-y-auto space-y-4">
              {myprofile?.data?.notifications
                ?.filter((item) => item.type === "competition")
                .map((item: NotificationItem) => (
                  <div
                    key={item._id}
                    className="flex gap-2 items-center justify-between border rounded-lg p-4 border-gray-200 pb-4"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      {item?.data?.data?.competitionImage && (
                        <Image
                          src={item.data.data.competitionImage}
                          alt="Competition"
                          width={80}
                          height={80}
                          className="rounded-md"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-medium">
                          {item?.data?.data?.competitionName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {item?.data?.message}
                        </p>
                        {item?.data?.data?.competitionId && (
                          <Link
                            href={`/competitions/${item.data.data.competitionId}`}
                            className="text-primary hover:underline text-sm mt-2 block"
                          >
                            View Competition
                          </Link>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-end gap-2">
                      <CheckCheck
                        onClick={() => markNotificationRead(item._id)}
                        size={20}
                        className="w-5 h-5 hover:text-primary cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              {(!myprofile?.data?.notifications?.filter(
                (item) => item.type === "competition"
              ) ||
                myprofile.data.notifications.filter(
                  (item) => item.type === "competition"
                ).length === 0) && (
                <div className="text-center text-gray-500 py-4">
                  No competition notifications
                </div>
              )}
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompetitionNotification; 