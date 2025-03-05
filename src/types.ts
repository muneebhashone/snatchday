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
    parentId?: string;
    shop: boolean;
    above: boolean;
  }
  
  export interface FilterFormData {
    name: string;
    value: string[];
    category: string;
  }

  export interface Category {
    _id: string;
    name: string;
    description: string;
    image: string;
    parentId: string; 
    shop: boolean;
    above: boolean;
  }