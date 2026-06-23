import SmoothScroll from "@/components/SmoothScroll";
import StructuredData from "@/components/StructuredData";
import Preloader from "@/components/Preloader";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Marquee from "@/components/sections/Marquee";
import Services from "@/components/sections/Services";
import Packages from "@/components/sections/Packages";
import Process from "@/components/sections/Process";
import WhyUs from "@/components/sections/WhyUs";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <SmoothScroll>
      <StructuredData />
      <Preloader />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Marquee />
        <Services />
        <Packages />
        <Process />
        <WhyUs />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
