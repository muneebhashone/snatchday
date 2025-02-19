import React from "react";
import Image from "next/image";
import Link from "next/link";
import footerLogo from "@/app/images/footerlogo.png";
import dhl from "@/app/images/dhl.png";
import hermes from "@/app/images/hermes.png";
import dpd from "@/app/images/dpd.png";
import vorkasse from "@/app/images/vorkasse.png";
import { Facebook, Instagram, X } from "lucide-react";
import EarlyAccess from "./EarlyAccess";
import fot1 from "@/app/images/fot1.svg";
import fot2 from "@/app/images/fot2.svg";
import fot3 from "@/app/images/fot3.svg";
import fot4 from "@/app/images/fot4.svg";
import fot5 from "@/app/images/fot5.svg";
import fot6 from "@/app/images/fot6.svg";
import { FooterSvg1, FooterSvg2, FooterSvg4, FooterSvg3 } from "../icons/icon";

const Footer = () => {
  const footerLinks = {
    pursue: [
      { label: "About Us", href: "/about-us" },
      { label: "Jobs/Career", href: "/jobs" },
      { label: "Imprint", href: "/imprint" },
      { label: "Terms And Conditions", href: "/terms" },
      { label: "Right Of Withdrawal", href: "/withdrawal" },
      { label: "Data Protection", href: "/data-protection" },
      { label: "Become A Partner", href: "/partner" },
      { label: "Cookie Settings", href: "/cookie-settings" },
    ],
    serviceCenter: [
      { label: "FAQ/Support", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Complaints & Returns", href: "/returns" },
      { label: "Buy A Voucher", href: "/voucher" },
      { label: "Callback Service", href: "/callback" },
      { label: "Warranty & Repair", href: "/warranty" },
      { label: "Payment Methods", href: "/payment" },
    ],
    infoCenter: [
      { label: "VIP Membership", href: "/vip" },
      { label: "Game Instructions", href: "/instructions" },
      { label: "Conditions Of Participation", href: "/conditions" },
      { label: "Shipping Costs & Delivery Times", href: "/shipping" },
      { label: "Tournaments", href: "/tournaments" },
      { label: "Duels", href: "/duels" },
      { label: "Points System", href: "/points" },
    ],
    socialMedia: [
      { icon: <Facebook />, label: "Facebook", href: "/facebook" },
      { icon: <Instagram />, label: "Instagram", href: "/instagram" },
      { icon: <X />, label: "X", href: "/x" },
    ],
    deliveryServices: [
      { image: dhl, alt: "DHL" },
      { image: hermes, alt: "Hermes" },
      { image: dpd, alt: "DPD" },
      { image: vorkasse, alt: "Vorkasse" },
    ],
    paymentMethods: [
      { image: fot1, alt: "PayPal" },
      { image: fot2, alt: "Sofort" },
      { image: fot3, alt: "Mastercard" },
      { image: fot4, alt: "Visa" },
      { image: fot5, alt: "Klarna" },
      { image: fot6, alt: "Giropay" },
    ],
  };

  return (
    <footer className="relative w-full ">
      {/* Main Footer Content */}
      <div className="bg-gradient-to-r from-[#F37835] to-[#3B1678] text-white pb-20 relative">
        {/* SVG Background Layer */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-10">
          <div className="absolute top-0 left-0 scale-150 animate-rotate">
            <FooterSvg1 />
          </div>
          <div className="absolute top-40 right-20 scale-150 animate-rotate [animation-delay:-2s]">
            <FooterSvg2 />
          </div>
          <div className="absolute bottom-40 left-1/4 scale-150 animate-rotate [animation-delay:-4s]">
            <FooterSvg3 />
          </div>
          <div className="absolute top-1/2 right-1/3 scale-150 animate-rotate [animation-delay:-6s]">
            <FooterSvg4 />
          </div>
          <div className="absolute bottom-20 right-1/4 scale-150 animate-rotate [animation-delay:-1s]">
            <FooterSvg1 />
          </div>
          <div className="absolute top-60 left-1/3 scale-150 animate-rotate [animation-delay:-3s]">
            <FooterSvg2 />
          </div>
          <div className="absolute bottom-1/4 right-1/2 scale-150 animate-rotate [animation-delay:-5s]">
            <FooterSvg3 />
          </div>
          <div className="absolute top-3/4 left-20 scale-150 animate-rotate [animation-delay:-7s]">
            <FooterSvg4 />
          </div>
        </div>

        <div className="relative z-20">
          <EarlyAccess />
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {/* Logo and Info Section */}
              <div className="col-span-1">
                <Image
                  src={footerLogo}
                  alt="Snatch Logo"
                  width={150}
                  height={50}
                />
                <p className="text-sm mt-4 text-white">
                  All prices include statutory VAT plus shipping costs and cash
                  on delivery fee if applicable. Delivery only within Germany.
                  Product images and information on technical product properties
                  as well as price information are subject to change. Brand
                  names, trademarks and all product images are the property of
                  their rights owners and are used here for description purposes
                  only.
                </p>
              </div>

              {/* Pursue Section */}
              <div className="col-span-1">
                <p className="font-bold text-white text-lg mb-4">Pursue</p>
                <ul className="space-y-3">
                  {footerLinks.pursue.map((link, index) => (
                    <li key={index} className="text-lg text-white">
                      <Link href={link.href} className="hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Service Center Section */}
              <div className="col-span-1">
                <p className="font-bold text-white text-lg mb-4">
                  Service Center
                </p>
                <ul className="space-y-3">
                  {footerLinks.serviceCenter.map((link, index) => (
                    <li key={index} className="text-lg text-white">
                      <Link href={link.href} className="hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Info Center Section */}
              <div className="col-span-1">
                <p className="font-bold text-white text-lg mb-4">Info Center</p>
                <ul className="space-y-3">
                  {footerLinks.infoCenter.map((link, index) => (
                    <li key={index} className="text-lg text-white">
                      <Link href={link.href} className="hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Media & Delivery Section */}
              <div className="col-span-1">
                <p className="font-bold text-white text-lg mb-4">
                  Social Media
                </p>
                <ul className="space-y-4">
                  {footerLinks.socialMedia.map((social, index) => (
                    <li key={index} className="text-lg text-white">
                      <Link
                        href={social.href}
                        className="hover:underline flex items-center gap-2"
                      >
                        {social.icon}
                        {social.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <p className="font-bold mb-4 text-white text-lg">
                    Our Delivery Services
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {footerLinks.deliveryServices.map((service, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-md flex items-center justify-center h-7"
                      >
                        <Image
                          src={service.image}
                          alt={service.alt}
                          width={62}
                          height={17}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-[#333333] text-white py-4 text-center">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-start">
            © 2017-2025{" "}
            <Link href="/" className="hover:underline text-primary">
              Snatch Day GmbH
            </Link>
            <p>
              All rights reserved. Snatch Day is a registered trademark and
              protected by copyright.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4 md:mt-0">
            {footerLinks.paymentMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white rounded-md flex items-center justify-center w-20 h-8"
              >
                <Image
                  src={method.image}
                  alt={method.alt}
                  width={53}
                  height={22}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
