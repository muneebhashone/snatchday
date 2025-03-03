import axiosInstance from './axios';

export const fetchItems = async () => {
  const response = await axiosInstance.get('/items');
  return response.data;
};

export const getMyprofile = async () => {
  const response = await axiosInstance.get('/auth/me');
  return response.data;
};


export const fetchItemById = async (id: string) => {``
  const response = await axiosInstance.get(`/items/${id}`);
  return response.data;
};

export const authMutation = async (data: any,type: string) => {
  const response = await axiosInstance.post(`/auth/${type}`, data);
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