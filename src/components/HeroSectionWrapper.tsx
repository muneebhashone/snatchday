// app/components/HeroSectionWrapper.tsx

import { useUpComingTournament } from "@/hooks/api";
import HeroSection from "./landing-page/HeroSection";

export default async function HeroSectionWrapper() {
  const upcomingTournament = await useUpComingTournament()// server-side logic (can be OpenAI call)

  return <HeroSection upComingTournament={upcomingTournament} />;
}
