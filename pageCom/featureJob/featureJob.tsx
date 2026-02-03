"use client";
import React from 'react';
import Link from 'next/link';
import { Briefcase, MapPin, Clock, ArrowRight, Building2 } from 'lucide-react';

const FeaturedJobs = () => {
  const jobs = [
    {
      id: 1,
      role: "Senior Frontend Engineer",
      company: "TechCorp",
      location: "Remote",
      salary: "$120k - $150k",
      type: "Full Time",
      posted: "2d ago",
      tags: ["React", "Next.js", "TypeScript"],
      logo: "TC"
    },
    {
      id: 2,
      role: "Product Designer",
      company: "Creative Studio",
      location: "New York, NY",
      salary: "$90k - $120k",
      type: "Remote",
      posted: "1d ago",
      tags: ["Figma", "UI/UX", "Design System"],
      logo: "CS"
    },
    {
      id: 3,
      role: "Backend Developer",
      company: "DataSystems",
      location: "Austin, TX",
      salary: "$130k - $160k",
      type: "Full Time",
      posted: "5h ago",
      tags: ["Node.js", "Python", "AWS"],
      logo: "DS"
    },
    {
      id: 4,
      role: "Marketing Manager",
      company: "Growth.io",
      location: "London, UK",
      salary: "$80k - $100k",
      type: "Hybrid",
      posted: "3d ago",
      tags: ["SEO", "Content", "Strategy"],
      logo: "GI"
    }
  ];

  return (
    <section className="py-16 bg-white sm:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Featured Opportunities
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Hand-picked jobs from top companies looking for talent like you.
            </p>
          </div>
          <Link 
            href="/jobs" 
            className="hidden md:inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors mt-4 md:mt-0"
          >
            View all jobs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {jobs.map((job) => (
            <div 
              key={job.id} 
              className="group relative bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-lg">
                    {job.logo}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {job.role}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {job.company}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                    </div>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                  {job.type}
                </span>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {job.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-50 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="font-semibold text-gray-900">{job.salary}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {job.posted}</span>
                </div>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link 
            href="/jobs" 
            className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all"
          >
            View All Jobs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
