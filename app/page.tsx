import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Expertise from "@/components/sections/Expertise";
import Benefits from "@/components/sections/Benefits";
import NLink from "@/components/sections/NLink";
import Actualites from "@/components/sections/Actualites";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import { getPosts } from "@/lib/posts";

export default function Home() {
  const posts = getPosts();
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Expertise />
        <Benefits />
        <NLink />
        <Actualites posts={posts} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
