import React from "react";
import TournamentWinnerCardSlider from "../TournamentWinnerCardSlider";

const TournamentWinner = () => {
  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="container max-w-[1920px] mx-auto">
        <TournamentWinnerCardSlider />
      </div>
    </section>
  );
};

export default TournamentWinner;
