import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CustomerGeneralTabForm from "./CustomerGeneralTabForm";
import {
  User,
  ShoppingCart,
  CircleDollarSign,
  Trophy,
  Star,
  Gift,
  Search,
  Shield,
  MapPin,
  Bell,
  RefreshCw,
  Swords,
  Network,
  History,
  Loader,
} from "lucide-react";
import CustomerTournaments from "./CustomerTournaments";
import CustomerIPAdresses from "./CustomerIPAdresses";
import CustomerOrdersDataList from "./CustomerOrdersDataList";
import CustomerReturns from "./CustomerReturns";
import { useParams } from "next/navigation";
import {
  useGetCustomerById,
  useGetCustomerOrdersData,
  useDeleteCustomer,
} from "@/hooks/api";
import { useState } from "react";
import userImage from "@/app/images/avatarimage.svg";
import { toast } from "sonner";

export function CustomerdEdit() {
  const params = useParams();
  const paramsId = params.id;
  const { data: customer } = useGetCustomerById(paramsId);
  const customerData = customer?.data.customer;
  console.log(customerData);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const user = paramsId;
  const date = "";
  const status = "";
  const { data: orders, isLoading } = useGetCustomerOrdersData(
    page,
    status,
    user,
    date
  );
  console.log(orders);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const [orderlength, setOrderlength] = useState(0);

  const { mutate: deleteCustomer, isPending } = useDeleteCustomer();

  const handleDeleteCustomer = (id: string) => {
    deleteCustomer(id, {
      onSuccess: () => {
        toast.success("Customer deleted successfully");
        window.location.href = "/admin/customers";
      },
      onError: () => {
        toast.error("Failed to delete customer");
      },
    });
  };

  return (
    <>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Customer Details</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <CustomerGeneralTabForm />
          </div>
        </DialogContent>
      </Dialog>

      <div className="w-full bg-gray-50 min-h-screen p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg text-gray-700">
              Customer ID #{customerData?.customerNumber || paramsId}
            </h2>
            <p className="text-sm text-gray-500">
              Created:{" "}
              {customerData?.createdAt
                ? formatDate(customerData.createdAt)
                : "N/A"}
            </p>
          </div>
          <button
            onClick={() => handleDeleteCustomer(paramsId as string)}
            className={`px-4 py-2 text-red-500 bg-white border border-red-500 rounded-md hover:bg-red-50 ${
              isPending ? "cursor-not-allowed" : ""
            }`}
            disabled={isPending}
          >
            {isPending ? (
              <Loader className="animate-spin" size={16} />
            ) : (
              "Delete Customer"
            )}
          </button>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-3">
            <Card className="mb-4">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-blue-100 rounded-lg mb-4">
                    <img
                      src={customerData?.image || userImage.src}
                      alt={customerData?.name || "Customer"}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">
                    {customerData?.name || "Loading..."}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Customer #{customerData?.customerNumber}
                  </p>

                  <div className="grid grid-cols-2 gap-4 w-full mt-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <ShoppingCart size={16} className="text-blue-500" />
                        <span className="font-semibold">
                          {customerData?.usedVouchers?.length || 0}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">Vouchers Used</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <CircleDollarSign
                          size={16}
                          className="text-green-500"
                        />
                        <span className="font-semibold">
                          {customerData?.group || "BASIC"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">Group</p>
                    </div>
                  </div>

                  <div className="w-full mt-6">
                    <h4 className="text-sm font-medium mb-2">Details</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Full Name:</p>
                        <p className="text-sm">{`${
                          customerData?.firstName || ""
                        } ${customerData?.lastName || ""}`}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email:</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm">
                            {customerData?.email || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status:</p>
                        <div className="flex flex-col gap-1">
                          <span
                            className={`inline-block px-2 py-1 text-xs w-max ${
                              customerData?.approved
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            } rounded`}
                          >
                            {customerData?.approved
                              ? "Approved"
                              : "Pending Approval"}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Role:</p>
                        <p className="text-sm capitalize">
                          {customerData?.role || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Username:</p>
                        <p className="text-sm">
                          {customerData?.username || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">ZIP:</p>
                        <p className="text-sm">{customerData?.zip || "N/A"}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsEditDialogOpen(true)}
                    className="w-full mt-6 px-4 py-2 bg-primary text-white rounded-md "
                  >
                    Edit Details
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <CircleDollarSign className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Account Status</h3>
                      <div className="flex flex-col gap-1">
                        <span
                          className={`inline-block px-2 py-1 text-xs w-max ${
                            customerData?.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          } rounded`}
                        >
                          {customerData?.isActive ? "Active" : "Inactive"}
                        </span>
                        <p className="text-sm text-gray-500">
                          Last Updated:{" "}
                          {customerData?.updatedAt
                            ? formatDate(customerData.updatedAt)
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Gift className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">IP Information</h3>
                      <p className="text-sm font-medium">
                        {customerData?.ip || "N/A"}
                      </p>
                      <p className="text-xs text-gray-500">
                        Last login IP address
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="col-span-9">
              <Tabs defaultValue="orders" className="w-full">
                <TabsList className="bg-white p-0 border-b">
                  <TabsTrigger
                    value="orders"
                    className="data-[state=active]:border-primary data-[state=active]:text-white border-b-2 border-transparent px-6 py-3"
                  >
                    <ShoppingCart size={16} className="mr-2" /> Orders
                  </TabsTrigger>
                  <TabsTrigger
                    value="returns"
                    className="data-[state=active]:border-primary data-[state=active]:text-white border-b-2 border-transparent px-6 py-3"
                  >
                    <RefreshCw size={16} className="mr-2" /> Returns
                  </TabsTrigger>
                  <TabsTrigger
                    value="duels"
                    className="data-[state=active]:border-primary data-[state=active]:text-white border-b-2 border-transparent px-6 py-3"
                  >
                    <Swords size={16} className="mr-2" /> Duels
                  </TabsTrigger>
                  <TabsTrigger
                    value="points"
                    className="data-[state=active]:border-primary data-[state=active]:text-white border-b-2 border-transparent px-6 py-3"
                  >
                    <History size={16} className="mr-2" /> Points History
                  </TabsTrigger>
                  <TabsTrigger
                    value="tournaments"
                    className="data-[state=active]:border-primary data-[state=active]:text-white border-b-2 border-transparent px-6 py-3"
                  >
                    <Swords size={16} className="mr-2" /> Tournaments
                  </TabsTrigger>
                  <TabsTrigger
                    value="ip"
                    className="data-[state=active]:border-primary data-[state=active]:text-white border-b-2 border-transparent px-6 py-3"
                  >
                    <Network size={16} className="mr-2" /> IP Addresses
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="orders" className="mt-2">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                          <ShoppingCart className="text-primary" size={20} />
                          <h3 className="font-semibold text-lg">
                            Orders History
                          </h3>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-gray-500">
                            Total Orders:{" "}
                            <span className="font-semibold text-primary">
                              {orderlength || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border border-gray-200">
                        <CustomerOrdersDataList orderlength={setOrderlength} />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="returns">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="font-semibold">Customer Returns</h3>
                      </div>
                      <CustomerReturns />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="duels">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                          <Swords size={20} className="text-primary" />
                          <h3 className="font-semibold text-lg">
                            Customer Duels
                          </h3>
                        </div>
                      </div>
                      <div className="flex items-center justify-center min-h-[200px] text-gray-500">
                        <div className="text-center">
                          <Swords
                            size={40}
                            className="mx-auto mb-4 text-gray-400"
                          />
                          <p className="text-lg font-medium">
                            Duels Feature Coming Soon
                          </p>
                          <p className="text-sm mt-2">
                            This feature is currently under development
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="points">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                          <History size={20} className="text-primary" />
                          <h3 className="font-semibold text-lg">
                            Points History
                          </h3>
                        </div>
                      </div>
                      <div className="flex items-center justify-center min-h-[200px] text-gray-500">
                        <div className="text-center">
                          <History
                            size={40}
                            className="mx-auto mb-4 text-gray-400"
                          />
                          <p className="text-lg font-medium">
                            Points History Coming Soon
                          </p>
                          <p className="text-sm mt-2">
                            This feature is currently under development
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="tournaments">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                          <Trophy size={20} className="text-primary" />
                          <h3 className="font-semibold text-lg">
                            Customer Tournaments
                          </h3>
                        </div>
                      </div>
                      <div className="rounded-lg border border-gray-200">
                        <CustomerTournaments />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ip">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                          <Network size={20} className="text-primary" />
                          <h3 className="font-semibold text-lg">
                            IP Address History
                          </h3>
                        </div>
                        <div className="text-sm text-gray-500">
                          Total IPs:{" "}
                          <span className="font-semibold text-primary">
                            {customerData?.allIps?.length || 0}
                          </span>
                        </div>
                      </div>
                      <div className="rounded-lg border border-gray-200">
                        <CustomerIPAdresses />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
