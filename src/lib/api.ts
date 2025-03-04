import axiosInstance from './axios';

export interface ProductFormData {
  name: string;
  description?: string;
  company?: string;
  images: File[];
  colors?: string;
  stock: number;
  price: number;
  discounts?: string;
  attributes?: string;
  categoryIds: string;
  type?: 'NEW' | 'SALE';
  isFeatured?: boolean;
  metaTitle: string;
  metaDescription?: string;
  metaKeywords?: string;
  article: string;
  sku?: string;
  barcodeEAN?: string;
  noStockMessage?: string;
  relatedProducts?: string;
  requireShipping?: boolean;
  liscenseKey?: string;
}

export interface CategoryFormData {
  name: string;
  description: string;
  image: File;
  parentCategoryId?: string;
  shop: boolean;
  above: boolean;
}

export interface FilterFormData {
  name: string;
  value: string[];
  category: string;
}

export const fetchItems = async () => {
  const response = await axiosInstance.get('/items');
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post('/auth/logout');
  return response.data;
};

export const getMyprofile = async () => {
  const response = await axiosInstance.get('/auth/me');
  return response.data;
};

export const fetchItemById = async (id: string) => {
  const response = await axiosInstance.get(`/items/${id}`);
  return response.data;
};

export const authMutation = async (data: any, type: string) => {
  const response = await axiosInstance.post(`/auth/${type}`, data);
  console.log(response.data, "response.data")
  return response.data;
};

export const updateItem = async (id: string, data: any) => {
  const response = await axiosInstance.put(`/items/${id}`, data);
  return response.data;
};

export const deleteItem = async (id: string) => {
  const response = await axiosInstance.delete(`/items/${id}`);
  return response.data;
};

export const filterItems = async (filters: Record<string, string>) => {
  const response = await axiosInstance.get('/items', { params: filters });
  return response.data;
};

// export const products = async () => {
//   const response = await axiosInstance.post<ProductFormData>('/product/product');
//   return response.data;
// };

export const createProduct = async (formData: FormData) => {
  const response = await axiosInstance.post('/product/product', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// export const getProduct = async (id: string) => {
//   const response = await axiosInstance.get(`/product/product/${id}`);
//   return response.data;
// };

export const createCategory = async (formData: FormData) => {
  const response = await axiosInstance.post('/product/category', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getCategories = async () => {
  const response = await axiosInstance.get('/product/category');
  return response.data;
};

export const updateCategory = async (id: string, data: CategoryFormData) => {
  const response = await axiosInstance.patch(`/product/category/${id}`, data);
  return response.data;
};

export const deleteCategory = async (id: string) => {
  const response = await axiosInstance.delete(`/product/category/${id}`);
  return response.data;
};

export const createFilter = async (formData: FilterFormData) => {
  const response = await axiosInstance.post('/product/filter', formData);
  return response.data;
};

export const getFilters = async () => {
  const response = await axiosInstance.get('/product/filter');
  return response.data;
};

export const deleteFilter = async (id: string) => {
  const response = await axiosInstance.delete(`/product/filter/${id}`);
  return response.data;
};

export const updateFilter = async (id: string, data: FilterFormData) => {
  const response = await axiosInstance.patch(`/product/filter/${id}`, data);
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
  const response = await axiosInstance.get('/product/product', {
    params,
  });
  return response.data;
};



