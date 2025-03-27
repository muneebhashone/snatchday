export interface ProductFormData {
  data: {
    products: Array<{
      _id: string;
      name: string;
      // ... other product fields
    }>;
  };
}

export interface Category {
  data: {
    categories: Array<{
      _id: string;
      name: string;
      // ... other category fields
    }>;
  };
} 