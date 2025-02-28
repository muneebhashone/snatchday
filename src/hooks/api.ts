import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchItems,
  fetchItemById,
  createItem,
  updateItem,
  deleteItem,
  filterItems,
} from '../lib/api';

// Fetch all items
export const useGetItems = () => {
  return useQuery({
    queryKey: ['items'],
    queryFn: fetchItems,
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
    mutationFn: createItem,
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