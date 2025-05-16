"use client";
import React from "react";
import { motion } from "framer-motion";
import { features } from "@/dummydata";

const TestimonialsCards = () => {
  // Container animation for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  // Individual card animation
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.03,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
      transition: {
        duration: 0.3,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  // Icon animation
  const iconVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "backOut"
      }
    },
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-2xl shadow-sm py-3 px-8"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="flex items-center gap-4">
            <motion.div 
              className="p-3 rounded-xl"
              variants={iconVariants}
            >
              {feature.icon}
            </motion.div>
            <h3 className="text-md sm:text-lg font-semibold text-card-foreground">
              {feature.title}
            </h3>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TestimonialsCards;
