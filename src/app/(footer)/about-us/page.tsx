import ClientLayout from "@/components/landing-page/ClientLayout";
import { Separator } from "@/components/ui/separator";
import { BubblesIcon, BubblesIcon1 } from "@/components/icons/icon";

const AboutUs = () => {
  return (
    <ClientLayout>
      <div className="container max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 pt-28 pb-32 mb-10">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <BubblesIcon className="absolute top-[10%] left-[5%] animate-bubble-1" />
          <BubblesIcon1 className="absolute top-[15%] right-[15%] animate-bubble-2" />
          <BubblesIcon1 className="absolute top-[35%] right-[5%] animate-bubble-4" />
          <BubblesIcon className="absolute top-[65%] left-[12%] animate-bubble-3" />
          <BubblesIcon className="absolute top-[85%] left-[80%] animate-bubble-1" />
          <BubblesIcon1 className="absolute bottom-[5%] right-[95%] animate-bubble-2" />
          <BubblesIcon className="absolute bottom-[25%] left-[85%] animate-bubble-3" />
          <BubblesIcon1 className="absolute top-[40%] right-[85%] animate-bubble-4" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 mt-12">
          About Us
        </h1>
        <Separator className="mb-5" />

        <div className="max-w-5xl font-medium mx-auto space-y-8 text-card-foreground">
          <p className="text-lg">
            We warmly welcome you to Snatch Day, an exciting new start-up
            company. Snatch Day was founded in Berlin in August 2017 with the
            aim of offering you a unique shopping experience.
          </p>

          <p className="text-lg">
            Our vision for Snatch Day had been maturing in our minds for a long
            time because we are not an ordinary online shop.
          </p>

          <div className="space-y-6">
            <p className="text-lg">
              At Snatch Day you have the opportunity to purchase products at
              normal market prices. But in comparison to conventional online
              shops, with us you can take part in daily tournaments and compete
              against other players. You top up credit that you can also use in
              the online shop. In paid tournaments you play thinking and logic
              games in which your skill, your ability to think and your
              experience decide the outcome of the game.
            </p>

            <p className="text-lg">
              The advertised product can be purchased. With each additional
              participant, the purchase price drops until it finally reaches €1.
              Depending on the number of participants who complete the game or
              puzzle the fastest or most successfully, you have the opportunity
              to purchase the product at the corresponding price. However, there
              is no obligation to purchase.
            </p>

            <p className="text-lg">
              Participants who were unable to win a tournament can still redeem
              their credit in the online shop at regular prices. The credit
              remains, but cannot be paid out and must be used in the online
              shop. In return, you have the chance to purchase a product at a
              significantly lower price without losing anything if you are
              unsuccessful.
            </p>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default AboutUs;
