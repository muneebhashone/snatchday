import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useGetMyProfile } from "@/hooks/api";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios"; // Assuming you use this for API calls

const SubscriptionModal = ({
  isOpen,
  setIsOpen,
  packageId,
  packagePoints,
  onSubscribed, // callback for parent to refresh or update state
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  packageId: string;
  packagePoints: number;
  onSubscribed?: () => void;
}) => {
  const { data: myprofile, isLoading } = useGetMyProfile();
  const userPoints = myprofile?.data?.wallet?.snapPoints ?? 0;
  const router = useRouter();

  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
        err?.response?.data?.message ||
          "Subscription failed. Please try again."
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
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            className="h-12 w-12 shadow-xl rounded-full bg-white p-0 hover:bg-gray-100 absolute -right-5 -top-5 "
          >
            <X className="h-6 w-6" />
          </Button>
          <div className="p-6 border-b bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800">
              Payment Method
            </h3>
            <div>
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
          {/* Confirmation Popup */}
          {showConfirm && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h4 className="text-lg font-semibold mb-4">
                  Confirm Subscription
                </h4>
                <p>
  This will deduct <b>{packagePoints}</b> snap points from your account.
  <br />
  You currently have <b>{userPoints.toFixed(2)}</b> snap points.
</p>
                <div className="flex gap-4 mt-6">
                  {userPoints >= packagePoints ? (
                    <>
                      <Button
                        onClick={handleApiSubscribe}
                        className="bg-green-600 text-white"
                        disabled={loading}
                      >
                        {loading ? "Processing..." : "Confirm"}
                      </Button>
                      <Button
                        onClick={() => setShowConfirm(false)}
                        variant="outline"
                        disabled={loading}
                      >
                        Cancel
                      </Button>
                    </>
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
