import Hero from "./components/Hero/Hero";
import { profile } from "./data";
import PageTransition from "./motion/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <main id="main" className="wrap">
        <Hero profile={profile} />
      </main>
    </PageTransition>
  );
}
