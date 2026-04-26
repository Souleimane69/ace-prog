import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Expertise from "@/components/sections/Expertise";
import Benefits from "@/components/sections/Benefits";
import Actualites from "@/components/sections/Actualites";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import { getPosts } from "@/lib/posts";

export default function Home() {
  const posts = getPosts();
  const featuredPost = posts.find((p) => p.featured) ?? null;
  return (
    <>
      <Navbar />
      <main>
        <Hero featuredPost={featuredPost} />
        <About />
        <Services />
        <Expertise />
        <Benefits />
        <Actualites posts={posts} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
