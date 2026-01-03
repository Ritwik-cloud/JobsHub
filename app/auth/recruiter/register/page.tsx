'use client';

import { useForm, SubmitHandler } from 'react-hook-form'; 
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { recruiterRegisterPayload } from '@/typeScript/auth_interface/auth.interface';
import { AppDispatch } from '@/redux/store/store';
import { useDispatch } from 'react-redux';
import { recruiterRegister } from '@/redux/slice/authSlice/authSlice';

export const registrationSchema = yup.object({
  name: yup.string().min(3, 'Name must be at least 3 characters').required('Full name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  designation: yup.string().required('Designation is required'),
  company: yup.string().required('Company name is required'),
  isNewCompany: yup.boolean().default(true), 
  companyId: yup.string().default(''),      
  website: yup.string().url('Must be a valid URL').required('Company website is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [successful, setSuccessful] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { isSubmitting, errors },
    watch,
  } = useForm<recruiterRegisterPayload>({
    resolver: yupResolver(registrationSchema),
    defaultValues: {
      name: '',
      email: '',
      designation: '',
      company: '',
      isNewCompany: true,
      companyId: '',
      website: '',
      password: '',
    },
  });

  const isNewCompany = watch('isNewCompany');

  useEffect(() => {
    if (isNewCompany) {
      setValue('companyId', '');
      clearErrors('companyId');
    }
  }, [isNewCompany, setValue, clearErrors]);

  const onSubmit: SubmitHandler<recruiterRegisterPayload> = async (data) => {
    const payload = {
      name: data.name,
      email: data.email,
      designation: data.designation,
      company: data.company,
      isNewCompany: Boolean(data.isNewCompany),
      companyId: String(data.companyId),
      website: data.website,
      password: data.password
    };

    try {
      const response = await dispatch(recruiterRegister(payload)).unwrap();

      if (response.status === true) {
        setSuccessful(true);
      }
    } catch (error) {
      console.error("Register error", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex bg-neutral-100">
      {/* Left Side - SVG Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 items-center justify-center p-12">
      
        <div className="max-w-lg">
          <svg
            viewBox="0 0 500 500"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            {/* Background circles */}
            <circle cx="250" cy="250" r="200" fill="#3b82f6" opacity="0.1" />
            <circle cx="250" cy="250" r="150" fill="#60a5fa" opacity="0.1" />
            
            {/* Office building illustration */}
            <g transform="translate(180, 120)">
              {/* Building */}
              <rect x="0" y="40" width="140" height="180" rx="8" fill="#fff" opacity="0.95" />
              
              {/* Windows - 3 columns, 6 rows */}
              {[...Array(6)].map((_, row) => 
                [...Array(3)].map((_, col) => (
                  <rect 
                    key={`${row}-${col}`}
                    x={20 + col * 40} 
                    y={55 + row * 28} 
                    width="20" 
                    height="18" 
                    fill="#60a5fa" 
                    opacity="0.7"
                  />
                ))
              )}
              
              {/* Door */}
              <rect x="50" y="185" width="40" height="35" rx="4" fill="#1e3a8a" />
            </g>
            
            {/* Briefcase icon */}
            <g transform="translate(80, 100)">
              <rect x="0" y="15" width="70" height="55" rx="6" fill="#fff" opacity="0.9" />
              <rect x="25" y="0" width="20" height="20" rx="4" fill="#fff" opacity="0.9" />
              <line x1="15" y1="35" x2="55" y2="35" stroke="#1e3a8a" strokeWidth="3" />
            </g>
            
            {/* Person with tie (recruiter) */}
            <g transform="translate(100, 280)">
              <circle cx="40" cy="30" r="25" fill="#fff" />
              <rect x="20" y="55" width="40" height="50" rx="6" fill="#fff" />
              {/* Tie */}
              <path d="M40 60 L35 80 L40 100 L45 80 Z" fill="#1e3a8a" />
            </g>
            
            {/* Resume/Document stack */}
            <g transform="translate(320, 280)">
              {/* Stack of 3 papers */}
              <rect x="5" y="10" width="50" height="65" rx="4" fill="#fff" opacity="0.6" />
              <rect x="10" y="5" width="50" height="65" rx="4" fill="#fff" opacity="0.8" />
              <rect x="15" y="0" width="50" height="65" rx="4" fill="#fff" opacity="1" />
              
              {/* Lines on top document */}
              <line x1="25" y1="15" x2="55" y2="15" stroke="#1e3a8a" strokeWidth="2" />
              <line x1="25" y1="25" x2="55" y2="25" stroke="#1e3a8a" strokeWidth="2" />
              <line x1="25" y1="35" x2="50" y2="35" stroke="#1e3a8a" strokeWidth="2" />
            </g>
            
            {/* Chart/Growth icon */}
            <g transform="translate(60, 360)">
              <rect x="0" y="30" width="12" height="20" fill="#10b981" opacity="0.8" />
              <rect x="18" y="20" width="12" height="30" fill="#10b981" opacity="0.9" />
              <rect x="36" y="10" width="12" height="40" fill="#10b981" />
              <path d="M5 25 L24 15 L42 5" stroke="#fff" strokeWidth="2" fill="none" />
            </g>
            
            {/* Stars for excellence */}
            <g transform="translate(380, 100)">
              <path d="M20 5 L23 15 L33 15 L25 21 L28 31 L20 25 L12 31 L15 21 L7 15 L17 15 Z" fill="#fbbf24" />
            </g>
            
            {/* Floating elements */}
            <circle cx="90" cy="90" r="6" fill="#fff" opacity="0.6" />
            <circle cx="410" cy="380" r="8" fill="#fff" opacity="0.5" />
            <circle cx="420" cy="140" r="5" fill="#fff" opacity="0.7" />
          </svg>
          
          {/* Text below illustration */}
          <div className="text-center mt-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Grow Your Team
            </h2>
            <p className="text-blue-100 text-lg">
              Join thousands of companies finding top talent on our platform.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 overflow-y-auto">
        <Card className="w-full max-w-md shadow-xl border-gray-200 my-8">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center">Recruiter Registration</CardTitle>
            <CardDescription className="text-center text-base">
              Create your account to start hiring
            </CardDescription>
          </CardHeader>
          <CardContent>
            {successful ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold text-green-800 mb-2">Registration Successful!</h3>
                <p className="text-green-700 mb-4">
                  Your recruiter account has been created successfully.
                </p>
                <Button
                  onClick={() => (window.location.href = '/auth/login')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Go to Login
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
                    {error}
                  </div>
                )}

                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                  
                  <div>
                    <label className="text-sm font-medium leading-none">
                      Full Name
                    </label>
                    <Input 
                      {...register('name')} 
                      placeholder="John Doe"
                      className="mt-2"
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <p className="text-sm font-medium text-red-500 mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium leading-none">
                      Email
                    </label>
                    <Input 
                      {...register('email')} 
                      type="email"
                      placeholder="john@company.com"
                      className="mt-2"
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="text-sm font-medium text-red-500 mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Company Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Company Information</h3>
                  
                  <div>
                    <label className="text-sm font-medium leading-none">
                      Designation
                    </label>
                    <Input 
                      {...register('designation')} 
                      placeholder="HR Manager"
                      className="mt-2"
                      disabled={isSubmitting}
                    />
                    {errors.designation && (
                      <p className="text-sm font-medium text-red-500 mt-1">{errors.designation.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium leading-none">
                      Company Name
                    </label>
                    <Input 
                      {...register('company')} 
                      placeholder="Acme Inc."
                      className="mt-2"
                      disabled={isSubmitting}
                    />
                    {errors.company && (
                      <p className="text-sm font-medium text-red-500 mt-1">{errors.company.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium leading-none">
                      Company Website
                    </label>
                    <Input 
                      {...register('website')} 
                      type="url"
                      placeholder="https://company.com"
                      className="mt-2"
                      disabled={isSubmitting}
                    />
                    {errors.website && (
                      <p className="text-sm font-medium text-red-500 mt-1">{errors.website.message}</p>
                    )}
                  </div>
                </div>

                {/* Security */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Security</h3>
                  
                  <div>
                    <label className="text-sm font-medium leading-none">
                      Password
                    </label>
                    <Input 
                      {...register('password')} 
                      type="password"
                      placeholder="Minimum 8 characters"
                      className="mt-2"
                      disabled={isSubmitting}
                    />
                    {errors.password && (
                      <p className="text-sm font-medium text-red-500 mt-1">{errors.password.message}</p>
                    )}
                  </div>
                </div>

                <Button 
                  className="w-full bg-blue-700 hover:bg-blue-800 cursor-pointer" 
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Recruiter Account'
                  )}
                </Button>

                {/* Bottom Links Container */}
                <div className="space-y-4">
                  {/* Login Link */}
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Already have an account?{' '}
                      <a
                        href="/auth/login"
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        Sign in
                      </a>
                    </p>
                  </div>

                  {/* Candidate Link - ADDED HERE */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Or</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Looking for a job?{' '}
                      <a
                        href="/auth/candidate/register"
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        Register as a Candidate
                      </a>
                    </p>
                  </div>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
