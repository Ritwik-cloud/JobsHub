"use client";
import React from 'react';
import { UserPlus, FileText, Briefcase, Search, Upload, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
    const jobSeekerSteps = [
        {
            number: 1,
            icon: <UserPlus className="w-6 h-6" />,
            title: "Create Your Profile",
            description: "Sign up for free and build your professional profile with your skills, experience, and preferences."
        },
        {
            number: 2,
            icon: <Search className="w-6 h-6" />,
            title: "Search & Apply",
            description: "Browse thousands of jobs, filter by location, salary, and industry. Apply with one click."
        },
        {
            number: 3,
            icon: <CheckCircle className="w-6 h-6" />,
            title: "Get Hired",
            description: "Track your applications, connect with recruiters, and land your dream job faster."
        }
    ];

    const recruiterSteps = [
        {
            number: 1,
            icon: <UserPlus className="w-6 h-6" />,
            title: "Register Company",
            description: "Create your company profile and showcase your brand to attract top talent."
        },
        {
            number: 2,
            icon: <Upload className="w-6 h-6" />,
            title: "Post Jobs",
            description: "List your job openings with detailed descriptions, requirements, and salary ranges."
        },
        {
            number: 3,
            icon: <Briefcase className="w-6 h-6" />,
            title: "Hire Talent",
            description: "Review applications, shortlist candidates, and hire the best fit for your team."
        }
    ];

    const [activeTab, setActiveTab] = React.useState<'jobseeker' | 'recruiter'>('jobseeker');

    const steps = activeTab === 'jobseeker' ? jobSeekerSteps : recruiterSteps;

    return (
        <section className="py-12 bg-linear-to-b from-blue-50 to-white sm:py-16 lg:py-24">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                {/* Header */}
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                        How It Works
                    </h2>
                    <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600">
                        Get started in three simple steps. Whether you're looking for a job or hiring talent, we've made it easy.
                    </p>
                </div>

                {/* Tab Selector */}
                <div className="flex justify-center mt-8">
                    <div className="inline-flex rounded-lg bg-white border border-gray-200 p-1 shadow-sm">
                        <button
                            onClick={() => setActiveTab('jobseeker')}
                            className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                                activeTab === 'jobseeker'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            For Job Seekers
                        </button>
                        <button
                            onClick={() => setActiveTab('recruiter')}
                            className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                                activeTab === 'recruiter'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            For Recruiters
                        </button>
                    </div>
                </div>

                {/* Steps */}
                <div className="relative mt-12 lg:mt-20">
                    {/* Connecting Line */}
                    <div className="absolute inset-x-0 hidden xl:px-44 top-8 md:block md:px-20 lg:px-28">
                        <svg
                            className="w-full text-gray-300"
                            viewBox="0 0 1000 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0 20 Q 250 0, 500 20 T 1000 20"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeDasharray="8 8"
                                fill="none"
                            />
                        </svg>
                    </div>

                    {/* Step Cards */}
                    <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-8 lg:gap-x-12">
                        {steps.map((step, index) => (
                            <div
                                key={step.number}
                                className="group animate-[fade-in-up_0.6s_ease-out_forwards] opacity-0"
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                {/* Icon Circle */}
                                <div className="flex items-center justify-center w-20 h-20 mx-auto bg-linear-to-br from-blue-500 to-blue-600 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <div className="text-white">
                                        {step.icon}
                                    </div>
                                </div>

                                {/* Step Number Badge */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">
                                    <span className="inline-flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-blue-600 rounded-full border-4 border-white shadow-md">
                                        {step.number}
                                    </span>
                                </div>

                                {/* Content */}
                                <h3 className="mt-8 text-xl font-bold leading-tight text-gray-900 md:mt-10 group-hover:text-blue-600 transition-colors">
                                    {step.title}
                                </h3>
                                <p className="mt-4 text-base text-gray-600 leading-relaxed px-2">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Button */}
                <div className="flex justify-center mt-12 lg:mt-16">
                    <a
                        href={activeTab === 'jobseeker' ? '/auth/signup' : '/auth/recruiter/signup'}
                        className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-blue-700/40 hover:scale-105"
                    >
                        <span>Get Started Now</span>
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;
