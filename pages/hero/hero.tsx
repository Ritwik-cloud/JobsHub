"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Header from "../header/header";
import { AppDispatch, useAppSelector } from "@/redux/store/store";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion"; 

const Hero = () => {
  const { isLogin, user } = useAppSelector((state) => state.Auth);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, 
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const blobVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.1, 0.2, 0.1],
      transition: {
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  return (
    <>
      <div className="min-h-screen w-full bg-[#f8fafc] relative overflow-hidden">
        {/* Animated Background Gradients */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 15% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 40%),
              radial-gradient(circle at 75% 65%, rgba(147, 51, 234, 0.15) 0%, transparent 40%),
              radial-gradient(circle at 35% 85%, rgba(14, 165, 233, 0.15) 0%, transparent 45%),
              radial-gradient(circle at 85% 15%, rgba(236, 72, 153, 0.1) 0%, transparent 35%),
              linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)
            `,
          }}
        />

        <div className="relative z-10 overflow-x-hidden">
          <Header />

          <section className="relative py-16 sm:py-20 lg:py-20">
            <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto text-center"
              >
                {/* Trusted Badge */}
                <motion.div variants={itemVariants}>
                  <div className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-900 bg-blue-100 border border-blue-200 rounded-full mb-6 hover:shadow-md transition-shadow cursor-default">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    Trusted by 10,000+ Job Seekers & Recruiters
                  </div>
                </motion.div>

                {/* Main Heading */}
                <div className="flex flex-col gap-2 sm:gap-3">
                  <motion.h1
                    variants={itemVariants}
                    className="text-3xl font-medium leading-tight text-gray-600 sm:text-6xl lg:text-6xl"
                  >
                    Find Your
                  </motion.h1>
                  <motion.span
                    variants={itemVariants}
                    className="text-5xl sm:text-7xl lg:text-7xl font-bold leading-none text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 drop-shadow-sm pb-2"
                  >
                    Dream Job
                  </motion.span>
                </div>

                {/* Subtitle */}
                <motion.p
                  variants={itemVariants}
                  className="max-w-2xl mx-auto mt-6 text-lg leading-8 text-gray-600"
                >
                  Connect with top companies hiring right now. Browse thousands of
                  opportunities across multiple industries and locations.
                </motion.p>

                {/* Buttons */}
                <motion.div
                  variants={itemVariants}
                  className="max-w-3xl mx-auto mt-10 flex items-center justify-center gap-4 relative z-10"
                >
                  {isLogin ? (
                    <Button
                      asChild
                      className="px-6 py-6 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1"
                    >
                      <Link href={`/dashboard/${user?.role || 'candidate'}`}>
                        Go to Dashboard
                      </Link>
                    </Button>
                  ) : (
                    <>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                          href="/auth/candidate/register"
                          className="text-sm font-medium text-gray-700 rounded-lg px-6 py-3 hover:bg-white/50 transition-colors"
                        >
                          Sign Up
                        </Link>
                      </motion.div>

                      <Button
                        asChild
                        className="px-6 py-6 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1"
                      >
                        <Link href="/auth/login">Log In</Link>
                      </Button>
                    </>
                  )}
                </motion.div>

                {/* Quick Stats with Counter Effect (Static for now, can be animated) */}
                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
                >
                  {[
                    { val: "5,000+", label: "Active Jobs" },
                    { val: "1,200+", label: "Companies" },
                    { val: "98%", label: "Success Rate" },
                  ].map((stat, idx) => (
                    <div key={idx} className="text-center group cursor-default">
                      <div className="text-3xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-300">
                        {stat.val}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Decorative Animated Blobs */}
            <motion.div
              variants={blobVariants}
              animate="animate"
              className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
            />
            <motion.div
              variants={blobVariants}
              animate="animate"
              transition={{ delay: 2 }} // Delay for out-of-sync effect
              className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
            />
            <motion.div
              variants={blobVariants}
              animate="animate"
              transition={{ delay: 4 }}
              className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -translate-x-1/2"
            />
          </section>
        </div>
      </div>
    </>
  );
};

export default Hero;
