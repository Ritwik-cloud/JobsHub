"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Briefcase } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-white sm:py-24 border-t border-gray-100">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      {/* Decorative Gradient Blobs (Very subtle) */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left Content Area */}
            <div className="p-10 sm:p-12 lg:p-16 flex flex-col justify-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Ready to take the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  next step?
                </span>
              </h2>
              
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Join thousands of professionals advancing their careers with Sure Vacancy.
              </p>

              {/* Checklist */}
              <ul className="mt-8 space-y-3">
                {[
                  "Create a verified professional profile",
                  "Get matched with top companies",
                  "Direct messaging with recruiters"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center px-6 py-3.5 text-base font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-0.5"
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  href="/post-job"
                  className="inline-flex items-center justify-center px-6 py-3.5 text-base font-bold text-gray-900 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all hover:border-gray-300"
                >
                  Post a Job
                </Link>
              </div>
            </div>

            {/* Right Image/Visual Area */}
            <div className="relative bg-gray-50 lg:h-auto min-h-[300px] flex items-center justify-center p-8 border-l border-gray-100">
               {/* Abstract Grid Visual */}
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
               
               <div className="relative w-full max-w-xs aspect-square bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col items-center justify-center text-center rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 text-blue-600">
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Job Alerts</h3>
                  <p className="text-gray-500 text-sm mt-2">Get notified instantly when your dream job is posted.</p>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-6 -right-6 bg-white p-3 rounded-xl shadow-lg border border-gray-100 animate-bounce delay-700">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                       <span className="text-xs font-bold text-gray-700">New Match!</span>
                    </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
