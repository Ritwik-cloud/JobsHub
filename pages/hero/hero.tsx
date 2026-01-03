"use client";
import Link from "next/link";
import React, { useState } from "react";
import Header from "../header/header";
import FeaturedJobs from "../featureJob/featureJob";
import HowItWorks from "../howItWorks/howItWorks";

const Hero = () => {
  return (
    <>
   
    <div className="min-h-screen w-full bg-[#f8fafc] relative">
      {/* Radial Gradient Background from Bottom */}
      <div
        className="absolute inset-0 z-0"
        // style={{
        //   background:
        //     "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
        // }}
//         style={{
//   background:
//     "radial-gradient(125% 125% at 50% 90%, #eff6ff 40%, #1e40af 100%)",
// }}
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
      <div className="  overflow-x-hidden bg-linear-to-br from-blue-50 via-white to-blue-50">
        <Header />

        <section className="relative py-16 mask-gradient-to-b sm:py-20 lg:py-20">
          <div className="absolute inset-0 "></div>

          <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-900 bg-blue-100 border border-blue-200 rounded-full mb-6">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                Trusted by 10,000+ Job Seekers & Recruiters
              </div>

              <div className="flex flex-col gap-2 sm:gap-3">
                <h1 className="text-3xl font-medium leading-tight text-gray-600 sm:text-6xl lg:text-6xl  ">
                  Find Your
                </h1>
                <span className="text-5xl sm:text-7xl lg:text-7xl font-bold leading-none text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-blue-700 to-blue-800  drop-shadow-sm">
                  Dream Job
                </span>
              
              </div>

              <p className="max-w-2xl mx-auto mt-6 text-lg leading-8 text-gray-600">
                Connect with top companies hiring right now. Browse thousands of
                opportunities across multiple industries and locations.
              </p>

              {/* Search Bar */}
              <div className="max-w-3xl mx-auto mt-10">
                <div className="flex flex-col sm:flex-row gap-3 p-3 bg-white rounded-2xl shadow-xl shadow-blue-600/10 border border-blue-100">
                  <div className="flex-1 flex items-center px-4 py-3 bg-gray-50 rounded-lg">
                    <svg
                      className="w-5 h-5 text-gray-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="Job title or keyword"
                      className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
                    />
                  </div>

                  <div className="flex-1 flex items-center px-4 py-3 bg-gray-50 rounded-lg">
                    <svg
                      className="w-5 h-5 text-gray-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="Location"
                      className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
                    />
                  </div>

                  <button className="px-8 py-3 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-blue-700/40">
                    Search Jobs
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">5,000+</div>
                  <div className="text-sm text-gray-600 mt-1">Active Jobs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">1,200+</div>
                  <div className="text-sm text-gray-600 mt-1">Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">98%</div>
                  <div className="text-sm text-gray-600 mt-1">Success Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </section>

        {/* Featured Categories Section */}
        {/* <section className="py-12 bg-white border-t border-blue-100">
          {/* <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900">
                Popular Job Categories
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                "Software Dev",
                "Marketing",
                "Design",
                "Sales",
                "Finance",
                "HR",
              ].map((category) => (
                <a
                  key={category}
                  href="#"
                  className="flex flex-col items-center justify-center p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-200 hover:shadow-lg group"
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {category}
                  </span>
                </a>
              ))}
            </div>
          </div> 

          
        </section> */}


        
      </div>


     
    </div>







   
      </>
  );
};

export default Hero;
