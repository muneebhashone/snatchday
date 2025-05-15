import { Headphones, Monitor, Smartphone, Gamepad, Computer, LucideIcon } from "lucide-react";
import { StaticImageData } from "next/image";
import iphone from '@/app/images/iphone.png';
import laptop1 from '@/app/images/laptop.png';
import laptop2 from '@/app/images/laptopv2.png';
import game1 from "@/app/images/game1.png";
import game2 from "@/app/images/game2.png";
import game3 from "@/app/images/game3.png";
import game4 from "@/app/images/game4.png";
import game5 from "@/app/images/game5.png";
import image from '@/app/images/choosetournament.png';
import image2 from '@/app/images/traingame.png';
import image3 from '@/app/images/participateintournament.png';
import image4 from '@/app/images/win.png';
import tournament from "@/app/images/tournament.png";
import mobiles from "@/app/images/mobiles.png";
import bestoffer from "@/app/images/bestoffer.png";
import bestlaptop from "@/app/images/bestlaptop.png";
import graphiccard from "@/app/images/graphiccard.png";
import f1 from "@/app/images/featured1.png";
import f3 from "@/app/images/featured3.png";
import f5 from "@/app/images/featured5.png";
import f6 from "@/app/images/featured6.png";
import avatarimage from "@/app/images/avatarimage.svg";
import ratingmobileimage from "@/app/images/ratingmobileimage.png";
import { DownloadIcon, FastDeliveryIcon, HandIcon, ShieldIcon } from "./components/icons/icon";
import winnerAvatar from "@/app/images/avatarimage.svg";


const currentMonthName = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  1
).toLocaleString("default", { month: "long" });

export type ICatogory = {
  id: number,
  name: string,
  path: string,
  icon: LucideIcon,
  image: StaticImageData,
  subcategories: ISub[]
}

export type ISub = {
  name: string,
  path: string,
  image: StaticImageData
}

export const categoryData: ICatogory[] = [
  {
    id: 1,
    name: "Audio, Video & HiFi",
    path: "/audio-video-hifi",
    icon: Headphones,
    image: iphone,
    subcategories: [
      { name: "Home Theater Systems", path: "/category/home-theater", image: iphone },
      { name: "Speakers", path: "/category/speakers", image: laptop1 },
      { name: "Amplifiers", path: "/category/amplifiers", image: laptop2 },
      { name: "Receivers", path: "/category/receivers", image: iphone },
    ]
  },
  {
    id: 2,
    name: "Computer & Hardware",
    path: "/computer-hardware",
    icon: Monitor,
    image: laptop1,
    subcategories: [
      { name: "Processors", path: "/category/processors", image: iphone },
      { name: "Motherboards", path: "/category/motherboards", image: iphone },
      { name: "Memory", path: "/category/memory", image: iphone },
      { name: "Storage", path: "/category/storage", image: iphone },
    ]
  },
  {
    id: 3,
    name: "Cell Phones & Communication",
    path: "/phones-communication",
    icon: Smartphone,
    image: laptop2,
    subcategories: [
      { name: "Smartphones", path: "/category/smartphones", image: iphone },
      { name: "Phone Accessories", path: "/category/accessories", image: iphone },
      { name: "Cases & Protection", path: "/category/cases", image: iphone },
      { name: "Chargers & Cables", path: "/category/chargers", image: iphone },
    ]
  },
  {
    id: 4,
    name: "Entertainment & Gaming",
    path: "/entertainment-gaming",
    icon: Gamepad,
    image: iphone,
    subcategories: [
      { name: "Gaming Consoles", path: "/category/consoles", image: iphone },
      { name: "Video Games", path: "/category/games", image: iphone },
      { name: "Gaming Accessories", path: "/category/accessories", image: iphone },
      { name: "Virtual Reality", path: "/category/vr", image: iphone },
    ]
  },
  {
    id: 5,
    name: "PC Systems",
    path: "/pc-systems",
    icon: Computer,
    image: laptop1,
    subcategories: [
      { name: "Desktop Computers", path: "/category/desktop", image: iphone },
      { name: "Workstations", path: "/category/workstations", image: iphone },
      { name: "All-in-One PCs", path: "/category/all-in-one", image: iphone },
      { name: "Mini PCs", path: "/category/mini-pcs", image: iphone },
    ]
  },
];

export const menu = [
  {
    id: 1,
    name: "VIP Shop",
    link: "/vip-shop",
  },
  {
    id: 2,
    name: "Turniere",
    link: "/tournaments",
  },
  {
    id: 3,
    name: "Duellarena",
    link: "/duel-arena",
  },
  {
    id: 4,
    name: "Trainingscenter",
    link: "/trainings-center",
  },
  {
    id: 5,
    name: `Gewinnspiel in ${currentMonthName}`,
    link: "/gewinnspiel-im-januar",
  },
  {
    id: 6,
    name: "Support",
    link: "/support",
  },
];

export const duelArenaSlides = [
  {
    title: "Duel Arena",
    description:
      "You can have exciting duels in the duel arena. To start or accept a duel, you need 25 snap points, which is worth 25 cents. There are no additional fees. VIP members are exempt from this fee (see VIP membership). A duel consists of two players.",
    subText:
      "Create a duel with a game you have the most experience with and set your own stake.",
  },
];

export const howToEnterSteps = [
  {
    subTitle: "choose tournament",
    description:
      "The power is in your hands, chose from our number of exciting prizes that catch your eye the most.",
    number: "01",
    image: image,
  },
  {
    subTitle: "train game",
    description:
      "Chose how many tickets you would like to enter. The more tickets you select the more chance you have of winning.",
    number: "02",
    image: image2,
  },
  {
    subTitle: "participate in tournament",
    description:
      "Answer the question with the correct answer to be entered in the competition.",
    number: "03",
    image: image3,
  },
  {
    subTitle: "win or redeem discount",
    description:
      "Answer the question with the correct answer to be entered in the competition.",
    number: "04",
    image: image4,
  },
];

export const floatingImages = [
  {
    src: game1,
    alt: "game1",
    className: "animate-float-1 absolute top-20 left-[10%]",
  },
  {
    src: game2,
    alt: "game2",
    className: "animate-float-2 absolute bottom-40 right-[10%]",
  },
  {
    src: game3,
    alt: "game3",
    className: "animate-float-3 absolute top-40 right-[30%]",
  },
  {
    src: game4,
    alt: "game4",
    className: "animate-float-4 absolute bottom-20 left-[30%]",
  },
  {
    src: game5,
    alt: "game5",
    className: "animate-float-5 absolute top-60 right-[20%]",
  },
  {
    src: game2,
    alt: "game2",
    className: "animate-float-2 absolute top-32 right-[40%]",
  },
  {
    src: game3,
    alt: "game3",
    className: "animate-float-3 absolute bottom-32 right-[35%]",
  },
];

export const bestOffers = [
  {
    subtitle: "Special Offer for VIP Members",
    buttonText: "VIP-MITGLIED WERDEN",
    image: mobiles,
    bgimage: tournament,
    buttonTextcolor: "#F37835",
    price: '???'
  },
  {
    subtitle: "Advantages of VIP Membership",
    buttonText: "VIP-MITGLIED WERDEN",
    bgimage: bestoffer,
    image: bestlaptop,
    buttonTextcolor: "#692280",
    des: [
      '500 Snap Points package included every month',
      'Accept/create unlimited duels',
      'Collect 50 discount points for every non-won tournament',
      '30-day return policy + Free shipping',
      'Exclusive access to the VIP shop + Exclusive tournaments',
      'No contract period + 10% deposit bonus',
      'And much more...'
    ]
  },
];

export interface Product {
  title: string;
  price: string;
  oldPrice: string;
  rating: number;
  reviews: number;
  image: StaticImageData;
  isSale: boolean;
  isNew?: boolean;
  discount: string;
  category: string;
}

export interface ProductCategories {
  all: Product[];
  audio: Product[];
  computer: Product[];
  displays: Product[];
  elektro: Product[];
}

export const featuredProductTabs = [
  { id: "all", label: "Alle" },
  { id: "audio", label: "Audio, Video & Hifi" },
  { id: "computer", label: "Computer & Hardware" },
  { id: "displays", label: "Displays & Projektoren" },
  { id: "elektro", label: "Elektro & Installation" },
];

export const featuredProducts: ProductCategories = {
  all: [
    {
      title: "SanDisk Extreme - Flash-Speicherkarte (microSDXC)",
      price: "31,40",
      oldPrice: "31,40",
      rating: 5,
      reviews: 5,
      image: f3,
      isSale: true,
      discount: "€99",
      category: "computer",
    },
    {
      title: "Razer Blade 14 - AMD Ryzen 9 6900HX / 3.3 GHz - Win 11",
      price: "2.644",
      oldPrice: "2.694",
      rating: 5,
      reviews: 5,
      image: f1,
      isSale: false,
      isNew: true,
      discount: "€99",
      category: "computer",
    },
    {
      title: "Canon CLI-551 C/M/Y/BK Multipack - 4er-Pack - Schwarz",
      price: "52,44",
      oldPrice: "64,44",
      rating: 5,
      reviews: 5,
      image: f5,
      isSale: true,
      discount: "€99",
      category: "elektro",
    },
    {
      title: "Canon CLI-551 C/M/Y/BK Multipack - 4er-Pack - Schwarz",
      price: "52,44",
      oldPrice: "64,44",
      rating: 5,
      reviews: 5,
      image: f6,
      isSale: true,
      discount: "€99",
      category: "elektro",
    },
    {
      title: "Canon CLI-551 C/M/Y/BK Multipack - 4er-Pack - Schwarz",
      price: "52,44",
      oldPrice: "64,44",
      rating: 5,
      reviews: 5,
      image: f3,
      isSale: true,
      discount: "€99",
      category: "elektro",
    },
  ],
  audio: [
    {
      title: "Sony WH-1000XM4 Wireless Noise Cancelling Headphones",
      price: "299,99",
      oldPrice: "349,99",
      rating: 5,
      reviews: 5,
      image: f6,
      isSale: true,
      discount: "€50",
      category: "audio",
    },
    {
      title: "Galaxy S22 Ultra",
      price: "52,44",
      oldPrice: "64,44",
      rating: 5,
      reviews: 5,
      image: f5,
      isSale: true,
      discount: "€99",
      category: "audio",
    },
  ],
  computer: [
    {
      title: "14 - AMD Ryzen 9 3 GHz - Win 11",
      price: "2.644",
      oldPrice: "2.694",
      rating: 5,
      reviews: 5,
      image: graphiccard,
      isSale: true,
      isNew: false,
      discount: "€99",
      category: "computer",
    },
    {
      title: "ZOTAC GAMING GeForce RTX 3050 AMP - Grafikkarten",
      price: "319,80",
      oldPrice: "334,80",
      rating: 5,
      reviews: 5,
      image: graphiccard,
      isSale: false,
      isNew: true,
      discount: "€99",
      category: "computer",
    },
  ],
  displays: [
    {
      title: "LG 27GP850-B 27 Inch Gaming Monitor",
      price: "449,99",
      oldPrice: "499,99",
      rating: 5,
      reviews: 5,
      image: graphiccard,
      isSale: true,
      discount: "€50",
      category: "displays",
    },
  ],
  elektro: [
    {
      title: "Canon CLI-551 C/M/Y/BK Multipack - 4er-Pack - Schwarz",
      price: "52,44",
      oldPrice: "64,44",
      rating: 5,
      reviews: 5,
      image: graphiccard,
      isSale: true,
      discount: "€99",
      category: "elektro",
    },
  ],
};

export interface GameCard {
  icon: StaticImageData;
  label: string;
  notification?: boolean;
}

export const trainingGameCards: GameCard[] = [
  {
    icon: game1,
    label: "Memorized - TC",
  },
  {
    icon: game2,
    label: "Fill - TC",
    notification: true,
  },
  {
    icon: game3,
    label: "Sporos - TC",
  },
  {
    icon: game4,
    label: "Puzzle Color - TC",
  },
  {
    icon: game5,
    label: "Reorder - TC",
  },
  {
    icon: game1,
    label: "Push It - TC",
  },
  {
    icon: game5,
    label: "Reorder - TC",
  },
  {
    icon: game1,
    label: "Push It - TC",
  },
  {
    icon: game5,
    label: "Reorder - TC",
  },
  {
    icon: game1,
    label: "Push It - TC",
  },
  {
    icon: game1,
    label: "Memorized - TC",
  },
  {
    icon: game2,
    label: "Fill - TC",
    notification: true,
  },
  {
    icon: game3,
    label: "Sporos - TC",
  },
  {
    icon: game4,
    label: "Puzzle Color - TC",
  },
  {
    icon: game5,
    label: "Reorder - TC",
  },
  {
    icon: game1,
    label: "Push It - TC",
  },
  {
    icon: game5,
    label: "Reorder - TC",
  },
  {
    icon: game1,
    label: "Push It - TC",
  },
  {
    icon: game5,
    label: "Reorder - TC",
  },
  {
    icon: game1,
    label: "Push It - TC",
  },
  {
    icon: game5,
    label: "Reorder - TC",
  },
  {
    icon: game1,
    label: "Push It - TC",
  },
];

export const reviews = [
  {
    name: "Sher Gut",
    rating: 5,
    image: avatarimage,
    review:
      "Nunc non quam sit amet mi pretium pretium eu a eros. Proin semper rhoncus magna, et imperdiet ipsum faucibus vitae. Phasellus lacinia sagittis odio, et tempus erat aliquam eu.",
    product: {
      name: "Realme Narzo 60X",
      image: ratingmobileimage,
    },
  },
  {
    name: "Sher Gut",
    rating: 5,
    image: avatarimage,
    review:
      "Nunc non quam sit amet mi pretium pretium eu a eros. Proin semper rhoncus magna, et imperdiet ipsum faucibus vitae. Phasellus lacinia sagittis odio, et tempus erat aliquam eu.",
    product: {
      name: "Realme Narzo 60X",
      image: ratingmobileimage,
    },
  },
  // Add more reviews as needed
];

export const features = [
  {
    icon: ShieldIcon(),
    title: "Buyer Protection",
    bgColor: "bg-white",
    iconBg: "bg-orange-100",
  },

  {
    icon: DownloadIcon(),
    title: "Use your skill to find a bargain",
    bgColor: "bg-white",
    iconBg: "bg-purple-100",
  },

  {
    icon: HandIcon(),
    title: "14-day right of withdrawal",
    bgColor: "bg-white",
    iconBg: "bg-orange-100",
  },

  {
    icon: FastDeliveryIcon(),
    title: "Fast Shipping",
    bgColor: "bg-white",
    iconBg: "bg-purple-100",
  },

];

export const winners = [
  {
    heading: "December",
    title:
      "Acer Aspire 3 A315-35 - Intel Pentium Silver N6000 / 1.1 GHz - Win 11 Home - UHD Graphics - 8 GB RAM - 512 GB SSD QLC - 39.62 cm (15.6) - (4710886785170)",
    price: "535.99",
    winnerName: "Sher Gut",
    winnerImage: winnerAvatar,
  },
  {
    heading: "November",
    title:
      "Acer Aspire 3 A315-35 - Intel Pentium Silver N6000 / 1.1 GHz - Win 11 Home - UHD Graphics - 8 GB RAM - 512 GB SSD QLC - 39.62 cm (15.6) - (4710886785170)",
    price: "535.99",
    winnerName: "Sher Gut",
    winnerImage: winnerAvatar,
  },
  {
    heading: "October",
    title:
      "Acer Aspire 3 A315-35 - Intel Pentium Silver N6000 / 1.1 GHz - Win 11 Home - UHD Graphics - 8 GB RAM - 512 GB SSD QLC - 39.62 cm (15.6) - (4710886785170)",
    price: "535.99",
    winnerName: "Sher Gut",
    winnerImage: winnerAvatar,
  },
];

export interface VIPProduct {
  _id: string;
  name: string;
  price: number;
  calculatedPrice: number;
  images: string[];
  type: "SALE" | "NEW" | "REGULAR";
  ratings: number;
  stock: number;
  categoryIds: string[];
  discounts: {
    customerGroup: string;
    price: number;
    away?: string;
    until?: string;
  }[];
}

export const vipProducts: VIPProduct[] = [
  {
    _id: "1",
    name: "ASUS ROG Strix Gaming Laptop",
    price: 1999.99,
    calculatedPrice: 1999.99,
    images: ["/images/laptop1.png"],
    type: "SALE",
    ratings: 4.5,
    stock: 10,
    categoryIds: ["gaming-laptops"],
    discounts: [
      {
        customerGroup: "VIP",
        price: 300,
        until: new Date(Date.now() + 172800000).toISOString(), // 48 hours from now
      },
      {
        customerGroup: "PREMIUM",
        price: 200,
        until: new Date(Date.now() + 86400000).toISOString(), // 24 hours from now
      }
    ]
  },
  {
    _id: "2",
    name: "Sony WH-1000XM5 Wireless Headphones",
    price: 399.99,
    calculatedPrice: 399.99,
    images: ["/images/headphones1.png"],
    type: "NEW",
    ratings: 5,
    stock: 15,
    categoryIds: ["audio-headphones"],
    discounts: [
      {
        customerGroup: "VIP",
        price: 100,
        until: new Date(Date.now() + 259200000).toISOString(), // 72 hours from now
      }
    ]
  },
  {
    _id: "3",
    name: "NVIDIA GeForce RTX 4080",
    price: 1299.99,
    calculatedPrice: 1299.99,
    images: ["/images/gpu1.png"],
    type: "SALE",
    ratings: 4.8,
    stock: 5,
    categoryIds: ["graphics-cards"],
    discounts: [
      {
        customerGroup: "VIP",
        price: 200,
        away: new Date(Date.now() - 86400000).toISOString(), // Started 24 hours ago
        until: new Date(Date.now() + 432000000).toISOString(), // 5 days from now
      },
      {
        customerGroup: "BASIC",
        price: 100,
        until: new Date(Date.now() + 172800000).toISOString(), // 48 hours from now
      }
    ]
  },
  {
    _id: "4",
    name: "Samsung 49\" Odyssey G9 Gaming Monitor",
    price: 1499.99,
    calculatedPrice: 1499.99,
    images: ["/images/monitor1.png"],
    type: "REGULAR",
    ratings: 4.7,
    stock: 8,
    categoryIds: ["gaming-monitors"],
    discounts: [
      {
        customerGroup: "VIP",
        price: 250,
        away: new Date(Date.now() - 172800000).toISOString(), // Started 48 hours ago
        until: new Date(Date.now() + 604800000).toISOString(), // 7 days from now
      }
    ]
  }
];