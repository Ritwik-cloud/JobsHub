import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  return (
    <section className="py-16 bg-blue-50/50 sm:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by professionals
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            See what job seekers are saying about their experience with Sure Vacancy.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-12 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "I found my dream job within a week of signing up. The platform is incredibly user-friendly and the job recommendations were spot on."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div>
                  <h4 className="font-bold text-gray-900">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Software Engineer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
