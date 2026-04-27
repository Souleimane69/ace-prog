import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Ticker from "@/components/Ticker";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
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
        <Ticker />
        <About />
        <Services />
        <Actualites posts={posts} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
