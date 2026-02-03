
import CallToAction from "@/pageCom/callToAction/callToAction";
import FeaturedJobs from "@/pageCom/featureJob/featureJob";
import Footer from "@/pageCom/footer/footer";
import Hero from "@/pageCom/hero/hero";
import Testimonials from "@/pageCom/testimonials/testimonials";
import Image from "next/image";

export default function Home() {
  return (
   <>
  <main className="min-h-screen bg-white">
    {/* <Header/> */}
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
