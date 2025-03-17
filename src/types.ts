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
  type?: "NEW" | "SALE";
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
  data?: any;
}

export interface ResponseCategory {
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
  data?: any;
}

export interface Category {
  _id: string;
  name: string;
  description: string;
  image: string;
  parentCategoryId: string;
  shop: boolean;
  above: boolean;
}

export interface NewsletterTypes {
  _id: string;
  name: string;
  email: string;
  subscribedAt: string;
  createdAt: string;
  data?: NewsletterTypes[];
}

export interface ResetPasswordTypes {
  email: string;
  password: string;
  passwordResetToken: string;
}

export interface ResponseTournament {
  _id: string;
  name: string;
  title: string;
  textForBanner: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  article: string;
  startingPrice: number;
  image: string;
  priceReduction: number;
  numberOfPieces: number;
  game: string;
  start: string;
  length: number;
  fee: number;
  numberOfParticipants: number;
  vip: boolean;
  resubmissions: number;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  images: string[];
  categoryIds: string[];
  type: "NEW" | "SALE";
  data?: any;
}

export interface ProductsData {
  data: {
    products: Product[];
  };
  isLoading: boolean;
}

export interface Category {
  _id: string;
  name: string;
  displayName: string;
  data?: any;
}

export interface CategoriesData {
  data: {
    categories: Category[];
  };
  isLoading: boolean;
}

//comapre products

export interface ComapreProduct {
  article: string;
  attributes: Record<string, string>;
  barcodeEAN: string;
  categoryIds: string[];
  colors: string[];
  company: string;
  createdAt: string; // ISO date string
  description: string;
  discounts: Record<string, any>[]; // Adjust type based on discount structure
  images: string[];
  isActive: boolean;
  isFeatured: boolean;
  liscenseKey: string;
  metaDescription: string;
  metaKeywords: string;
  metaTitle: string;
  name: string;
  noStockMessage: string;
  price: number;
  relatedProducts: string[];
  requireShipping: boolean;
  sku: string;
  stock: number;
  type: string;
  updatedAt: string; // ISO date string
  __v: number;
  _id: string;
}

//current offers
export interface ICurrentOfferProduct {
  article: string;
  attributes: Record<string, any>;
  barcodeEAN: string;
  categoryIds: string[];
  colors: string[];
  company: string;
  createdAt: string;
  description: string;
  discounts: Record<string, any>[];
  images: string[];
  isActive: boolean;
  isFeatured: boolean;
  liscenseKey: string;
  metaDescription: string;
  metaKeywords: string;
  metaTitle: string;
  name: string;
  noStockMessage: string;
  price: number;
  relatedProducts: string[];
  requireShipping: boolean;
  sku: string;
  stock: number;
  type: "NEW" | "SALE";
  updatedAt: string;
  __v: number;
  _id: string;
}
