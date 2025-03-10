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
  type: 'NEW' | 'SALE';
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


