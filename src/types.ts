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
  currentOffer?: boolean;
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

export interface SubCategory {
  _id: string;
  name: string;
  image: string;
  above: boolean;
}

export interface Category {
  subCategories: SubCategory[];
  _id: string;
  name: string;
  description: string;
  image: string;
  parentCategory: string;
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
  discounts?: [
    { price: number; customerGroup: string; away: Date; until: Date }
  ];
  calculatedPrice?: number;
  ratings?: number;
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

export interface CheckoutTypes {
  cartId: string;
  snapPoints: number;
  discountPoints: number;
  voucherCode: string;
}

export interface PlaceOrder {
  cartObjectFromCheckout: Record<string, any>;
  billingDetails: {
    firstName?: string;
    lastName?: string;
    vatId?: string;
    email?: string;
    street?: string;
    city?: string;
    zip?: string;
    country?: string;
    federalState?: string;
  };
  shippingDetails: {
    firstName?: string;
    lastName?: string;
    vatId?: string;
    email?: string;
    street?: string;
    city?: string;
    zip?: string;
    country?: string;
    federalState?: string;
  };
}

export interface Order {
  orderNumber: string;
  createdAt: string; // Order creation date
  updatedAt: string; // Order update date
  status: "Paid" | "Complete" | "Canceled" | "pending"; // Possible order statuses
  billingDetails: {
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    city: string;
    federalState: string;
    country: string;
    zip: string;
    vatId: string;
  };
  shippingDetails: {
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    city: string;
    federalState: string;
    country: string;
    zip: string;
    vatId: string;
  };
  cartObject: {
    cart: Array<{
      product: {
        article: string;
        attributes: Record<string, string>; // To capture additional attributes
        barcodeEAN: string;
        categoryIds: string[];
        colors: string[];
        company: string;
        createdAt: string;
        description: string;
        discounts: Array<{
          customerGroup: string;
          price: number;
          away: string;
          until: string;
          _id: string;
        }>;
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
        purchases: number;
        relatedProducts: string[];
        requireShipping: boolean;
        sku: string;
        stock: number;
        type: string;
        updatedAt: string;
        views: number;
        _id: string;
      };
      quantity: number;
      totalPrice: number;
    }>;
    subTotal: number;
    total: number;
    appliedDiscount: number;
  };
  invoice?: boolean;
  voucherDiscount: number;
  voucherId?: string | null;
  history: Array<any>; // Adjust as needed based on the structure of history
}

export interface WebSetting {
  name: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  order: number;
}

export interface MainProduct {
  name: string;
  description: string;
  company: string;
  images: File[];
  colors: string[];
  stock: number;
  price: number;
  discounts: Array<{
    amount: number;
    type: "PERCENTAGE";
    customerGroup: "BASIC" | "VIP";
    price: number;
  }>;
  attributes: Record<string, string[]>;
  categoryIds: Array<string>;
  type: "NEW" | "SALE";
  isFeatured: boolean;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  article: string;
  sku: string;
  barcodeEAN: string;
  data?: any;
}

export interface FaqFormData {
  qa: Array<{
    question: string;
    answer: string;
  }>;
  category: string;
  order?: number;
}

export interface TutorialFormData {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  category: string;
  order?: number;
}

export interface points {
  facebookLike: number;
  facebookShare: number;
  referral: number;
  facebookAppId: string;
  maxSnapPoints: number;
  maxDiscountPoints: number;
  maxWithdrawalAmount: number;
  minWithdrawalAmount: number;
  platformFee: number;
  snapPointsRatio: number;
}

export interface BankDetails {
  paypalEmail?: string;
  iban?: string;
  accountHolder?: string;
}

export interface WithdrawalUser {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
  balance?: number;
}

export interface WithdrawalRequest {
  _id: string;
  amount: number;
  bankDetails?: BankDetails;
  createdAt: string;
  platformFee: number;
  requestDate: string;
  status: "PENDING" | "COMPLETED" | "REJECTED";
  updatedAt: string;
  user?: WithdrawalUser;
  commission?: number;
  methodFee?: number;
}

export interface WithdrawalRequestResponse {
  success: boolean;
  data: WithdrawalRequest | WithdrawalRequest[];
}

// For the notification data object
export interface NotificationData {
  duelStatus?: string;
  duelType?: string;
  type?: string;
  duelValue?: number;
  image?: string;
  duelGame?: string;
  duelGameImage?: string;
  createdAt?: string;
}

// For the notification item
export interface NotificationItem {
  _id: string;
  type: string;
  data: {
    message: string;
    data: NotificationData;
  };
}

export interface BannerFormData {
  image: File;
  title: string;
  content: string;
  date?: string;
  productId?: string;
}
