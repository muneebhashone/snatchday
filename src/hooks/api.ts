import { useQuery, useMutation } from "@tanstack/react-query";
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
  updateProfile,
  upComingTournament,
  getTournamentById,
  participateTournament,
  shareTournament,
  getParticipants,
} from "../lib/api";
import { TournamentFormData} from "@/types/admin";

import {
  CategoryFormData,
  FilterFormData,
  ProductFormData,
  ResetPasswordTypes,
} from "@/types";
import { useUserContext } from "@/context/userContext";

// Fetch all items
export const useGetMyProfile = () => {
  const { user } = useUserContext();

  return useQuery({
    queryKey: ["myprofile"],
    queryFn: getMyprofile,
    enabled: Boolean(user),
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

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
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

interface ProductFilters {
  price?: string[];
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
    mutationFn: ({ data }: { data: TournamentFormData }) => manageTournament( data),
  });
};

export const useGetTournaments = (params: TournamentParams) => {
  return useQuery({
    queryKey: ["tournaments", params],
    queryFn: () => getTournaments(params),
  });
};


export const useUpComingTournament = () => {
  return useQuery({
    queryKey: ['upComingTournament'],
    queryFn: () => upComingTournament(),
  });
};


export const useGetTournamentById = (id: string) => {
  return useQuery({
    queryKey: ['tournament', id],
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


export const useParticipateTournament = () => {
  return useMutation({
    mutationFn: (id: string) => participateTournament(id),
  });
};


export const useShareTournament = () => {
  return useMutation({
    mutationFn: ({id,email}:{id:string,email:string}) => shareTournament(id,email),
  });
};


export const useGetParticipants = (id: string) => {
  return useQuery({
    queryKey: ['participants', id],
    queryFn: () => getParticipants(id),
  });
};

