import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { Loader, X } from "lucide-react";
import { toast } from "sonner";
import { useGetMyProfile } from "@/hooks/api";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios"; // Assuming you use this for API calls

const SubscriptionModal = ({
  isOpen,
  setIsOpen,
  packageId,
  packagePoints,
  onSubscribed,
  pkg,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  packageId: string;
  packagePoints: number;
  onSubscribed?: () => void;
  pkg: any;
}) => {
  const { data: myprofile, isLoading } = useGetMyProfile();
  const userPoints = myprofile?.data?.wallet?.snapPoints ?? 0;
  const router = useRouter();

  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setShowConfirm(false);
      setError("");
    }
  }, [isOpen]);

  const handleSubscribeClick = () => {
    setError("");
    setShowConfirm(true);
  };

  // API call to subscribe
  const handleApiSubscribe = async () => {
    setLoading(true);
    setError("");
    try {
      await axios.post("/snap-subscriptions/", { packageId });
      toast.success("Subscription successful! Points deducted.");
      setShowConfirm(false);
      setIsOpen(false);
      if (onSubscribed) onSubscribed();
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Subscription failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          hideCloseButton={true}
          className="sm:max-w-[500px] p-0  rounded-lg shadow-lg"
        >
          {!showConfirm && (
            <>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                className="h-12 w-12 shadow-xl rounded-full bg-white p-0 hover:bg-gray-100 absolute -right-5 -top-5 "
              >
                <X className="h-6 w-6" />
              </Button>
              <div className="p-6 border-b bg-gray-50">
                <div>
                  <h1 className="font-bold text-gray-500 border-b w-max border-gray-500 mb-2">
                    {pkg?.name}
                  </h1>
                  <p className="text-sm text-gray-500">
                    Your subscription is valid for {pkg?.interval}. It will
                    automatically renew at the end of the period, and the
                    renewal amount will be deducted from your wallet. If
                    sufficient funds are not available in your wallet at the
                    time of renewal, your VIP subscription will be canceled.
                  </p>
                  <div className="flex flex-col gap-2 mt-4">
                    <Button
                      onClick={handleSubscribeClick}
                      className="bg-primary text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Subscribe"}
                    </Button>
                    {error && (
                      <div className="text-red-500 text-sm mt-2">{error}</div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
          {/* Confirmation Popup */}
          {showConfirm && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h4 className="text-lg font-semibold mb-4">
                  Confirm Subscription
                </h4>
                <p>
                  This will deduct <b>{packagePoints}</b> snap points from your
                  account.
                  <br />
                  You currently have <b>{userPoints.toFixed(2)}</b> snap points.
                </p>
                <div
                  onBlur={() => {
                    setShowConfirm(false);
                  }}
                  className="flex gap-4 mt-6"
                >
                  {userPoints >= packagePoints ? (
                    <div
                      onBlur={() => {
                        setShowConfirm(false);
                      }}
                    >
                      <Button
                        onClick={handleApiSubscribe}
                        className="bg-green-600 text-white mr-4"
                        disabled={loading}
                      >
                        {loading ? (
                          <Loader className="h-4 w-4 animate-spin" />
                        ) : (
                          "Confirm"
                        )}
                      </Button>
                      <Button
                        onClick={() => setShowConfirm(false)}
                        variant="outline"
                        disabled={loading}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Button
                        onClick={() => {
                          setShowConfirm(false);
                          setIsOpen(false);
                          router.push("/my-account/my-profile");
                        }}
                        className="bg-primary text-white"
                      >
                        Go to My Account
                      </Button>
                      <Button
                        onClick={() => setShowConfirm(false)}
                        variant="outline"
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
                {error && (
                  <div className="text-red-500 text-sm mt-2">{error}</div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubscriptionModal;
