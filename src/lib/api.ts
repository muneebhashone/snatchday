import {
  ReturnOrderTypes,
  TournamentFormData,
  UpdateReturnTypes,
} from "@/types/admin";
import axiosInstance from "./axios";

import {
  ProductFormData,
  FilterFormData,
  Category,
  NewsletterTypes,
  ResetPasswordTypes,
  ResponseTournament,
  CategoryFormData,
  ComapreProduct,
  TournamentDetailResponse,
  CheckoutTypes,
  PlaceOrder,
  WebSetting,
  MainProduct,
} from "@/types";
import { useMutation } from "@tanstack/react-query";
import { IRecommendProduct } from "@/components/RecommendProductModal";
import { group } from "console";


export const fetchItems = async () => {
  const response = await axiosInstance.get("/items");
  return response.data;
};

export const VerifyEmail = async (email: string, emailVerificationToken: string) => {
  const response = await axiosInstance.post("/auth/verifyEmail", { email, emailVerificationToken });
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.get("/auth/logout");
  return response.data;
};

export const getMyprofile = async () => {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
};

export const fetchItemById = async (id: string) => {
  const response = await axiosInstance.get(`/items/${id}`);
  return response.data;
};

export const requestEmailToken = async (email: string) => {
  const response = await axiosInstance.post("/auth/requestEmailToken", { email });
  return response.data;
};


export const authMutation = async (data: any, type: string) => {
  const response = await axiosInstance.post(`/auth/${type}`, data);
  return response.data;
};

export const updatePassword = async (data) => {
  const response = await axiosInstance.put(`/auth/updatePassword`, data);
  return response.data;
};


// export const products = async () => {
//   const response = await axiosInstance.post<ProductFormData>('/product/product');
//   return response.data;
// };

export const createProduct = async (formData: FormData) => {
  const response = await axiosInstance.post<MainProduct>("/product", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// export const getProduct = async (id: string) => {
//   const response = await axiosInstance.get(`/product/product/${id}`);
//   return response.data;
// };

export const createCategory = async (formData: FormData) => {
  const response = await axiosInstance.post<CategoryFormData>(
    "/category",
    formData
  );
  return response.data;
};

export interface ProductResponse {
  data: {
    products: Array<{
      _id: string;
      name: string;
      // ... other product fields
    }>;
  };
}

export interface CategoryResponse {
  data: {
    categories: Array<{
      _id: string;
      name: string;
      // ... other category fields
    }>;
  };
}

export const getProducts = async (params?: {
  price?: string;
  limit?: string;
  offset?: string;
  sort_attr?: string;
  sort?: string;
  name?: string;
  category?: string;
  type?: string;
}) => {
  const response = await axiosInstance.get<ProductResponse>("/product", {
    params,
  });
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await axiosInstance.delete<ProductFormData>(
    `/product/${id}`
  );
  return response.data;
};

export const updateProduct = async (id: string, data: FormData) => {
  const response = await axiosInstance.patch<ProductFormData>(
    `/product/${id}`,
    data
  );
  return response.data;
};

export const createTournament = async (data: TournamentFormData) => {
  const response = await axiosInstance.post<ResponseTournament>(
    "/tournament/manage",
    data,
    {}
  );
  return response.data;
};

export const cancelTournament = async (id: string) => {
  const response = await axiosInstance.patch<ResponseTournament>(
    `/tournament/cancel/${id}`
  );
  return response.data;
};

export const manageTournament = async (data: TournamentFormData) => {
  console.log(data, "data");
  const response = await axiosInstance.patch<ResponseTournament>(
    "/tournament/manage",
    data
  );
  return response.data;
};

export const getNewsletters = async (params?: {
  limit?: string;
  offset?: string;
}) => {
  const response = await axiosInstance.get<NewsletterTypes>("/newsletter", {
    params,
  });
  return response.data;
};

export const forgetPassword = async (email: string) => {
  const response = await axiosInstance.post("/auth/forgotPassword", { email });
  return response.data;
};

export const resetPassword = async (data: ResetPasswordTypes) => {
  const response = await axiosInstance.put("/auth/resetPassword", data);
  return response.data;
};

export type TournamentParams = {
  limit?: string;
  offset?: string;
  sort_attr?: string;
  sort?: string;
  name?: string;
  from?: string;
  until?: string;
  game?: string;
  fee?: string;
  vip?: string;
  product?: string;
  startingPrice?: string;
  category?: string;
  status?: string;
};

export const getTournaments = async (params?: TournamentParams) => {
  const response = await axiosInstance.get<ResponseTournament[]>(
    "/tournament/get",
    { params }
  );
  return response.data;
};

export const getFilterById = async (id: string) => {
  const response = await axiosInstance.get(`/filter/${id}`);
  return response.data;
};

export const subscribeNewsletter = async (email: string) => {
  const response = await axiosInstance.post("/newsletter", { email });
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await axiosInstance.get<ProductFormData>(`/product/${id}`);
  // console.log(response.data, "response.data", id);
  return response.data;
};

//Comapre Products
export const compareProducts = async (productId: string) => {
  const response = await axiosInstance.post("/compare", { productId });
  return response.data;
};

export const getCompareProducts = async () => {
  const response = await axiosInstance.get("/compare");
  return response.data;
};

//Recommend Product
export const RecommendProduct = async (data: IRecommendProduct) => {
  const response = await axiosInstance.post("/product/recommend", data);
  console.log(response, "response from api recommend product");
  return response.data;
};

//Current Offers
export const CurrenOffers = async () => {
  const response = await axiosInstance.get("/product/?currentOffer=true");
  return response.data;
};

//newsletter Mail
export const NewsletterMail = async (data: {
  subject: any;
  message: any;
  type: any;
}) => {
  // console.log(data, "data for newsletter mail");
  const response = await axiosInstance.post("newsletter/mail", data);
  return response.data;
};

// customers
export const getCustomers = async (params) => {
  const response = await axiosInstance.get("/customers", { params });
  return response.data;
};

export const getCustomer = async (
  pageParams: number,
  search?: string,
  group?: string,
  date?: string,
  isActive?: string
) => {
  const limit = 10;
  const response = await axiosInstance.get("/customers", {
    params: {
      limit,
      offset: pageParams,
      search,
      group,
      date,
      isApproved: isActive,
    },
  });
  console.log(pageParams);
  return response.data;
};

export const getCustomerById = async (id) => {
  const response = await axiosInstance.get(`/customers/${id}`);
  return response.data;
};

export const updateCustomer = async (id, params) => {
  const response = await axiosInstance.put(`/customers/update/${id}`, params);
  return response.data;
};

export const getCustomerTournaments = async (id, offset) => {
  const limit = 5;
  const response = await axiosInstance.get(`/customer/tournaments/${id}`, {
    params: { limit, offset },
  });
  return response.data;
};

export const getCustomerOrdersData = async (
  page,
  status,
  user,
  date,
  limit
) => {
  const limit1 = 10;
  const response = await axiosInstance.get("order/order/get/all", {
    params: { limit: limit ? limit : limit1, offset: page, status, user, date },
  });
  return response.data;
};

//customer apis end

// order api

export const getOrders = async (pageParams, status, date, user) => {
  const limit = 10;
  const response = await axiosInstance.get("/order/order/get/all", {
    params: {
      limit,
      offset: pageParams,
      status,
      date,
      user
    },
  });
  console.log(pageParams);
  return response.data;
};

// export const getOrderById = async (id) => {
//   const response = await axiosInstance.get(`/order/order/${id}`);
//   return response.data;
// };
// export const getOrderById = async (id) => {
//   const response = await axiosInstance.get(`/order/order/${id}`);
//   return response.data;
// };

export interface IFormData {
  status;
  remarks;
  customerInformed;
}

export const PatchOrder = async (id, formData) => {
  const response = await axiosInstance.patch(`order/order/${id}`, formData);
  return response.data;
};
// order api end

export const upComingTournament = async () => {
  const response = await axiosInstance.get<ResponseTournament[]>(
    "/tournament/upcoming"
  );
  return response.data;
};

export const getTournamentById = async (
  id: string
): Promise<TournamentDetailResponse> => {
  const response = await axiosInstance.get<TournamentDetailResponse>(
    `/tournament/get/${id}`
  );
  return response.data;
};

// export const getWallet = async () => {
//   const response = await axiosInstance.get<WalletTypes>('/wallet');
//   return response.data;
// };

export const updateProfile = async (formData: FormData) => {
  const response = await axiosInstance.put("/auth/updateMe", formData);
  return response.data;
};

export const participateTournament = async (id: string) => {
  const response = await axiosInstance.patch(`/tournament/participate/${id}`);
  return response.data;
};

export const shareTournament = async (id: string, email: string) => {
  const response = await axiosInstance.post(`/tournament/share/${id}`, {
    email,
  });
  return response.data;
};

export const getParticipants = async (id: string) => {
  const response = await axiosInstance.get(`/tournament/participants/${id}`);
  return response.data;
};

export const getCart = async () => {
  const response = await axiosInstance.get("/order/cart");
  return response.data;
};

export const addToCart = async (id: string) => {
  const response = await axiosInstance.post(`/order/cart`, { productId: id });
  return response.data;
};

export const updateCart = async (id: string, quantity: number) => {
  const response = await axiosInstance.patch(`/order/cart`, {
    productId: id,
    quantity,
  });
  return response.data;
};

export const getPoints = async () => {
  const response = await axiosInstance.get("/web-settings/points");
  return response.data;
};

export const checkout = async (data: CheckoutTypes) => {
  const response = await axiosInstance.post("/order/checkout", data);
  return response.data;
};

export const placeOrderApi = async (data: PlaceOrder) => {
  console.log(data, "data from api");
  const response = await axiosInstance.post(`/order/order`, data);
  return response.data;
};

export const getMyOrders = async (params) => {
  const response = await axiosInstance.get(`/order/order`, { params });
  return response.data;
};

export const getOrderById = async (id: string) => {
  const response = await axiosInstance.get(`/order/order/${id}`);
  return response.data;
};

export const returnOrder = async (data: ReturnOrderTypes) => {
  const response = await axiosInstance.post(`/return`, data);
  return response.data;
};

export const getMyReturns = async (params) => {
  const response = await axiosInstance.get(`/return`, { params });
  return response.data;
};

export const getReturnById = async (id: string) => {
  const response = await axiosInstance.get(`/return/${id}`);
  return response.data;
};

export const applyVoucher = async (data: { code: string }) => {
  const response = await axiosInstance.post(`/order/apply-Voucher`, data);
  return response.data;
};

export interface CreateVoucherData {
  code: string;
  name: string;
  type: "PERCENTAGE" | "FIXED";
  estate: string;
  value: number;
  registered: boolean;
  noShipping: boolean;
  products: string[];
  categories: string[];
  from: string;
  until: string;
  noOfUsage: number;
  usagePerUser: number;
}

export interface VoucherData extends Omit<CreateVoucherData, "products"> {
  _id: string;
  products: Array<{
    _id: string;
    name: string;
  }>;
}

export interface VoucherResponse {
  data: VoucherData[];
}

export const vouchers = async (data: CreateVoucherData) => {
  const response = await axiosInstance.post("/voucher", data);
  return response.data;
};

export const getVouchers = async (params: {
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
  const response = await axiosInstance.get<VoucherResponse>("/voucher", {
    params,
  });
  return response.data;
};

export const getVoucherById = async (id: string) => {
  const response = await axiosInstance.get<VoucherData>(`/voucher/${id}`);
  return response.data;
};

export const deleteVoucher = async (id: string) => {
  const response = await axiosInstance.delete(`/voucher/${id}`);
  return response.data;
};

export const updateVoucher = async (id: string, data: VoucherData) => {
  const response = await axiosInstance.put(`/voucher/${id}`, data);
  return response.data;
};

export const getCategories = async (params: {
  limit?: string;
  offset?: string;
  name?: string;
  above?: boolean;
}) => {
  const response = await axiosInstance.get<CategoryResponse>("/category", {
    params,
  });
  return response.data;
};
export const getCategoryById = async (id: string) => {
  const response = await axiosInstance.get<Category>(`/category/${id}`);
  return response.data;
};

export const updateCategory = async (id: string, data: FormData) => {
  const response = await axiosInstance.patch<CategoryFormData>(
    `/category/${id}`,
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

export const deleteCategory = async (id: string) => {
  const response = await axiosInstance.delete<CategoryFormData>(
    `/category/${id}`
  );
  return response.data;
};

export const createFilter = async (formData: FilterFormData) => {
  const response = await axiosInstance.post<FilterFormData>(
    "/filter",
    formData
  );
  return response.data;
};

export const getFilters = async (params: {
  limit?: string;
  offset?: string;
}) => {
  const response = await axiosInstance.get<FilterFormData[]>("/filter", {
    params,
  });
  return response.data;
};

export const deleteFilter = async (id: string) => {
  const response = await axiosInstance.delete<FilterFormData>(`/filter/${id}`);
  return response.data;
};

export const updateFilter = async (id: string, data: FilterFormData) => {
  const response = await axiosInstance.patch<FilterFormData>(
    `/filter/${id}`,
    data
  );
  return response.data;
};

export const updateReturn = async (id: string, data: ReturnOrderTypes) => {
  const response = await axiosInstance.patch(`/return/${id}`, data);
  return response.data;
};

export const updateReturnHistory = async (
  id: string,
  data: UpdateReturnTypes
) => {
  console.log(data, id, "data from api");
  const response = await axiosInstance.put(`/return/${id}`, data);
  return response.data;
};

// games api start

export const CreateGame = async (data) => {
  const response = await axiosInstance.post("/game", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const GetGames = async (offset?: number, limit = 10) => {
  const response = await axiosInstance.get("/game/", {
    params: { limit, offset },
  });
  return response.data;
};
export const GetGamebyId = async (id) => {
  const limit = 10;
  const response = await axiosInstance.get(`/game/${id}`);
  return response.data;
};
export const UpdateGame = async (id, data) => {
  const response = await axiosInstance.patch(`/game/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
export const DeleteGame = async (id) => {
  const response = await axiosInstance.delete(`/game/${id}`);
  return response.data;
};

export const getGamesPaths = async () => {
  const response = await axiosInstance.get("/game/list/available");
  return response.data;
};
// games api end
export const wishList = async () => {
  const response = await axiosInstance.get("/wishlist");
  return response.data;
};

export const addToWishList = async (id: string) => {
  const response = await axiosInstance.post(`/wishlist`, { productId: id });
  return response.data;
};

export const addContent = async (data: WebSetting) => {
  const response = await axiosInstance.post(`/web-settings/content`, data);
  return response.data;
};

export const getContent = async () => {
  const response = await axiosInstance.get(`/web-settings/content`);
  return response.data;
};

export const deleteContent = async (id: string) => {
  const response = await axiosInstance.delete(`/web-settings/content/${id}`);
  return response.data;
};

export const updateContent = async (id: string, data: WebSetting) => {
  const response = await axiosInstance.put(`/web-settings/content/${id}`, data);
  return response.data;
};

export const getCustomerReturnById = async (id: string) => {
  const response = await axiosInstance.get(`/customer/${id}`);
  return response.data;
};

//training center user

export const TrainingCenter = async () => {
  const response = await axiosInstance.get("/training");
  return response.data;
};
export const TrainingCenterById = async (id) => {
  const response = await axiosInstance.get(`/training/play/${id}`);
  return response.data;
};

// training center end

//my account api
export const MyAccountGames = async () => {
  const response = await axiosInstance.get(`/game/get/stats`);
  return response.data;
};
export const MyAccountTournaments = async (offset) => {
  const limit = 10;
  const response = await axiosInstance.get(`/tournament/get-my-tournaments`, {
    params: { limit, offset },
  });
  return response.data;
};

//my account api end

// IT Scope api
export const ITScope = async (formData) => {
  const response = await axiosInstance.post("/product/itscope-json", formData);
  return response.data;
};
// IT Scope apiend


export const getAddresses=async()=>{
  const response=await axiosInstance.get('/address')
  return response.data
}

export const createAddress=async(data)=>{
  const response=await axiosInstance.post('/address',data)
  return response.data
}

export const deleteAddress=async(id:string)=>{
  const response=await axiosInstance.delete(`/address/${id}`)
  return response.data
}





export interface TicketFormData {
  email: string;
  subject: string;
  department: string;
  message: string;
  attachments?: File[];
}

export const createTicket = async (formData: FormData) => {
  const response = await axiosInstance.post("/ticket", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export interface TicketParams {
  limit?: number;
  offset?: number;
  status?: string;
  sort_attr?: string;
  sort?: string;
}

export const getTickets = async (params: TicketParams) => {
  const limit = 10;
  const response = await axiosInstance.get("/ticket", {
    params: { limit, ...params },
  });
  return response.data;
};

export const getTicketById = async (id: string) => {
  const response = await axiosInstance.get(`/ticket/${id}`);
  return response.data;
};

export const replyTicket = async (id: string, formData: FormData) => {
  const response = await axiosInstance.post(`/ticket/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

/// customer delete
export const deleteCustomer = async (id: string) => {
  const response = await axiosInstance.delete(`/auth/account/${id}`);
  return response.data;
};
/// customer delete end
