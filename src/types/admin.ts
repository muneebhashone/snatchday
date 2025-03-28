export interface TournamentFormData {
  _id?: string;
  name: string;
  title: string;
  textForBanner: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  article: string;
  startingPrice: number;
  image?: string;
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

// export interface ResponseTournament extends Omit<TournamentFormData, 'image'> {
//   _id: string;
//   image: string;
//   createdAt: string;
//   updatedAt: string;
// } 


export interface ReturnOrderTypes {
  orderNumber: string;
  productsData: [
    {
      product: string;
      quantity: number;
      reason: string;
      demand: string;
      description: string;
    }
  ]
}

export interface UpdateReturnTypes {

    status: string;
    date: string;
    remarks: string;
    customerInformed: boolean;
  
}

