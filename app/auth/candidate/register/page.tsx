"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import * as yup from "yup";
import { candidateRegisterPayload } from "@/typeScript/auth_interface/auth.interface";
import { AppDispatch } from "@/redux/store/store";
import { useDispatch } from "react-redux";
import { candidateRegister } from "@/redux/slice/authSlice/authSlice";

export const Schema = yup.object({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [successful, setSuccessful] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<candidateRegisterPayload>({
    resolver: yupResolver(Schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: candidateRegisterPayload) => {
    setError(null);
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await dispatch(candidateRegister(payload)).unwrap();
      if (response.status === true) {
        setSuccessful(true);
      }
    } catch (err) {
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

            {/* Multiple people illustration */}
            <g transform="translate(100, 120)">
              {/* Person 1 */}
              <circle cx="80" cy="60" r="30" fill="#fff" />
              <rect x="55" y="90" width="50" height="70" rx="8" fill="#fff" />

              {/* Person 2 */}
              <circle cx="180" cy="65" r="28" fill="#fff" opacity="0.9" />
              <rect
                x="158"
                y="93"
                width="44"
                height="65"
                rx="8"
                fill="#fff"
                opacity="0.9"
              />

              {/* Person 3 */}
              <circle cx="270" cy="70" r="26" fill="#fff" opacity="0.8" />
              <rect
                x="250"
                y="96"
                width="40"
                height="60"
                rx="8"
                fill="#fff"
                opacity="0.8"
              />
            </g>

            {/* Network connections */}
            <line
              x1="180"
              y1="200"
              x2="280"
              y2="200"
              stroke="#fff"
              strokeWidth="3"
              opacity="0.6"
              strokeDasharray="5,5"
            />
            <line
              x1="200"
              y1="180"
              x2="250"
              y2="230"
              stroke="#fff"
              strokeWidth="3"
              opacity="0.6"
              strokeDasharray="5,5"
            />

            {/* Checkmark icon */}
            <g transform="translate(350, 320)">
              <circle cx="25" cy="25" r="30" fill="#10b981" opacity="0.9" />
              <path
                d="M15 25 L22 32 L38 16"
                stroke="#fff"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            {/* Star icons */}
            <g transform="translate(60, 320)">
              <path
                d="M25 5 L30 20 L45 20 L33 28 L38 43 L25 35 L12 43 L17 28 L5 20 L20 20 Z"
                fill="#fbbf24"
                opacity="0.8"
              />
            </g>

            {/* Document with checkmark */}
            <g transform="translate(80, 50)">
              <rect
                x="0"
                y="0"
                width="40"
                height="50"
                rx="4"
                fill="#fff"
                opacity="0.8"
              />
              <path
                d="M10 20 L15 25 L30 10"
                stroke="#10b981"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </g>

            {/* Floating elements */}
            <circle cx="100" cy="80" r="6" fill="#fff" opacity="0.6" />
            <circle cx="420" cy="120" r="8" fill="#fff" opacity="0.5" />
            <circle cx="390" cy="380" r="10" fill="#fff" opacity="0.7" />
          </svg>

          {/* Text below illustration */}
          <div className="text-center mt-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Join Our Community
            </h2>
            <p className="text-blue-100 text-lg">
              Create your account and start connecting with opportunities today.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md shadow-xl border-gray-200">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center">
              Create Your Account
            </CardTitle>
            <CardDescription className="text-center text-base">
              Join our platform to find your dream job
            </CardDescription>
          </CardHeader>
          <CardContent>
            {successful ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  Registration Successful!
                </h3>
                <p className="text-green-700 mb-4">
                  Your account has been created successfully.
                </p>
                <Button
                  onClick={() => (window.location.href = "/auth/login")}
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
                  <h3 className="text-lg font-semibold text-gray-900">
                    Personal Information
                  </h3>

                  <div>
                    <label className="text-sm font-medium leading-none">
                      Full Name
                    </label>
                    <Input
                      {...register("name")}
                      placeholder="John Doe"
                      className="mt-2"
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <p className="text-sm font-medium text-red-500 mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium leading-none">
                      Email
                    </label>
                    <Input
                      {...register("email")}
                      type="email"
                      placeholder="john@example.com"
                      className="mt-2"
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="text-sm font-medium text-red-500 mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Security */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Security
                  </h3>

                  <div>
                    <label className="text-sm font-medium leading-none">
                      Password
                    </label>
                    <Input
                      {...register("password")}
                      type="password"
                      placeholder="Minimum 8 characters"
                      className="mt-2"
                      disabled={isSubmitting}
                    />
                    {errors.password && (
                      <p className="text-sm font-medium text-red-500 mt-1">
                        {errors.password.message}
                      </p>
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
                    "Create Account"
                  )}
                </Button>

                {/* Bottom Links Container */}
                <div className="space-y-4">
                  {/* Login Link */}
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Already have an account?{" "}
                      <a
                        href="/auth/login"
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        Sign in
                      </a>
                    </p>
                  </div>

                  {/* Recruiter Link - ADDED HERE */}
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
                      Looking to hire?{" "}
                      <a
                        href="/auth/recruiter/register"
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        Register as a Recruiter
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
