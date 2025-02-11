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
  },
];

const ExclusiveCards = () => {
  return (
    // <div className="grid grid-cols-1 md:grid-cols-2 items-center lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
    <div className="flex flex-wrap justify-center lg:grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
      {pricingCards.map((card, index) => (
        <div
          key={index}
          className={`relative rounded-3xl p-16 w-full md:w-auto ${
            card.isPopular ? "bg-[#8D4CC4]" : "bg-white"
          } shadow-lg hover:scale-105 transition-transform duration-300`}
        >
          {/* Popular Badge */}
          {card.badge && (
            <span className="absolute -top-3 right-8 bg-[#FF6B3D] text-white text-sm px-4 py-1 rounded-full">
              {card.badge}
            </span>
          )}

          {/* Card Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image src={card.icon} alt={card.title} width={24} height={24} />
              <h3
                className={`text-xl font-semibold ${
                  card.isPopular ? "text-white" : "text-gray-900"
                }`}
              >
                {card.title}
              </h3>
            </div>
            <p
              className={`text-sm ${
                card.isPopular ? "text-white/80" : "text-gray-500"
              }`}
            >
              {card.subtitle}
            </p>
          </div>

          {/* Pricing */}
          <div className="mt-8">
            <div className="flex items-baseline">
              <span
                className={`text-6xl font-bold ${
                  card.isPopular ? "text-white" : "text-gray-900"
                }`}
              >
                ${card.price}
              </span>
              <span
                className={`ml-1 text-sm ${
                  card.isPopular ? "text-white/80" : "text-gray-500"
                }`}
              >
                {card.period}
              </span>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 space-y-4">
            <h4
              className={`text-sm font-medium ${
                card.isPopular ? "text-white" : "text-gray-900"
              }`}
            >
              Whats Included
            </h4>
            <ul className="space-y-3">
              {card.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center gap-3">
                  <svg
                    className={`w-5 h-5 ${
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
                    className={`text-sm ${
                      card.isPopular ? "text-white/80" : "text-gray-500"
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
            className={`w-full mt-8 px-4 py-3 rounded-full text-sm font-medium transition-colors
              ${
                card.isPopular
                  ? "bg-white text-[#8D4CC4] hover:bg-gray-50"
                  : "bg-gradient-to-r from-[#FF6B3D] to-[#8D4CC4] text-white hover:opacity-90"
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
