"use client";
import React from 'react';
import Link from 'next/link';
import { Target, Users, Shield, Zap, TrendingUp, Globe } from 'lucide-react';
import Header from '@/pages/header/header';
import Footer from '@/pages/footer/footer';

const AboutUs = () => {
  return (
    <div className="bg-white">
      <Header/>
      {/* 1. Hero Section */}
      <section className="relative py-20 overflow-hidden bg-blue-50/50">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-blue-200/50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 bg-indigo-200/50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        
        <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
            Our Story
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Bridging the gap between <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
              talent and opportunity.
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            JobsHub was founded with a simple mission: to make the job search process human, transparent, and efficient for everyone.
          </p>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="py-12 border-b border-gray-100">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
            {[
              { label: "Jobs Posted", value: "10k+" },
              { label: "Successful Hires", value: "8.5k+" },
              { label: "Companies", value: "2,000+" },
              { label: "Active Users", value: "50k+" },
            ].map((stat, index) => (
              <div key={index} className="p-4">
                <div className="text-3xl font-bold text-blue-600 sm:text-4xl">{stat.value}</div>
                <div className="mt-2 text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Mission & Values */}
      <section className="py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
                We're building the future of recruitment.
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At JobsHub, we believe that finding a job shouldn't be a full-time job. We use advanced matching algorithms and a user-first approach to connect the right people with the right roles.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Whether you're a fresh graduate looking for your first break or a seasoned professional seeking a career pivot, we are here to support your journey.
              </p>
              
              <div className="mt-8">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all"
                >
                  Join Our Journey
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: Target, title: "Precision", desc: "AI-driven matching ensures relevant connections." },
                { icon: Shield, title: "Trust", desc: "Verified companies and secure data protection." },
                { icon: Zap, title: "Speed", desc: "Fast-track your application to hiring managers." },
                { icon: Users, title: "Community", desc: "A supportive network of professionals." },
              ].map((item, index) => (
                <div key={index} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-100 transition-all">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Team Section (Optional) */}
      <section className="py-20 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform">
                <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full mb-4 overflow-hidden">
                   {/* Placeholder for images */}
                   <img src={`https://ui-avatars.com/api/?name=User+${i}&background=random`} alt="Team Member" />
                </div>
                <h3 className="font-bold text-lg text-gray-900">Alex Morgan</h3>
                <p className="text-blue-600 text-sm font-medium mb-3">Co-Founder & CEO</p>
                <p className="text-gray-500 text-sm">Passionate about connecting people with their dream careers through technology.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default AboutUs;

