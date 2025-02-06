import BestOffers from "@/components/landing-page/BestOffers";
import ClientLayout from "@/components/landing-page/ClientLayout";
import DuelArena from "@/components/landing-page/DuelArena";
import FeaturedProducts from "@/components/landing-page/FeaturedProducts";
import HeroSection from "@/components/landing-page/HeroSection";
import PermotionalSection from "@/components/landing-page/PermotionalSection";
import ProductSection from "@/components/landing-page/ProductSection";
import RatingsSection from "@/components/landing-page/RatingsSection";
import RegisterSection from "@/components/landing-page/RegisterSection";
import Testimonials from "@/components/landing-page/Testimonials";
import TournamentWinner from "@/components/landing-page/TournamentWinner";

export default function Home() {
  return (
    <ClientLayout>
      <main>
        <HeroSection />
        <PermotionalSection />
        <RegisterSection />
        <ProductSection />
        <BestOffers />
        <FeaturedProducts />
        <TournamentWinner />
        <DuelArena />
        <Testimonials />
        <RatingsSection />
      </main>
    </ClientLayout>
  );
}
