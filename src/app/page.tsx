"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import BestOffers from "@/components/landing-page/BestOffers";
import ClientLayout from "@/components/landing-page/ClientLayout";
import DuelArena from "@/components/landing-page/DuelArena";
import FeaturedProducts from "@/components/landing-page/FeaturedProducts";
import HeroSection from "@/components/landing-page/HeroSection";
import ProductSection from "@/components/landing-page/ProductSection";
import RatingsSection from "@/components/landing-page/RatingsSection";
import RegisterSection from "@/components/landing-page/RegisterSection";
import Testimonials from "@/components/landing-page/Testimonials";
import TournamentWinner from "@/components/landing-page/TournamentWinner";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  


  // Hide scroll indicator after user has scrolled a bit
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.3) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ClientLayout>
      <main>
        {/* Progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
          style={{ scaleX: scrollYProgress }}
        />
        
        {/* Scroll indicator */}
        {showScrollIndicator && (
          <motion.div 
            className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-600 mb-2">Scroll to explore</p>
              <motion.div 
                className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
              >
                <motion.div 
                  className="w-1 h-2 bg-primary rounded-full mt-2"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
        
        {/* <HeroSection /> */}
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <RegisterSection />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <ProductSection />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <BestOffers />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <FeaturedProducts />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <TournamentWinner />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <DuelArena />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <Testimonials />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <RatingsSection />
        </motion.div>
      </main>
    </ClientLayout>
  );
}
