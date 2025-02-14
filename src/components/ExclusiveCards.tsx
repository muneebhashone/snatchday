import React from "react";
import Image from "next/image";
import crown from "@/app/images/crown.png";

interface PricingFeature {
  text: string;
}

interface PricingCard {
  badge?: string;
  icon: string;
  title: string;
  subtitle: string;
  price: string;
  period: string;
  features: PricingFeature[];
  buttonText: string;
  isPopular?: boolean;
  bgcolor?: string;

}

const pricingCards: PricingCard[] = [
  {
    icon: crown.src,
    title: "Basic",
    subtitle: "For individuals",
    price: "99",
    period: "/Monthly",
    features: [
      { text: "All analytics features" },
      { text: "Up to 250,000 tracked visits" },
      { text: "Normal support" },
      { text: "Up to 3 team members" },
    ],
    buttonText: "Get started",
    bgcolor: "bg-gray-200",
  },
  {
    badge: "POPULAR",
    icon: crown.src,
    title: "Pro",
    subtitle: "For startups",
    price: "199",
    period: "/Semi-Annually",
    features: [
      { text: "All analytics features" },
      { text: "Up to 250,000 tracked visits" },
      { text: "Normal support" },
      { text: "Up to 3 team members" },
    ],
    buttonText: "Get started",
    isPopular: true,
    bgcolor: "bg-white",
  },
  {
    icon: crown.src,
    title: "Enterprise",
    subtitle: "For big companies",
    price: "399",
    period: "/Annually",
    features: [
      { text: "All analytics features" },
      { text: "Up to 250,000 tracked visits" },
      { text: "Normal support" },
      { text: "Up to 3 team members" },
    ],
    buttonText: "Get started",
    bgcolor: "bg-[#F6E9E1]",
  },
];

const ExclusiveCards = () => {
  return (
    // <div className="grid grid-cols-1 md:grid-cols-2 items-center lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
    <div className="lg:grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-[1440px] mx-auto">
      {pricingCards.map((card, index) => (
        <div
          key={index} 
          className={`relative rounded-xl p-16 w-full md:w-auto ${
            card.isPopular ? "bg-[#8D4CC4]" : "bg-white"
          } ${card.isPopular ? "mt-0" : "mt-20"} ${card.isPopular ? "mb-20" : "mb-0"} ${card.isPopular ? "shadow-none" : "shadow-lg"} hover:scale-105 transition-transform duration-300`}
        >
          {/* Popular Badge */}
          {card.badge && (
            <span className="absolute top-5 right-5 bg-primary text-white text-sm px-4 py-1 rounded-full">
              {card.badge}
            </span>
          )}

          {/* Card Header */}
         
            <div className="flex items-center gap-3">
                <div className={`flex items-center gap-3 p-5 rounded-xl ${card.bgcolor}`}>
              <Image src={card.icon} alt={card.title} width={24} height={24} className={`w-6 h-6 ${card.title !== "Basic" ? "grayscale-0" : "grayscale"}`} />
              </div>
              <div>
              <p
                className={`text-lg ${
                  card.isPopular ? "text-white" : "text-foreground"
                }`}
              >
                {card.subtitle}
              </p>
              <h3
                className={`text-xl font-extrabold ${
                  card.isPopular ? "text-white" : "text-gray-900"
                }`}
              >
                {card.title}
              </h3>
              </div>
            </div>
            <p className={`mt-5 ${card.isPopular ? "text-white" : "text-foreground"}`}>Lorem ipsum dolor sit amet doloroli sitiol conse ctetur adipiscing elit. </p>
      

          {/* Pricing */}
          <div className="mt-4">
            <div className="flex items-baseline">
              <span
                className={`text-[68px] font-extrabold ${
                  card.isPopular ? "text-white" : "text-[#1C1B1D]"
                }`}
              >
                ${card.price}
              </span>
              <span
                className={`ml-1 text-lg ${
                  card.isPopular ? "text-white/80" : "text-foreground"
                }`}
              >
                {card.period}
              </span>
            </div>
          </div>

          {/* Features */}
          <div className="mt-3 space-y-4">
            <h4
              className={`text-lg font-extrabold ${
                card.isPopular ? "text-white" : "text-[#1C1B1D]"
              }`}
            >
              Whats Included
            </h4>
            <ul className="space-y-3">
              {card.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center gap-3">
                  <svg
                    className={`w-6 h-6 ${
                      card.isPopular ? "text-white" : "text-[#8D4CC4]"
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span
                    className={`text-lg ${
                      card.isPopular ? "text-white/80" : "text-[#1C1B1D]"
                    }`}
                  >
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <button
            className={`w-full min-h-[68px] mt-8 px-4 py-3 rounded-full text-lg font-medium transition-colors
              ${
                card.isPopular
                  ? "bg-white text-[#8D4CC4] hover:bg-gray-50"
                  : "gradient-primary text-white hover:opacity-90"
              }
            `}
          >
            {card.buttonText}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ExclusiveCards;
