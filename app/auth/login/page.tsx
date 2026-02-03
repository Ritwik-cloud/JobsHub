"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Briefcase, User, Loader2 } from "lucide-react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginPayload } from "@/typeScript/auth_interface/auth.interface";
import { candidateLogin, recruiterLogin } from "@/redux/slice/authSlice/authSlice";
import { AppDispatch } from "@/redux/store/store";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export const Schema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("candidate");
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    const toastType = searchParams?.get("toast");

    if (toastType === "login-required") {
      toast.error("First Login", {
        id: "login-required", 
      });
    }
  }, [searchParams]);

  
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<loginPayload>({
    resolver: yupResolver(Schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleCandidateLogin = async (data: loginPayload) => {
    const payload = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await dispatch(candidateLogin(payload)).unwrap();

      if (response.status === true) {
        router.push("/candidate/dashboard");
      }
    } catch (err) {
      console.error("Candidate login failed:", err);
    }
  };

  const handleRecruiterLogin = async (data: loginPayload) => {
    const payload = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await dispatch(recruiterLogin(payload)).unwrap();

      if (response.status === true) {
        router.push("/recruiter/dashboard");
      }
    } catch (err) {
      console.error("Recruiter login failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex bg-neutral-100">
      {/* Left Side - SVG Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-blue-600 to-blue-800 items-center justify-center p-12">
        <div className="max-w-lg">
          <svg
            viewBox="0 0 500 500"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            {/* Background circles */}
            <circle cx="250" cy="250" r="200" fill="#3b82f6" opacity="0.1" />
            <circle cx="250" cy="250" r="150" fill="#60a5fa" opacity="0.1" />
            
            {/* Person illustration */}
            <g transform="translate(150, 100)">
              {/* Head */}
              <circle cx="100" cy="80" r="40" fill="#fff" />
              
              {/* Body */}
              <rect x="70" y="120" width="60" height="80" rx="10" fill="#fff" />
              
              {/* Arms */}
              <rect x="40" y="130" width="30" height="60" rx="8" fill="#fff" />
              <rect x="130" y="130" width="30" height="60" rx="8" fill="#fff" />
              
              {/* Laptop */}
              <rect x="60" y="180" width="80" height="50" rx="4" fill="#1e3a8a" />
              <rect x="65" y="185" width="70" height="35" rx="2" fill="#60a5fa" />
              
              {/* Legs */}
              <rect x="80" y="200" width="18" height="60" rx="8" fill="#fff" />
              <rect x="102" y="200" width="18" height="60" rx="8" fill="#fff" />
            </g>
            
            {/* Briefcase icon */}
            <g transform="translate(50, 300)">
              <rect x="0" y="10" width="60" height="45" rx="5" fill="#fff" opacity="0.9" />
              <rect x="20" y="0" width="20" height="15" rx="3" fill="#fff" opacity="0.9" />
            </g>
            
            {/* Document icons */}
            <g transform="translate(350, 150)">
              <rect x="0" y="0" width="50" height="60" rx="4" fill="#fff" opacity="0.8" />
              <line x1="10" y1="15" x2="40" y2="15" stroke="#1e3a8a" strokeWidth="3" />
              <line x1="10" y1="25" x2="40" y2="25" stroke="#1e3a8a" strokeWidth="3" />
              <line x1="10" y1="35" x2="30" y2="35" stroke="#1e3a8a" strokeWidth="3" />
            </g>
            
            {/* Floating elements */}
            <circle cx="80" cy="100" r="8" fill="#fff" opacity="0.6" />
            <circle cx="420" cy="350" r="12" fill="#fff" opacity="0.5" />
            <circle cx="380" cy="80" r="6" fill="#fff" opacity="0.7" />
          </svg>
          
          {/* Text below illustration */}
          <div className="text-center mt-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Find Your Dream Job
            </h2>
            <p className="text-blue-100 text-lg">
              Connect with top employers and take the next step in your career journey.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-500 mt-2">Please sign in to continue</p>
          </div>

          <Tabs
            defaultValue="candidate"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger
                value="candidate"
                className="flex items-center gap-2 cursor-pointer"
              >
                <User className="w-4 h-4" />
                Candidate
              </TabsTrigger>
              <TabsTrigger
                value="recruiter"
                className="flex items-center gap-2 cursor-pointer"
              >
                <Briefcase className="w-4 h-4" />
                Recruiter
              </TabsTrigger>
            </TabsList>

            {/* Candidate Login Form */}
            <TabsContent value="candidate">
            
              <form onSubmit={handleSubmit(handleCandidateLogin)}>
                <Card>
                  <CardHeader>
                    <CardTitle>Candidate Login</CardTitle>
                    <CardDescription>
                      Access your profile and track your job applications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="candidate-email">Email</Label>
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
                    <div className="space-y-2">
                      <Label htmlFor="candidate-password">Password</Label>
                      <Input
                        {...register("password")}
                        type="password"
                        placeholder="password"
                        className="mt-2"
                        disabled={isSubmitting}
                      />
                      {errors.password && (
                        <p className="text-sm font-medium text-red-500 mt-1">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-blue-700 hover:bg-blue-800 cursor-pointer"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing In...
                        </>
                      ) : (
                        "Sign In as Candidate"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </form>
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-md text-sm border border-slate-200 dark:border-slate-700">
            <p className="font-semibold mb-1 text-slate-700 dark:text-slate-200">Demo Credentials:</p>
            <div className="flex flex-col space-y-1 text-slate-600 dark:text-slate-400">
                <p><span className="font-medium">Email:</span> bikash54@yopmail.com</p>
                <p><span className="font-medium">Password:</span> bikash@123</p>
            </div>
        </div>
            </TabsContent>

            {/* Recruiter Login Form */}
            <TabsContent value="recruiter">
              <form onSubmit={handleSubmit(handleRecruiterLogin)}>
                <Card>
                  <CardHeader>
                    <CardTitle>Recruiter Login</CardTitle>
                    <CardDescription>
                      Manage job postings and view candidate applications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="recruiter-email">Work Email</Label>
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
                    <div className="space-y-2">
                      <Label htmlFor="recruiter-password">Password</Label>
                      <Input
                        {...register("password")}
                        type="password"
                        placeholder="password"
                        className="mt-2"
                        disabled={isSubmitting}
                      />
                      {errors.password && (
                        <p className="text-sm font-medium text-red-500 mt-1">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-blue-700 hover:bg-blue-800 cursor-pointer"
                      variant="default"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing In...
                        </>
                      ) : (
                        "Sign In as Recruiter"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </form>
                 <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-md text-sm border border-slate-200 dark:border-slate-700">
            <p className="font-semibold mb-1 text-slate-700 dark:text-slate-200">Demo Credentials:</p>
            <div className="flex flex-col space-y-1 text-slate-600 dark:text-slate-400">
                <p><span className="font-medium">Email:</span> jatin56@yopmail.com</p>
                <p><span className="font-medium">Password:</span> jatin@123</p>
            </div>
        </div>
            </TabsContent>
          </Tabs>

        </div>
      </div>
    </div>
  );
}
