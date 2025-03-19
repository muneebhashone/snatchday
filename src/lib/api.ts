import { TournamentFormData } from '@/types/admin';
import axiosInstance from './axios';
import { ProductFormData, FilterFormData, Category, NewsletterTypes, ResetPasswordTypes, ResponseTournament, CategoryFormData } from '@/types';


export const fetchItems = async () => {
  const response = await axiosInstance.get("/items");
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

export const authMutation = async (data: any, type: string) => {
  const response = await axiosInstance.post(`/auth/${type}`, data);
  console.log(response.data, "response.data");
  return response.data;
};




// export const products = async () => {
//   const response = await axiosInstance.post<ProductFormData>('/product/product');
//   return response.data;
// };

export const createProduct = async (formData: FormData) => {
  const response = await axiosInstance.post<ProductFormData>(
    "/product",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

// export const getProduct = async (id: string) => {
//   const response = await axiosInstance.get(`/product/product/${id}`);
//   return response.data;
// };

export const createCategory = async (formData: FormData) => {
  const response = await axiosInstance.post<CategoryFormData>('/category', formData)
  return response.data;
};

export const getCategories = async () => {
  const response = await axiosInstance.get<Category[]>("/category");
  return response.data;
};

export const getCategoryById = async (id: string) => {
  const response = await axiosInstance.get<Category>(`/category/${id}`);
  return response.data;
};

export const updateCategory = async (id: string, data: CategoryFormData) => {
  const response = await axiosInstance.patch<CategoryFormData>(
    `/category/${id}`,
    data
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

export const getFilters = async () => {
  const response = await axiosInstance.get<FilterFormData[]>("/filter");
  return response.data;
};

export const deleteFilter = async (id: string) => {
  const response = await axiosInstance.delete<FilterFormData>(
    `/filter/${id}`
  );
  return response.data;
};

export const updateFilter = async (id: string, data: FilterFormData) => {
  const response = await axiosInstance.patch<FilterFormData>(
    `/filter/${id}`,
    data
  );
  return response.data;
};

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
  const response = await axiosInstance.get<ProductFormData[]>(
    "/product",
    {
      params,
    }
  );
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
    `/tournament/manage/${id}`,
    {}
  );
  return response.data;
};  

export const manageTournament = async ( data: TournamentFormData) => {
  console.log(data, "data")
  const response = await axiosInstance.patch<ResponseTournament>(
    "/tournament/manage",
    data
  );
  return response.data;
};


export const getNewsletters = async (params?: {
  limit?: string;
  offset?: string;
  sort_attr?: string;
  sort?: string;
}) => {
  const response = await axiosInstance.get<NewsletterTypes>('/newsletter/subscribers', {
    params,
  });
  return response.data;
};


export const forgetPassword = async (email: string) => {
  const response = await axiosInstance.post('/auth/forgotPassword', { email });
  return response.data;
};

export const resetPassword = async (data: ResetPasswordTypes)  => {
  const response = await axiosInstance.put('/auth/resetPassword', data);
  return response.data;
};


export type TournamentParams = {
  limit: string;
  offset: string;
  sort_attr: string;
  sort: string;
  name: string;
  from: string;
  until: string;
  game: string;
  fee: string;
  vip: string;
  product: string;
  startingPrice: string;
  category: string;
  status: string;
};

export const getTournaments = async (params: TournamentParams) => {
  const response = await axiosInstance.get<ResponseTournament[]>(
    "/tournament/get",
    { params }
  );
  return response.data;
};



export const getFilterById = async (id: string) => {
  const response = await axiosInstance.get(`/product/filter/${id}`);
  return response.data;
};

export const subscribeNewsletter = async (email: string) => {
  const response = await axiosInstance.post('/newsletter/subscribe', { email });
  return response.data;
};



export const getProductById = async (id: string) => {
  const response = await axiosInstance.get<ProductFormData>(`/product/${id}`);
  return response.data;
};


// export const getWallet = async () => {
//   const response = await axiosInstance.get<WalletTypes>('/wallet');
//   return response.data;
// };
