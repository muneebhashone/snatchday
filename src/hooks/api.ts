import { useQuery, useMutation, useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchItemById,
  authMutation,
  getMyprofile,
  logout,
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

  TicketFormData,
  TicketParams,
  getTickets,
  getTicketById,
  replyTicket,
  createTicket,
} from "../lib/api";
import {
  TournamentFormData,
  ReturnOrderTypes,
  UpdateReturnTypes,
} from "@/types/admin";

import {
  CategoryFormData,
  CheckoutTypes,
  FilterFormData,
  PlaceOrder,
  ProductFormData,
  ResetPasswordTypes,
  WebSetting,
} from "@/types";
import { useUserContext } from "@/context/userContext";

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
        ...params
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
    mutationFn: ({ id, data }: { id: string; data: CategoryFormData }) =>
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

export const useGetFilters = () => {
  return useQuery({
    queryKey: ["filters"],
    queryFn: getFilters,
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
export const useCustomers = (filters) => {
  return useInfiniteQuery({
    queryKey: ["customers", filters],
    queryFn: ({ pageParam }) => {
      // return getCustomers({ ...filters, offset: pageParam });
      return getCustomers({ ...filters, offset: pageParam });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const customers = lastPage.data.customers[0].data;
      const total = lastPage.data.customers[0].total[0].total;
      return customers.length < 10 ? undefined : filters.offset;
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

export const useGetCustomerOrdersData = (page, status, user, date) => {
  return useQuery({
    queryKey: ["customerOrdersData"],
    queryFn: () => getCustomerOrdersData(page, status, user, date),
  });
};

//customer apis end

// order api start

export const useGetOrders = (page, status, date) => {
  return useQuery({
    queryKey: ["customers", page, status, date],
    queryFn: () => getOrders(page, status, date),
  });
};

export const useGetOrderById = (id) => {
  return useQuery({
    queryKey: ["order"],
    queryFn: () => getOrderById(id),
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

export const useGetVouchers = () => {
  return useQuery({
    queryKey: ["vouchers"],
    queryFn: getVouchers,
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
export const useWishList = () => {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: wishList,
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

