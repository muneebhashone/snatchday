import { useQuery, useMutation, useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchItemById,
  authMutation,
  getMyprofile,
  logout,
  updatePassword,
  subscribeNewsletter,
  createProduct,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  createFilter,
  getFilters,
  deleteFilter,
  updateFilter,
  getProducts,
  getNewsletters,
  forgetPassword,
  resetPassword,
  getCategoryById,
  createTournament,
  getTournaments,
  manageTournament,
  getFilterById,
  getProductById,
  cancelTournament,
  deleteProduct,
  updateProduct,
  TournamentParams,
  compareProducts,
  getCompareProducts,
  RecommendProduct,
  CurrenOffers,
  NewsletterMail,
  getCustomers,
  updateProfile,
  upComingTournament,
  getTournamentById,
  participateTournament,
  shareTournament,
  getParticipants,
  getCart,
  addToCart,
  updateCart,
  getPoints,
  checkout,
  getMyOrders,
  getOrderById,
  placeOrderApi,
  returnOrder,
  getMyReturns,
  getReturnById,
  applyVoucher,
  getCustomer,
  getCustomerById,
  updateCustomer,
  getCustomerTournaments,
  getCustomerOrdersData,
  vouchers,
  VoucherData,
  CreateVoucherData,
  getVouchers,
  deleteVoucher,
  updateVoucher,
  getVoucherById,
  getOrders,
  updateReturnHistory,
  PatchOrder,
  IFormData,
  CreateGame,
  GetGames,
  GetGamebyId,
  DeleteGame,
  UpdateGame,
  wishList,
  addToWishList,
  addContent,
  getContent,
  deleteContent,
  updateContent,
  getCustomerReturnById,
  getGamesPaths,
  TrainingCenter,
  TrainingCenterById,
  MyAccountGames,
  MyAccountTournaments,
  ITScope,
  VerifyEmail,
  requestEmailToken,
  getAddresses,
  createAddress,
  deleteAddress,
  TicketFormData,
  TicketParams,
  getTickets,
  getTicketById,
  replyTicket,
  createTicket,
  deleteCustomer,
  getWishList,
  deleteUser,
  createFaq,
  getFaq,
  updateFaq,
  deleteFaq,
  FaqParams,
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
  createTutorial,
  getTutorial,
  updateTutorial,
  TutorialParams,
  deleteTutorial,
  TopUp,
  Withdrawl,
  PaymentHistory,
  GetDuelGames,
  createPoints,
  getWithdrawalRequest,
  updateWithdrawalRequest,
  getWithdrawalRequestById,
  updateWithdrawalReject,
  checkEmail,
  getOrdersStats,
  createDuel,
  getDuelGames,
  getDuels,
  getReviewsStats,
  getDuelGameById,
  getDuelScore,
  subscriptionPlan,
  getSubscriptionPlan,
  updateSubscriptionPlan,
  deleteSubscriptionPlan,
  removeVoucherCode,
  GetMandate,
  CreateMandate,
  SubscribePackage,
  DeleteMandate,
  getAllSubscription,
  getSubscriptionById,
  cancelSubscription,
  getCustomerSubscription,
  getCurrentDuels,
  joinDuel,
  markAsRead,
  getSnapSubscriptions,
  cancelSnapSubscription,
  renewSnapSubscription,
  endDuel,
  PostTournamentScore,
  getSingleProduct,
  createCompetition,
  getCompetitionById,
  getCompetitions,
  updateCompetition,
  productAnalytics,
  participantInCompetition,
  CreateBanner,
  getBanners,
  UpdateBanner,
  DeleteBanner,
  getBannerById,
  getCompetitionParticipants,
  addToCartReward,
  removeFromCartReward,
  GetTournamentRecentWinner,
  GetCompetitionRecentWinner,
  GetVIPProducts,
} from "../lib/api";
import {
  TournamentFormData,
  ReturnOrderTypes,
  UpdateReturnTypes,
  CompetitionFormData,
} from "@/types/admin";

import {
  BannerFormData,
  CategoryFormData,
  CheckoutTypes,
  FaqFormData,
  FilterFormData,
  PlaceOrder,
  points,
  ProductFormData,
  ResetPasswordTypes,
  TutorialFormData,
  WebSetting,
} from "@/types";
import { useUserContext } from "@/context/userContext";
import { get } from "http";
import { toast } from "sonner";

// Fetch all items
export const useGetMyProfile = () => {
  const { user } = useUserContext();

  return useQuery({
    queryKey: ["myprofile"],
    queryFn: getMyprofile,
    enabled: Boolean(user?.user),
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {},
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
};

// Create a new item
export const useAuthApi = () => {
  return useMutation({
    mutationFn: ({
      data,
      type,
    }: {
      data:
        | { email: string; password: string }
        | { email: string; name: string; password: string };
      type: string;
    }) => authMutation(data, type),
  });
};

// Fetch a single item by ID
export const useGetItemById = (id: string) => {
  return useQuery({
    queryKey: ["item", id],
    queryFn: () => fetchItemById(id),
    enabled: !!id, // Only fetch if ID is provided
  });
};

// Create a new item
export const useRegister = () => {
  return useMutation({
    mutationFn: ({ data, type }: { data: any; type: string }) =>
      authMutation(data, type),
  });
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: ({
      email,
      emailVerificationToken,
    }: {
      email: string;
      emailVerificationToken: string;
    }) => VerifyEmail(email, emailVerificationToken),
  });
};

export const useRequestEmailToken = () => {
  return useMutation({
    mutationFn: ({ email }: { email: string }) => requestEmailToken(email),
  });
};

// export const useFilteredItems = (filters: Record<string, string>) => {
//   return useQuery({
//     queryKey: ["items", filters], // Dynamic query key based on filters
//     queryFn: () => filterItems(filters),
//     enabled: Object.keys(filters).length > 0, // Only fetch if filters are provided
//   });
// };

// export const useProducts = () => {
//   return useQuery({
//     queryKey: ['products'],
//     queryFn: products,
//   });
// };

export const useCreateProduct = () => {
  return useMutation<ProductFormData, unknown, FormData>({
    mutationFn: (formData: FormData) => createProduct(formData),
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (data: { currentPassword: string; newPassword: string }) =>
      updatePassword(data),
  });
};

export const useGetCategories = (params?: {
  limit?: string;
  offset?: string;
  name?: string;
  above?: boolean;
}) => {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () =>
      getCategories({
        ...params,
      }),
  });
};

export const useGetCategoryById = (id: string) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  });
};

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: createCategory,
  });
};

export const useUpdateCategory = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      updateCategory(id, data),
  });
};

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
  });
};

export const useCreateFilter = () => {
  return useMutation({
    mutationFn: createFilter,
  });
};

export const useGetFilters = (params?: { limit?: string; offset?: string }) => {
  return useQuery({
    queryKey: ["filters", params],
    queryFn: () => getFilters(params),
  });
};

export const useDeleteFilter = () => {
  return useMutation({
    mutationFn: (id: string) => deleteFilter(id),
  });
};

export const useUpdateFilter = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FilterFormData }) =>
      updateFilter(id, data),
  });
};

export interface ProductFilters {
  price?: string;
  limit?: string;
  offset?: string;
  sort_attr?: string;
  sort?: string;
  name?: string;
  category?: string;
  type?: string;
  attributes?: string;
}

interface NewsletterFilters {
  limit?: string;
  offset?: string;
  sort_attr?: string;
  sort?: string;
  name?: string;
  category?: string;
  type?: string;
  attributes?: string;
  price?: string;
}

export const useGetInfiniteProducts = (filters?: ProductFilters) => {
  return useInfiniteQuery({
    queryKey: ["products", filters],
    queryFn: ({ pageParam = 0 }) =>
      getProducts({ ...filters, offset: pageParam.toString() }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      console.log(lastPage, "lastPage");
      const total = lastPage.data.total;
      const currentOffset = allPages.length * 10;
      return currentOffset >= total ? undefined : currentOffset;
    },
  });
};
export const useGetProducts = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
  });
};

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      updateProduct(id, data),
  });
};

export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};
// console.log("aaa")

export const useGetNewsletters = (filters?: NewsletterFilters) => {
  return useQuery({
    queryKey: ["newsletters", filters],
    queryFn: () => getNewsletters(filters),
  });
};

export const useForgetPassword = () => {
  return useMutation({
    mutationFn: (email: string) => forgetPassword(email),
    onSuccess: (data) => {
      console.log(data, "data from hooks");
    },
    onError: (error) => {
      console.log(error, "error from hooks");
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordTypes) => resetPassword(data),
    onSuccess: (data) => {
      console.log(data, "data from hooks");
    },
    onError: (error) => {
      console.log(error, "error from hooks");
    },
  });
};

export const useGetFilterById = (id: string) => {
  return useQuery({
    queryKey: ["filter", id],
    queryFn: () => getFilterById(id),
    enabled: !!id,
  });
};

export const useSubscribeNewsletter = () => {
  return useMutation({
    mutationFn: (email: string) => subscribeNewsletter(email),
    onSuccess: () => {},
    onError: (error) => {},
  });
};

export const useCreateTournament = () => {
  return useMutation({
    mutationFn: (data: TournamentFormData) => createTournament(data),
  });
};

export const useCancelTournament = () => {
  return useMutation({
    mutationFn: (id: string) => cancelTournament(id),
  });
};

export const useManageTournament = () => {
  return useMutation({
    mutationFn: ({ data }: { data: TournamentFormData }) =>
      manageTournament(data),
  });
};

export const useGetTournaments = (params?: TournamentParams) => {
  return useQuery({
    queryKey: ["tournaments", params],
    queryFn: () => getTournaments(params),
  });
};

export const useUpComingTournament = () => {
  return useQuery({
    queryKey: ["upComingTournament"],
    queryFn: () => upComingTournament(),
  });
};

export const useGetTournamentById = (id: string) => {
  return useQuery({
    queryKey: ["tournament", id],
    queryFn: () => getTournamentById(id),
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: (formData: FormData) => updateProfile(formData),
  });
};

//Compare Products

export const useCompareProducts = () => {
  return useMutation({
    mutationFn: (id: string) => compareProducts(id),
  });
};

export const useGetCompareProducts = () => {
  return useQuery({
    queryKey: ["compareProducts"],
    queryFn: getCompareProducts,
  });
};

//Recommend Product
export const useRecommendProduct = () => {
  return useMutation({
    mutationFn: RecommendProduct,
  });
};

//Current Offers
export const useCurrentOffers = () => {
  return useQuery({
    queryKey: ["currentProducts"],
    queryFn: CurrenOffers,
  });
};

//newsletter mail
export const useNewsletterMail = () => {
  return useMutation({
    mutationFn: NewsletterMail,
  });
};

//customers
// export const useCustomers = (limit, offset, search) => {
//   return useInfiniteQuery({
//     queryKey: ["customers", limit, offset, search],
//     queryFn: ({ pageParam=20 }) => {
//       console.log(pageParam, "pageParam");
//       return getCustomers({ limit, offset: pageParam, search });
//     },
//     initialPageParam: 1,
//     getNextPageParam: (lastPage, allPages) => {
//       console.log(lastPage, allPages, "lastPage");
//       const customers = lastPage.data.customers[0].data;
//       const total = lastPage.data.customers[0].total[0].total;
//       return customers.length < 10 ? undefined : customers.length;
//     },
//   });
// };

export const useCustomers = ({
  limit,
  search,
}: {
  limit: number;
  search?: string;
}) => {
  return useInfiniteQuery({
    queryKey: ["customers", limit, search],
    queryFn: async ({ pageParam = 0 }) => {
      return await getCustomers({ limit, offset: pageParam, search });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // const customers = lastPage.data.customers[0].data;
      // console.log(customers, "customers");
      const total = lastPage.data.customers[0].total[0]?.total;
      const currentOffset = allPages.length * 10;
      return currentOffset >= total ? undefined : currentOffset;
    },
  });
};

export const useCustomersPagination = (
  page: number,
  search?: string,
  group?: string,
  date?: string,
  isActive?: string
) => {
  return useQuery({
    queryKey: ["customers", page, search, group, date, isActive],
    queryFn: () => getCustomer(page, search, group, date, isActive),
    enabled: true,
  });
};

export const useGetCustomerById = (id) => {
  return useQuery({
    queryKey: ["customer"],
    queryFn: () => getCustomerById(id),
  });
};

export const useUpdateCustomer = (id) => {
  return useMutation({
    mutationFn: (body) => updateCustomer(id, body),
    onMutate: (data) => {
      console.log(data, "data");
    },
  });
};

export const useGetCustomerTournaments = (id, offset) => {
  return useQuery({
    queryKey: ["customerTournaments", offset],
    queryFn: () => getCustomerTournaments(id, offset),
  });
};

export const useGetCustomerOrdersData = (page, status, user, date, limit?) => {
  return useQuery({
    queryKey: ["customerOrdersData", page],
    queryFn: () => getCustomerOrdersData(page, status, user, date, limit),
  });
};

//customer apis end

// order api start

export const useGetOrders = (page, status, date, user) => {
  return useQuery({
    queryKey: ["customers", page, status, date, user],
    queryFn: () => getOrders(page, status, date, user),
  });
};

export const useGetOrderById = (id: string) => {
  return useQuery({
    queryKey: ["order"],
    queryFn: () => getOrderById(id),
    enabled: !!id,
  });
};

export const usePatchOrder = (id) => {
  return useMutation({
    mutationFn: (formData: IFormData) => PatchOrder(id, formData),
  });
};

// order api end
export const useParticipateTournament = () => {
  return useMutation({
    mutationFn: (id: string) => participateTournament(id),
  });
};

export const useShareTournament = () => {
  return useMutation({
    mutationFn: ({ id, email }: { id: string; email: string }) =>
      shareTournament(id, email),
  });
};

export const useGetParticipants = (id: string) => {
  return useQuery({
    queryKey: ["participants", id],
    queryFn: () => getParticipants(id),
  });
};

export const useGetCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });
};

export const useAddToCart = () => {
  return useMutation({
    mutationFn: (id: string) => addToCart(id),
  });
};

export const useUpdateCart = () => {
  return useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      updateCart(id, quantity),
  });
};

export const useGetPoints = () => {
  return useQuery({
    queryKey: ["points"],
    queryFn: getPoints,
  });
};

export const useCheckout = () => {
  return useMutation({
    mutationFn: (data: CheckoutTypes) => checkout(data),
  });
};

export const usePlaceOrder = () => {
  return useMutation({
    mutationFn: (data: PlaceOrder) => placeOrderApi(data),
  });
};

export const useGetMyOrders = (params) => {
  return useQuery({
    queryKey: ["myOrders", params],
    queryFn: () => getMyOrders(params),
  });
};

// export const useGetOrderById = (id: string) => {
//   return useQuery({
//     queryKey: ["order", id],
//     queryFn: () => getOrderById(id),
//   });
// };

export const useReturnOrder = () => {
  return useMutation({
    mutationFn: (data: ReturnOrderTypes) => returnOrder(data),
  });
};

export const useGetMyReturns = (params) => {
  return useQuery({
    queryKey: ["myReturns", params],
    queryFn: () => getMyReturns(params),
  });
};

export const useGetReturnById = (id: string) => {
  return useQuery({
    queryKey: ["return", id],
    queryFn: () => getReturnById(id),
  });
};

export const useApplyVoucher = () => {
  return useMutation({
    mutationFn: (data: { code: string }) => applyVoucher(data),
  });
};
export const useCreateVoucher = () => {
  return useMutation({
    mutationFn: (data: CreateVoucherData) => vouchers(data),
  });
};

export const useGetVouchers = (params: {
  limit?: string;
  offset?: string;
  name?: string;
  code?: string;
  type?: string;
  registered?: string;
  from?: string;
  until?: string;
  noShipping?: string;
  products?: string;
  categories?: string;
  sort_attr?: string;
  sort?: string;
}) => {
  return useQuery({
    queryKey: ["vouchers", params],
    queryFn: () => getVouchers(params),
  });
};

export const useDeleteVoucher = () => {
  return useMutation({
    mutationFn: (id: string) => deleteVoucher(id),
  });
};

export const useUpdateVoucher = (id: string) => {
  return useMutation({
    mutationFn: (data: VoucherData) => updateVoucher(id, data),
  });
};

export const useGetVoucherById = (id: string) => {
  return useQuery({
    queryKey: ["voucher", id],
    queryFn: () => getVoucherById(id),
    enabled: !!id,
  });
};

export const useUpdateReturnHistory = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateReturnTypes }) =>
      updateReturnHistory(id, data),
  });
};

// games api start

export const UseCreateGame = () => {
  return useMutation({
    mutationFn: CreateGame,
  });
};

export const useGetGames = (offset?: number, limit?: number) => {
  return useQuery({
    queryKey: ["games", offset], // Include offset in the queryKey
    queryFn: () => GetGames(offset, limit), // Pass offset to the API function
  });
};
export const useGetGameById = (id) => {
  return useQuery({
    queryKey: ["game"],
    queryFn: () => GetGamebyId(id),
  });
};
export const useUpdateGame = (id) => {
  return useMutation({
    mutationFn: (data: FormData) => UpdateGame(id, data),
  });
};
export const useDeleteGame = () => {
  return useMutation({
    mutationFn: (id) => DeleteGame(id),
  });
};

export const useGetGamesPaths = () => {
  return useQuery({
    queryKey: ["gamePath"],
    queryFn: getGamesPaths,
  });
};

// games api end
export const useGetWishList = () => {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishList,
  });
};

export const useAddToWishList = () => {
  return useMutation({
    mutationFn: (id: string) => addToWishList(id),
  });
};

export const useAddContent = () => {
  return useMutation({
    mutationFn: addContent,
  });
};

export const useGetContent = () => {
  return useQuery({
    queryKey: ["content"],
    queryFn: getContent,
  });
};

export const useDeleteContent = () => {
  return useMutation({
    mutationFn: (id: string) => deleteContent(id),
  });
};

export const useUpdateContent = () => {
  return useMutation({
    mutationFn: (data: WebSetting & { id: string }) => {
      const { id, ...updateData } = data;
      return updateContent(id, updateData);
    },
  });
};

export const useGetCustomerReturnById = (id: string) => {
  return useQuery({
    queryKey: ["customerReturn", id],
    queryFn: () => getCustomerReturnById(id),
  });
};

//training center user

export const useTrainingCenter = () => {
  return useQuery({
    queryKey: ["trainingCenter"],
    queryFn: TrainingCenter,
  });
};
export const useTrainingCenterById = (id) => {
  return useQuery({
    queryKey: ["trainingCenter", id],
    queryFn: () => TrainingCenterById(id),
  });
};

// training center end

//my account hook
export const useMyAccountGames = () => {
  return useQuery({
    queryKey: ["MyGames"],
    queryFn: MyAccountGames,
  });
};

export const useMyAccountTournaments = (offset) => {
  return useQuery({
    queryKey: ["MyTournaments", offset],
    queryFn: () => MyAccountTournaments(offset),
  });
};
//my account hook end

// IT Scope hook
export const UseITScope = () => {
  return useMutation({
    mutationFn: ITScope,
  });
};
// IT Scope hook end

export const useGetAddresses = () => {
  const { user } = useUserContext();
  return useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
    enabled: !!user,
  });
};
export const useCreateAddress = () => {
  return useMutation({
    mutationFn: createAddress,
  });
};

export const useDeleteAddress = () => {
  return useMutation({
    mutationFn: (id: string) => deleteAddress(id),
  });
};

export const useCreateTicket = () => {
  return useMutation({
    mutationFn: (formData: FormData) => createTicket(formData),
  });
};

export const useGetTickets = (params: TicketParams) => {
  return useQuery({
    queryKey: ["tickets", params],
    queryFn: () => getTickets(params),
  });
};

export const useGetTicketById = (id: string) => {
  return useQuery({
    queryKey: ["ticket", id],
    queryFn: () => getTicketById(id),
  });
};

export const useReplyTicket = () => {
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      replyTicket(id, formData),
  });
};

// customer delete
export const useDeleteCustomer = () => {
  return useMutation({
    mutationFn: (id: string) => deleteCustomer(id),
  });
};
// customer delete end

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUser,
  });
};

export const useCreateFaq = () => {
  return useMutation({
    mutationFn: (data: FaqFormData) => createFaq(data),
  });
};

export const useGetFaq = (params: FaqParams) => {
  return useQuery({
    queryKey: ["faq", params],
    queryFn: () => getFaq(params),
  });
};

export const useUpdateFaq = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FaqFormData }) =>
      updateFaq(id, data),
  });
};

export const useDeleteFaq = () => {
  return useMutation({
    mutationFn: (id: string) => deleteFaq(id),
  });
};
//reviews api
export const useCreateReview = () => {
  return useMutation({
    mutationFn: createReview,
  });
};
export const useGetReviews = (params?: {
  limit?: number;
  offset?: number;
  sort_attr?: string;
  sort?: string;
  productId?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["reviews", params],
    queryFn: () => getReviews(params),
  });
};
export const useGetInfiniteReviews = (params?: {
  limit?: number;
  offset?: number;
  sort_attr?: string;
  sort?: string;
  product?: string;
}) => {
  return useInfiniteQuery({
    queryKey: ["reviews", params],
    queryFn: ({ pageParam = 0 }) =>
      getReviews({ ...params, offset: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const total = lastPage.data.total;
      const currentOffset = allPages.length * 10;
      return currentOffset >= total ? undefined : currentOffset;
    },
  });
};

export const useGetReviewById = (id?: string) => {
  return useQuery({
    queryKey: ["review", id],
    queryFn: () => getReviewById(id as string),
    enabled: !!id,
  });
};

export const useUpdateReview = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateReview(id, data),
  });
};

export const useDeleteReview = () => {
  return useMutation({
    mutationFn: (id: string) => deleteReview(id),
  });
};

//reviews api end

// tutorial api start
export const useCreateTutorial = () => {
  return useMutation({
    mutationFn: (data: TutorialFormData) => createTutorial(data),
  });
};

export const useGetTutorial = (params?: TutorialParams) => {
  return useQuery({
    queryKey: ["tutorial", params],
    queryFn: () => getTutorial(params),
  });
};

export const useUpdateTutorial = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TutorialFormData }) =>
      updateTutorial(id, data),
  });
};

export const useDeleteTutorial = () => {
  return useMutation({
    mutationFn: (id: string) => deleteTutorial(id),
  });
};

// top up api
export const useTopUp = () => {
  return useMutation({
    mutationFn: TopUp,
  });
};
// top up api end

// withdrawl api
export const useWithdrawl = () => {
  return useMutation({
    mutationFn: Withdrawl,
  });
};
// withdrawl api end

// payment history api
export const usePaymentHistory = (params?: {
  status?: string;
  occurance?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
  userId?: string;
}) => {
  return useQuery({
    queryKey: ["paymentHistory", params],
    queryFn: () => PaymentHistory(params),
  });
};
// payment history api end

// duel arena api
export const useGetDuelGames = () => {
  return useQuery({
    queryKey: ["duelGames"],
    queryFn: () => GetDuelGames(),
  });
};

export const useGetDuels = (params?: {
  status?: string;
  search?: string;
  limit?: number;
  offset?: number;
  priceRange?: string;
}) => {
  return useQuery({
    queryKey: ["duels", params],
    queryFn: () => getDuels(params),
  });
};
// duel arena api end
export const usePoints = () => {
  return useQuery({
    queryKey: ["points"],
    queryFn: getPoints,
  });
};

export const useCreatePoints = () => {
  return useMutation({
    mutationFn: createPoints,
  });
};

export const useGetWithdrawalRequest = (params?: { status?: string }) => {
  return useQuery({
    queryKey: ["withdrawalRequests", params],
    queryFn: () => getWithdrawalRequest(params),
  });
};

export const useUpdateWithdrawalRequest = () => {
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateWithdrawalRequest(id, { status }),
  });
};

export const useGetWithdrawalRequestById = (id: string) => {
  return useQuery({
    queryKey: ["withdrawalRequest", id],
    queryFn: () => getWithdrawalRequestById(id),
    enabled: !!id,
  });
};
export const useUpdateWithdrawalReject = () => {
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateWithdrawalReject(id, { status }),
  });
};
export const useCheckEmail = () => {
  return useMutation({
    mutationFn: ({ email }: { email: string }) => checkEmail(email),
  });
};

export const useGetOrdersStats = () => {
  return useQuery({
    queryKey: ["ordersStats"],
    queryFn: getOrdersStats,
  });
};

export const useCreateDuel = () => {
  return useMutation({
    mutationFn: createDuel,
  });
};

export const useGetReviewsStats = () => {
  return useQuery({
    queryKey: ["reviewsStats"],
    queryFn: getReviewsStats,
  });
};

export const useGetDuelGameById = (id: string) => {
  return useQuery({
    queryKey: ["duelGame", id],
    queryFn: () => getDuelGameById(id),
    enabled: !!id,
  });
};

export const useGetDuelScore = (id: string) => {
  return useMutation({
    mutationFn: ({ score, time }: { score: number; time: number }) =>
      getDuelScore(id, { score, time }),
  });
};

export const useCreateSubscriptionPlan = () => {
  return useMutation({
    mutationFn: subscriptionPlan,
  });
};

export const useGetSubscriptionPlan = (params?: { search?: string }) => {
  return useQuery({
    queryKey: ["subscriptionPlan", params],
    queryFn: () => getSubscriptionPlan(params),
  });
};

export const useUpdateSubscriptionPlan = () => {
  return useMutation({
    mutationFn: ({ packageId, data }: { packageId: string; data: any }) =>
      updateSubscriptionPlan(packageId, data),
  });
};

export const useDeleteSubscriptionPlan = () => {
  return useMutation({
    mutationFn: (packageId: string) => deleteSubscriptionPlan(packageId),
  });
};

export const useRemoveVoucher = () => {
  return useMutation({
    mutationFn: () => removeVoucherCode(),
  });
};

export const useGetMandate = () => {
  return useQuery({
    queryKey: ["mandate"],
    queryFn: () => GetMandate(),
  });
};

export const useCreateMandate = () => {
  return useMutation({
    mutationFn: (data: any) => CreateMandate(data),
  });
};

export const useSubscribePackage = () => {
  return useMutation({
    mutationFn: ({
      packageId,
      mandateId,
    }: {
      packageId: string;
      mandateId: string;
    }) => SubscribePackage(packageId, mandateId),
  });
};

export const useDeleteMandate = () => {
  return useMutation({
    mutationFn: (mandateId: string) => DeleteMandate(mandateId),
  });
};

export const useGetAllSubscription = () => {
  return useQuery({
    queryKey: ["allSubscription"],
    queryFn: () => getAllSubscription(),
  });
};

export const useGetSubscriptionById = (subscriptionId: string) => {
  return useQuery({
    queryKey: ["subscriptionById", subscriptionId],
    queryFn: () => getSubscriptionById(subscriptionId),
  });
};

export const useCancelSubscription = () => {
  return useMutation({
    mutationFn: (subscriptionId: string) => cancelSubscription(subscriptionId),
  });
};

export const useGetCustomerSubscription = (customerId: string) => {
  return useQuery({
    queryKey: ["customerSubscription", customerId],
    queryFn: () => getCustomerSubscription(customerId),
  });
};

export const useGetCurrentDuels = (params?: {
  limit?: number;
  offset?: number;
  search?: string;
  priceRange?: string;
}) => {
  return useQuery({
    queryKey: ["currentDuels", params],
    queryFn: () => getCurrentDuels(params),
  });
};

export const useJoinDuel = (duelId: string) => {
  return useMutation({
    mutationFn: () => joinDuel(duelId),
  });
};

export const useMarkAsRead = (id: string) => {
  return useMutation({
    mutationFn: () => markAsRead(id),
  });
};

export const useGetSnapSubscriptions = () => {
  return useQuery({
    queryKey: ["snapSubscriptions"],
    queryFn: () => getSnapSubscriptions(),
  });
};

export const useCancelSnapSubscription = () => {
  return useMutation({
    mutationFn: () => cancelSnapSubscription(),
  });
};

export const useRenewSnapSubscription = () => {
  return useMutation({
    mutationFn: ({ packageId }: { packageId: string }) =>
      renewSnapSubscription(packageId),
  });
};

export const useEndDuel = (duelId: string) => {
  return useMutation({
    mutationFn: () => endDuel(duelId),
  });
};

export const usePostTournamentScore = (id: string) => {
  return useMutation({
    mutationFn: ({ score, time }: { score: number; time: number }) =>
      PostTournamentScore({ score, time }, id),
  });
};

export const useGetSingleProduct = (productId: string) => {
  return useQuery({
    queryKey: ["singleProduct", productId],
    queryFn: () => getSingleProduct(productId),
  });
};

export const useCreateCompetition = () => {
  return useMutation({
    mutationFn: (data: CompetitionFormData) => createCompetition(data),
  });
};

export const useUpdateCompetition = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CompetitionFormData }) =>
      updateCompetition(id, data),
  });
};

export const useGetCompetitions = (params?: {
  month?: string;
  status?: string;
}) => {
  return useQuery({
    queryKey: ["competitions", params],
    queryFn: () => getCompetitions(params),
  });
};

export const useGetCompetitionById = (id: string) => {
  return useQuery({
    queryKey: ["competitionById", id],
    queryFn: () => getCompetitionById(id),
    enabled: !!id,
  });
};

export const useGetCompetitionParticipants = (id: string) => {
  return useQuery({
    queryKey: ["competitionParticipants", id],
    queryFn: () => getCompetitionParticipants(id),
  });
};
export const useProductAnalytics = (params?: {
  timeFilter?: string;
  limit?: number;
  offset?: number;
}) => {
  return useQuery({
    queryKey: ["productAnalytics", params],
    queryFn: () => productAnalytics(params),
  });
};

export const useParticipantInCompetition = (id: string) => {
  return useMutation({
    mutationFn: (data: { answer: string }) =>
      participantInCompetition(id, data),
  });
};

//banner api start

export const useGetBanners = () => {
  return useQuery({
    queryKey: ["banners"],
    queryFn: () => getBanners(),
  });
};

export const useGetBannerById = (id: string) => {
  return useQuery({
    queryKey: ["banner", id],
    queryFn: () => getBannerById(id),
    enabled: Boolean(id),
  });
};

export const useCreateBanner = () => {
  return useMutation({
    mutationFn: (data: BannerFormData) => CreateBanner(data),
  });
};

export const useUpdateBanner = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: BannerFormData }) =>
      UpdateBanner(id, data),
  });
};

export const useDeleteBanner = () => {
  return useMutation({
    mutationFn: (id: string) => DeleteBanner(id),
  });
};

//banner api end

//rewards api start
export const useAddToCartReward = () => {
  return useMutation({
    mutationFn: (productRewardId: string) => addToCartReward(productRewardId),
  });
};

export const useRemoveFromCartReward = () => {
  return useMutation({
    mutationFn: (productRewardId: string) =>
      removeFromCartReward(productRewardId),
  });
};

//rewards api end

export const useGetTournamentRecentWinner = () => {
  return useQuery({
    queryKey: ["tournamentRecentWinner"],
    queryFn: () => GetTournamentRecentWinner(),
  });
};

export const useGetCompetitionRecentWinner = () => {
  return useQuery({
    queryKey: ["competitionRecentWinner"],
    queryFn: () => GetCompetitionRecentWinner(),
  });
};

export const useGetVIPProducts = (params?: {
  price?: string;
  limit?: string;
  offset?: string;
  sort_attr?: string;
  sort?: string;
  name?: string;
  category?: string;
  type?: string;
}) => {
  return useQuery({
    queryKey: ["vipProducts", params],
    queryFn: () => GetVIPProducts(params),
  });
};

