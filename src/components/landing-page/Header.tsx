"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  User,
  Heart,
  ShoppingCart,
  ChevronDown,
  Loader2,
  Terminal,
  CheckCheck,
} from "lucide-react";
import logo from "@/app/images/logo.png";
import Image from "next/image";
import { Hamburger } from "@/components/icons/icon";
import MobileMenu from "@/components/MobileMenu";

import Login from "../auth/Login";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { PromotionModal } from "@/components/PromotionModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, X } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ProductFilters,
  useGetCart,
  useGetCategories,
  useGetMyProfile,
  useGetProducts,
  useGetWishList,
  useMarkAsRead,
} from "@/hooks/api";
import { useRouter } from "next/navigation";
import { menu } from "@/dummydata";
import { Category, NotificationItem, SubCategory } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";
import { formatCurrency } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { toast } from "sonner";
import { motion } from "framer-motion";
import SubscriptionNotificationDialog from "../SubscriptionNotificationDialog";
import { useUserContext } from "@/context/userContext";
import CompetitionNotification from "../CompetitionNotification";
const Header = () => {
  const {
    data: myprofile,
    isLoading: isMyProfileLoading,
    refetch,
  } = useGetMyProfile();
  // console.log(myprofile?.data?.notifications, "myprofile");
  const { user } = useUserContext();
  const [showNotification, setShowNotification] = useState<string[]>([]);
  const [notificationReadID, setNotificationReadID] = useState<string>("");
  const { mutate: markAsRead, isPending: isMarkAsReadPending } =
    useMarkAsRead(notificationReadID);
  const { data: cartData } = useGetCart();
  const { data: wishlist } = useGetWishList();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isSubscriptionDialogOpen, setIsSubscriptionDialogOpen] =
    useState(false);
  const [isCompetitionDialogOpen, setIsCompetitionDialogOpen] = useState(false);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 1000);
  const [searchResults, setSearchResults] = useState([]);

  const [filter, setFilter] = useState<ProductFilters>({});

  const { data: products, isLoading: productLoading } = useGetProducts(filter);

  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { data: categories, isLoading } = useGetCategories({
    limit: "9999999",
    above: true,
  });
  const [categoryImage, setCategoryImage] = useState("");

  const [isNotificationDialogOpen, setIsNotificationDialogOpen] =
    useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const handleCartClick = () => {
    router.push("/order");
  };

  // Update filter when debounced search changes
  useEffect(() => {
    if (debouncedSearch) {
      setFilter({
        ...filter,
        name: debouncedSearch,
      });
    }
  }, [debouncedSearch]);

  // Update search results when products data changes
  useEffect(() => {
    if (products?.data?.products) {
      setSearchResults(products.data.products);
    }
  }, [products]);

  // Handle search when button is clicked
  const handleSearch = () => {
    if (search) {
      setFilter({
        ...filter,
        name: search,
      });
    }
  };

  // Navigate to product page when a search result is clicked
  const handleProductClick = (productId: string) => {
    if (productId) {
      setIsSearchOpen(false);
      router.push(`/product-listing/${productId}`);
    }
  };

  useEffect(() => {
    if (myprofile?.data?.notifications) {
      const duelNotifications = myprofile.data.notifications.filter(
        (item) => item.type === "duel"
      );
      if (duelNotifications.length > 0) {
        setIsNotificationDialogOpen(true);
      }
    }
    if (myprofile?.data?.notifications?.length > 0) {
      const subscriptionNotifications = myprofile.data.notifications.filter(
        (item) => item.type === "subscription"
      );
      if (subscriptionNotifications.length > 0) {
        setIsSubscriptionDialogOpen(true);
      }
    }
    if (myprofile?.data?.notifications?.length > 0) {
      const competitionNotifications = myprofile.data.notifications.filter(
        (item) => item.type === "competition"
      );
      if (competitionNotifications.length > 0) {
        setIsCompetitionDialogOpen(true);
      }
    }
  }, [myprofile?.data?.notifications]);

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

  const currentMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  ).toLocaleString("default", { month: "long" });

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50 bg-background shadow-sm">
      {/* Notification Dialog */}
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
              Duel Notifications
            </h2>
            <div className="max-h-[600px] overflow-y-auto space-y-4">
              {myprofile?.data?.notifications
                ?.filter((item) => item.type === "duel")
                .map((item: NotificationItem) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 relative border rounded-md p-4 bg-background"
                  >
                    <Image
                      src={item.data.data.duelGameImage}
                      alt="Duel Notification"
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                    <div
                      key={item._id}
                      className="flex flex-col gap-2 items-start justify-center"
                    >
                      <button
                        onClick={() => handleNotificationClick(item._id)}
                        className="absolute top-2 right-2 text-primary hover:bg-primary hover:text-white rounded-full p-1 border border-primary transition-colors"
                        title="Mark as Read"
                        disabled={isMarkAsReadPending}
                      >
                        <CheckCheck className="h-5 w-5" />
                      </button>
                      <div className="font-semibold capitalize">
                        {item?.data?.data?.duelGame}
                      </div>
                      <div className="text-sm text-gray-700">
                        {item.data.data.duelStatus === "completed" ? (
                          <>
                            {item.data.message === "Duel Draw" && (
                              <p>
                                The duel ended in a draw. Your points sent to
                                your Account.
                              </p>
                            )}
                            {item.data.message === "You won the duel" && (
                              <>
                                Congratulations! You won the duel and earned{" "}
                                {item.data.data.duelValue}{" "}
                                {item.data.data.duelType === "snap"
                                  ? "Snap Points (SP)"
                                  : "Discount Points (DP)"}
                                .
                              </>
                            )}
                            {item.data.message === "You lost the duel" && (
                              <>
                                Unfortunately, you lost the duel. Better luck
                                next time!
                              </>
                            )}
                          </>
                        ) : item.data.data.duelStatus === "cancelled" ? (
                          <>
                            The duel has been cancelled and your{" "}
                            {item.data.data.duelValue}{" "}
                            {item.data.data.duelType === "snap"
                              ? "Snap Points (SP)"
                              : "Discount Points (DP)"}{" "}
                            will be refunded to your account.
                          </>
                        ) : (
                          item.data.message || "No message"
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {formatDate(new Date(item.data.data.createdAt))}
                      </p>
                    </div>
                  </div>
                ))}
              {(!myprofile?.data?.notifications?.filter(
                (item) => item.type === "duel"
              ) ||
                myprofile.data.notifications.filter(
                  (item) => item.type === "duel"
                ).length === 0) && (
                <div className="text-center text-gray-500 py-4">
                  No duel notifications
                </div>
              )}
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
      <SubscriptionNotificationDialog
        isNotificationDialogOpen={isSubscriptionDialogOpen}
        setIsNotificationDialogOpen={setIsSubscriptionDialogOpen}
        myprofile={myprofile}
        refetch={refetch}
      />
      <CompetitionNotification
        isNotificationDialogOpen={isCompetitionDialogOpen}
        setIsNotificationDialogOpen={setIsCompetitionDialogOpen}
        myprofile={myprofile}
        refetch={refetch}
      />
      <div className="container max-w-[1920px] mx-auto px-12 py-6 flex items-center justify-between">
        <div className="border-r border-gray-200 ">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-2 pr-6">
            <Image src={logo} alt="Logo" width={180} height={58} unoptimized />
          </Link>

          {/* {/ Date Time Bar /} */}
          <div className="py-1 px-4 flex items-center justify-start text-xs text-foreground rounded-full">
            <div className="flex items-center gap-2 font-medium">
              <span className="border-r pr-2">
                {formatDate(currentDateTime)}
              </span>
              <span>{formatTime(currentDateTime)}</span>
            </div>
          </div>
        </div>

        {/* {/ Desktop Hamburger - Only visible on desktop /} */}
        <div className="hidden lg:block">
          <NavigationMenu>
            <NavigationMenuList className="">
              <NavigationMenuItem className="">
                <NavigationMenuTrigger className="bg-primary hover:bg-primary data-[state=open]:bg-primary">
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Hamburger />
                  )}
                </NavigationMenuTrigger>

                <NavigationMenuContent className="border-t border-gray-100">
                  <div className="max-w-[1920px] mx-auto p-8">
                    {isLoading ? (
                      <div className="flex justify-center items-center w-screen h-[60vh]">
                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                      </div>
                    ) : categories?.data?.categories?.length > 0 ? (
                      <div className="grid grid-cols-12 gap-8 w-screen">
                        {/* Categories List */}
                        <div className="col-span-8">
                          <div className="grid grid-cols-3 gap-x-8 gap-y-6">
                            {categories?.data?.categories
                              ?.filter(
                                (category: Category) =>
                                  category.above && !category.parentCategory
                              )
                              .map((category: Category) => (
                                <div key={category._id} className="group">
                                  <span
                                    onMouseEnter={() =>
                                      setCategoryImage(category.image)
                                    }
                                    className="text-gray-500"
                                  >
                                    <Link
                                      href={`/product-listing?category=${category._id}`}
                                      className="inline-flex items-center gap-2 text-base font-medium text-foreground group-hover:text-primary transition-colors mb-3"
                                    >
                                      {category.name}
                                    </Link>
                                  </span>

                                  <ul className="space-y-2">
                                    {category.subCategories
                                      .filter((cat) => cat.above)
                                      .map(
                                        (subcategory: SubCategory, index) => (
                                          <li
                                            key={index}
                                            onMouseEnter={() =>
                                              setCategoryImage(
                                                subcategory.image
                                              )
                                            }
                                          >
                                            <Link
                                              href={`/product-listing?category=${subcategory._id}`}
                                              className="text-gray-500 hover:text-primary transition-colors block text-sm"
                                            >
                                              {subcategory?.name || "N/A"}
                                            </Link>
                                          </li>
                                        )
                                      )}
                                  </ul>
                                </div>
                              ))}
                          </div>
                        </div>

                        {/* Category Image */}
                        <div className="col-span-4">
                          {categoryImage && (
                            <div className="relative h-full w-full">
                              <Image
                                src={categoryImage}
                                alt="Category preview"
                                fill
                                className="object-contain w-10 h-10"
                                unoptimized
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-center items-center w-screen h-[20vh]">
                        <h1 className="text-lg font-medium text-gray-600">
                          Data Not Found
                        </h1>
                      </div>
                    )}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* {/ Mobile Menu Button - Only visible on mobile /} */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden h-9 w-9 bg-primary rounded-md flex items-center justify-center"
        >
          <Hamburger />
        </button>

        {/* {/ Navigation /} */}
        {menu.map((items) => {
          return (
            <nav
              className="hidden lg:flex items-center justify-between"
              key={items.id}
            >
              {items.name === `Gewinnspiel in ${currentMonth}` ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className={`flex items-center text-lg font-medium hover:text-primary hover:underline hover:underline-offset-8 hover:decoration-2 ${
                        pathname === items.link
                          ? "text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {items.name}
                      <ChevronDown className="text-primary w-5 h-5" />
                      <div
                        className={`w-2 h-2 bg-primary rounded-full ${
                          pathname === items.link ? "opacity-100" : "opacity-0"
                        }`}
                      ></div>
                    </button>
                  </DialogTrigger>
                  <PromotionModal />
                </Dialog>
              ) : (
                <Link
                  href={items.link}
                  className={`relative flex items-center text-lg font-medium text-foreground hover:text-primary hover:underline hover:underline-offset-8 hover:decoration-2 ${
                    pathname === items.link
                      ? "text-primary underline underline-offset-8 decoration-2"
                      : "text-foreground"
                  }`}
                >
                  {items.name}
                  <ChevronDown
                    className={`w-5 h-5 ${
                      pathname === items.link ? "text-white" : "text-primary"
                    }`}
                  />
                  <div
                    className={`absolute right-0 top-0 w-2 h-2 bg-primary rounded-full ${
                      pathname === items.link ? "opacity-100" : "opacity-0"
                    }`}
                  ></div>
                </Link>
              )}
            </nav>
          );
        })}

        {/* {/ Search Dialog /} */}
        <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100 rounded-full bg-gray-200"
            >
              <SearchIcon className="h-6 w-6 text-[#A5A5A5]" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[800px] p-0 rounded-3xl border-none bg-white/95 backdrop-blur-md shadow-2xl">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  Search Products
                </h2>
              </div>
              <div className="relative">
                <Input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Duellarena, Turniere and more..."
                  className="w-full h-[60px] rounded-2xl pr-[140px] pl-14 border-2 border-gray-200 focus:border-primary text-lg placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors"
                />
                <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
                <Button
                  variant="default"
                  size="lg"
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-primary text-white px-6 h-[48px] transition-colors hover:bg-primary"
                >
                  Search
                </Button>
              </div>

              {/* Display search results */}
              {debouncedSearch && (
                <div className="mt-6 max-h-[400px] overflow-y-auto">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">
                    Search Results
                  </h3>
                  <div className="space-y-3">
                    {productLoading ? (
                      <div className="flex justify-center py-4">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      </div>
                    ) : products?.data?.products &&
                      products.data.products.length > 0 ? (
                      products.data.products.map((product) => (
                        <div
                          key={product._id}
                          onClick={() =>
                            product._id && handleProductClick(product._id)
                          }
                          className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                        >
                          {product.images && product.images[0] && (
                            <div className="relative h-16 w-16 rounded-md overflow-hidden">
                              <Image
                                src={product.images[0]}
                                alt={product.name || "Product"}
                                fill
                                className="object-contain"
                                unoptimized
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground line-clamp-1">
                              {product.name || "Unnamed Product"}
                            </h4>
                            <p className="text-sm text-gray-500 line-clamp-1">
                              {product.description || "No description"}
                            </p>
                            <p className="text-primary font-bold">
                              {product.price || "0.00"}€
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center py-4 text-gray-500">
                        No products found
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  Popular Searches
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    className="rounded-full text-sm hover:bg-primary hover:text-white border-gray-200"
                  >
                    Gaming Laptops
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full text-sm hover:bg-primary hover:text-white border-gray-200"
                  >
                    Graphics Cards
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full text-sm hover:bg-primary hover:text-white border-gray-200"
                  >
                    Monitors
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full text-sm hover:bg-primary hover:text-white border-gray-200"
                  >
                    Gaming Accessories
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* {/ Right Icons /} */}
        <div className="hidden lg:flex items-center justify-between gap-5">
          <button className="hover:text-primary bg-transparent p-0 text-[#888888]">
            <Login />
          </button>
          <Link
            href="/wishlist"
            className="relative hover:text-primary bg-transparent p-0 text-[#888888]"
          >
            <div className="absolute -top-4 -right-3 bg-primary text-white px-[7px] py-[2px] text-xs rounded-full">
              {wishlist?.data ? wishlist?.data.products?.length : 0}
            </div>
            <Heart className="h-6 w-6 " />
          </Link>
          <button
            onClick={handleCartClick}
            className="hover:text-primary bg-transparent p-0 text-[#888888] relative flex items-center gap-4 cursor-pointer"
          >
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -top-4 left-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartData?.data
                ? cartData?.data?.cart?.length +
                  cartData?.data?.rewardCart?.length
                : 0}
            </span>
          </button>
          <div className="text-sm text-foreground text-start">
            <p className="font-bold">Your Shopping Cart</p>
            <p className="text-sm text-primary font-bold">
              {formatCurrency(
                myprofile?.data?.cart?.total ?? cartData?.data?.total ?? 0
              )}
            </p>
          </div>
        </div>

        {/* {/ Mobile Icons /} */}
        <div className="flex lg:hidden items-center space-x-4">
          <button className="hover:text-primary text-[#888888]">
            <User className="h-6 w-6" />
          </button>
          <button className="hover:text-primary text-[#888888]">
            <Heart className="h-6 w-6" />
          </button>
          <button className="hover:text-primary text-[#888888] relative">
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {0}
            </span>
          </button>
        </div>

        {/* Replace the User Points Display with this new dropdown */}
        {/* <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary bg-primary px-2 rounded-md py-1">
            <div className="text-right">
              <div className="flex items-center gap-2 text-white ">
                <span className="font-medium ">My Points</span>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-80 p-6 bg-white shadow-lg border-2 border-gray-100"
            align="start"
            sideOffset={42}
          >
            {isMyProfileLoading ? (
              <div className="flex justify-center items-center h-full w-full">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Snap Points</span>
                    <span className="text-primary font-bold">
                      {myprofile?.data?.wallet?.snapPoints
                        ? myprofile?.data?.wallet?.snapPoints
                        : 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Equivalent Value</span>
                    <span className="text-primary font-medium">
                      {myprofile?.data?.wallet?.snapPoints
                        ? myprofile?.data?.wallet?.snapPoints / 100
                        : 0}€
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Discount Points</span>
                    <span className="text-primary font-bold">
                      {myprofile?.data?.wallet?.discountPoints
                        ? myprofile?.data?.wallet?.discountPoints
                        : 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Equivalent Value</span>
                    <span className="text-primary font-medium">
                      {myprofile?.data?.wallet?.discountPoints
                        ? myprofile?.data?.wallet?.discountPoints / 100
                        : 0}€
                    </span>
                  </div>
                </div>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu> */}
        <div className="flex flex-col items-start justify-center gap-2 border border-gray-200 rounded-md p-2">
          <div className="flex items-center justify-between w-full gap-2">
            <span className="text-gray-600 text-xs font-bold">
              Snap Points:
            </span>
            <span className="text-primary font-bold text-sm">
              {myprofile?.data?.wallet?.snapPoints
                ? myprofile?.data?.wallet?.snapPoints.toFixed(2)
                : 0}{" "}
              /{" "}
              {myprofile?.data?.wallet?.snapPoints
                ? formatCurrency(myprofile?.data?.wallet?.snapPoints / 100)
                : 0}
            </span>
          </div>
          <div className="flex items-center justify-between w-full gap-2">
            <span className="text-gray-600 text-xs font-bold">
              Discount Points:
            </span>
            <span className="text-primary font-bold text-sm">
              {myprofile?.data?.wallet?.discountPoints
                ? myprofile?.data?.wallet?.discountPoints.toFixed(2)
                : 0}{" "}
              /{" "}
              {myprofile?.data?.wallet?.discountPoints
                ? formatCurrency(myprofile?.data?.wallet?.discountPoints / 100)
                : 0}
            </span>
          </div>
        </div>
      </div>

      {/* {/ Mobile Menu /} */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        menu={menu}
      />
    </header>
  );
};

export default Header;
