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

export interface TutorialFormData {
  title: string;
  videoUrl: string;
  thumbnailUrl?: string;
  order: number;
}

export interface Game {
  _id: string;
  title: string;
  logo: string;
  content: string;
  game: string;
  path: string;
  delay: number;
  height: number;
  width: number;
  isActive: boolean;
  suitableDuel: boolean;
  suitableTournament: boolean;
  suitableTraining: boolean;
  customGame: boolean;
  maxScore: number;
  levels: number;
  randomLevels: boolean;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  createdAt: string;
  updatedAt: string;
  winnerDetermination: {
    level: string;
    score: string;
    time: string;
  };
}

export interface User {
  _id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: string;
  salutation: string;
  title?: string;
  dob: string;
  street: string;
  zip: string;
  location: string;
  country: string;
  group: string;
  isActive: boolean;
  approved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ScoreData {
  score: number;
  time: number;
}

export interface Duel {
  _id: string;
  duelId: string;
  game: Game;
  player1: User;
  player2?: User;
  player1Score: ScoreData;
  player2Score: ScoreData;
  rounds: number;
  type: "snap" | "discount";
  value: number;
  status: "pending" | "active" | "completed" | "closed";
  duelEndTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface DuelsResponse {
  duels: Duel[];
  total: number;
} 