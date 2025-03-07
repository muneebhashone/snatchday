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