import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchItems,
  fetchItemById,
  authMutation,
  updateItem,
  deleteItem,
  filterItems,
  getMyprofile,
  logout,

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
} from '../lib/api';

import { CategoryFormData, FilterFormData, ResetPasswordTypes } from '@/types';
import { useUserContext } from '@/context/userContext';



// Fetch all items
export const useGetMyProfile = () => {
  const { user } = useUserContext();

  return useQuery({
    queryKey: ['myprofile'],
    queryFn: getMyprofile,
    enabled: Boolean(user),
  });
};

export const useLogout = () => {
    return useMutation({
    mutationFn: logout,
    onSuccess: () => {},
    onError: (error) => {
      console.error('Logout failed:', error);
    },
  });
};


// Fetch all items
export const useGetItems = () => {
  return useQuery({
    queryKey: ['items'],
    queryFn: fetchItems,
  });
};

// Create a new item
export const authApi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, type }: { data: { email: string; password: string } | { email: string; name: string; password: string }; type: string }) => authMutation(data, type),
    onSuccess: (data: any) => {
      console.log(data, "data login data from api hooks");
      queryClient.invalidateQueries({ queryKey: ['login'] });
    },
  });
};

// Fetch a single item by ID
export const useGetItemById = (id: string) => {
  return useQuery({
    queryKey: ['item', id],
    queryFn: () => fetchItemById(id),
    enabled: !!id, // Only fetch if ID is provided
  });
};

// Create a new item
export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({data,type}: {data: any,type: string}) => authMutation(data,type),
    onSuccess: () => {
      // Invalidate the 'items' query to refetch data after creation
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
};

// Update an item by ID
export const useUpdateItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateItem(id, data),
    onSuccess: () => {
      // Invalidate the 'items' query to refetch data after update
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
};

// Delete an item by ID
export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteItem(id),
    onSuccess: () => {
      // Invalidate the 'items' query to refetch data after deletion
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
};

// Filter items dynamically
export const useFilteredItems = (filters: Record<string, string>) => {
  return useQuery({
    queryKey: ['items', filters], // Dynamic query key based on filters
    queryFn: () => filterItems(filters),
    enabled: Object.keys(filters).length > 0, // Only fetch if filters are provided
  });
};


// export const useProducts = () => {
//   return useQuery({
//     queryKey: ['products'],
//     queryFn: products,
//   });
// };

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CategoryFormData }) => updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useCreateFilter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createFilter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['filters'] });
    },
  });
};

export const useGetFilters = () => {
  return useQuery({
    queryKey: ['filters'],
    queryFn: getFilters,
  });
};

export const useDeleteFilter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteFilter(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['filters'] });
    },
  });
};

export const useUpdateFilter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FilterFormData }) => updateFilter(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['filters'] });
    },
  });
};

interface ProductFilters {
  price?: string;
  limit?: string;
  offset?: string;
  sort_attr?: string;
  sort?: string;
  name?: string;
  category?: string;
  type?: string;
}

interface NewsletterFilters {
  limit?: string;
  offset?: string;
  sort_attr?: string;
  sort?: string;
}


export const useGetProducts = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => getProducts(filters),
  });
};

export const useGetNewsletters = (filters?: NewsletterFilters) => {
  return useQuery({
    queryKey: ['newsletters', filters],
    queryFn: () => getNewsletters(filters),
  });
};

export const useForgetPassword = () => {
  return useMutation({
    mutationFn: (email: string) => forgetPassword(email),
    onSuccess: (data) => {
      console.log(data,"data from hooks");
    },
    onError: (error) => {
      console.log(error,"error from hooks");
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordTypes) => resetPassword(data),
    onSuccess: (data) => {
      console.log(data,"data from hooks");
    },
    onError: (error) => {
      console.log(error,"error from hooks");
    },
  });
};



