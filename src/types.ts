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

export interface CategoryFormData {
  name: string;
  description: string;
  image: File;
  parentCategoryId: string;
  shop: boolean;
  above: boolean;
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
  numberOfParticipants: number;
  numberOfPieces: number;
  participants: any[]; 
  priceReduction: number;
  resubmissions: number;
  start: Date;
  startingPrice: number;
  status: string;
  textForBanner: string;
  title: string;
  updatedAt: string; 
  vip: boolean;
  __v: number; 
  _id: string; 
}

export interface Tournament {
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
}

export interface TournamentDetailResponse {
  success: boolean;
  data: {
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
    end: string;
  };
}
export interface TournamentResponse {
  success: boolean;
  data: Tournament[];
  
}

export interface CurrentOfferResponse {
  success: boolean;
  data: {
    products: ProductFormData[];
  };
  isLoading?: boolean;
}


export interface User {
  _id: string;
  name: string;
  username: string;
  image: string;
  email: string;
  game: string;
  startingPrice: number;
  numberOfParticipants: number;
  start: string;
  length: number;
  vip: boolean;

}

