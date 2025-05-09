import React, { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { NotificationItem } from '@/types';
import Image from 'next/image';
import { CheckCheck } from 'lucide-react';
import { markAsRead } from '@/lib/api';
import { useMarkAsRead, useRenewSnapSubscription } from '@/hooks/api';
import { formatDate } from '@/lib/utils';
import { Button } from './ui/button';
import Link from 'next/link';
import { toast } from 'sonner';

const SubscriptionNotificationDialog = ({ isNotificationDialogOpen, setIsNotificationDialogOpen, myprofile, refetch }: { isNotificationDialogOpen: boolean, setIsNotificationDialogOpen: (open: boolean) => void, myprofile: any, refetch: () => void }) => {
    // const { data: myprofile } = useGetMyProfile();
    const { mutate: renewSubscription } = useRenewSnapSubscription();
    const [notificationReadID, setNotificationReadID] = useState<string>("");
    const [showNotification, setShowNotification] = useState<string[]>([]);
    const { mutate: markAsRead } = useMarkAsRead(notificationReadID);
    const handleNotificationClick = (id: string) => {
        setNotificationReadID(id);
        markAsRead(undefined, {
            onSuccess: () => {
                setShowNotification((prev) => prev.filter((item) => item !== id));
                // Also update the notifications in myprofile data
                if (myprofile?.data?.notifications) {
                    const updatedNotifications = myprofile.data.notifications.filter(
                        (item) => item._id !== id
                    );
                    // Update the myprofile data
                    myprofile.data.notifications = updatedNotifications;
                }
            },
        });
    };

    const handleRenewal = (id: string, notificationId: string) => {
        renewSubscription({ packageId: id }, {
            onSuccess: () => {
                toast.success("Subscription renewed successfully");
                setNotificationReadID(notificationId);
                refetch();
            },
            onError: (error) => {
                toast.error(error.message);
            }
        });
    }

    const nmarkNotificationRead = (id: string) => {
        setNotificationReadID(id)
        markAsRead(undefined, {
            onSuccess: () => {
                toast.success("Notification marked as read");
                setShowNotification((prev) => prev.filter((item) => item !== id));
                refetch();
            },
            onError: (error) => {
                toast.error(error?.response?.data?.message || "Failed to mark notification as read");
            }
        })
    }
    return (
        <div><Dialog
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
                        Subscription Notifications
                    </h2>
                    <div className="max-h-[600px] overflow-y-auto space-y-4">
                        {myprofile?.data?.notifications
                            ?.filter((item) => item.type === "subscription")
                            .map((item: NotificationItem) => (
                                <div key={item._id} className='flex gap-2 items-center justify-between border rounded-lg p-4 border-gray-200 pb-4'>
                                    <p>{item?.data?.message}</p>
                                    <div className='flex flex-col items-center justify-end gap-2 mt-3 '>
                                        {item?.data?.status === "expired" &&
                                            <Button onClick={() => { handleRenewal(item?.data?.subscription?.package._id, item?._id) }}>
                                                Renewal
                                            </Button>}

                                        <CheckCheck onClick={() => nmarkNotificationRead(item._id)} size={20} className='w-5 h-5 hover:text-primary cursor-pointer' />
                                    </div>
                                </div>
                            ))}
                        {(!myprofile?.data?.notifications?.filter(
                            (item) => item.type === "subscription"
                        ) ||
                            myprofile.data.notifications.filter(
                                (item) => item.type === "subscription"
                            ).length === 0) && (
                                <div className="text-center text-gray-500 py-4">
                                    No subscription notifications
                                </div>
                            )}
                    </div>
                </motion.div>
            </DialogContent>
        </Dialog></div>
    )
}

export default SubscriptionNotificationDialog