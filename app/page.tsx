import CallToAction from "@/pages/callToAction/callToAction";
import FeaturedJobs from "@/pages/featureJob/featureJob";
import Footer from "@/pages/footer/footer";
import Hero from "@/pages/hero/hero";
import Testimonials from "@/pages/testimonials/testimonials";
import Image from "next/image";

export default function Home() {
  return (
   <>
  <main className="min-h-screen bg-white">
      <Hero />
      <FeaturedJobs />
      {/* <HowItWorks /> */}
      <Testimonials />
      <CallToAction />
      <Footer />
    </main>
   </>
  );
}
