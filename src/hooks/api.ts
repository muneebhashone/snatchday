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
} from '../lib/api';



// Fetch all items
export const useGetMyProfile = () => {
  return useQuery({
    queryKey: ['myprofile'],
    queryFn: getMyprofile,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
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