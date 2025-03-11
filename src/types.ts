export interface ProductFormData {
    name: string;
    description?: string;
    company?: string;
    images: File[];
    colors?: string[];
    stock: number;
    price: number;
    discounts?: {
      type: string;
      value: number;
    }[] | string;
    attributes?: string;
    categoryIds: string[];
    type?: 'NEW' | 'SALE';
    isFeatured?: boolean;
    metaTitle: string;
    metaDescription?: string;
    metaKeywords?: string;
    article: string;
    sku?: string;
    barcodeEAN?: string;
    noStockMessage?: string;
    relatedProducts?: string[];
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
    data?: any;
  }

 export interface Category {
  _id: string;
  name: string;
  description: string;
  displayName: string;
  image: string;
  parentCategory: string | null;
  shop: boolean;
  above: boolean;
  filters: string[];
  subCategories: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
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

  export interface ProductType {
    _id: string;
    name: string;
    description: string;
    company: string;
    images: string[];
    colors: string[];
    stock: number;
    price: number;
    discounts: {
      amount: number;
      price: number;
      type: 'PERCENTAGE';
      customerGroup: string;
    }[];
    attributes: Record<string, string>;
    categoryIds: {
      _id: string;
      name: string;
      description: string;
      displayName: string;
      filters: string[];
      image: string;
      isActive: boolean;
      parentCategory: string | null;
      shop: boolean;
      above: boolean;
      subCategories: string[];
      createdAt: string;
      updatedAt: string;

    }[];
    type: "NEW" | "SALE";
    isFeatured: boolean;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    article: string;
    sku: string;
    barcodeEAN: string;
    noStockMessage: string;
    relatedProducts: string[];
    requireShipping: boolean;
    liscenseKey: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  
  }

export interface productFilterParams {
  price?: string[];
  limit?: string;
  offset?: string;
  sort_attr?: string;
  sort?: string;
  name?: string;
  category?: string;
  type?: string;
}

// export interface Category {
//   _id: string;
//   name: string;
//   displayName: string;
//   data?: any;
// }

// export interface CategoriesData {
//   data: {
//     categories: Category[];
//   };
//   isLoading: boolean;
// }


