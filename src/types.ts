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