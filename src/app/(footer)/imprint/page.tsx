import ClientLayout from "@/components/landing-page/ClientLayout";
import React from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { BubblesIcon, BubblesIcon1 } from "@/components/icons/icon";

const ImprintPage = () => {
  return (
    <ClientLayout>
      <div className="container max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 pt-28 pb-32">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 mt-12">
          Imprint
        </h1>
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <BubblesIcon className="absolute top-[10%] left-[5%] animate-bubble-1" />
          <BubblesIcon1 className="absolute top-[15%] right-[15%] animate-bubble-5" />
          <BubblesIcon1 className="absolute top-[35%] right-[40%] animate-bubble-4" />
          <BubblesIcon className="absolute top-[65%] left-[12%] animate-bubble-3" />
          <BubblesIcon className="absolute top-[75%] left-[65%] animate-bubble-5" />
          <BubblesIcon1 className="absolute -bottom-[5%] right-[95%] animate-bubble-2" />
          <BubblesIcon className="absolute bottom-[40%] left-[85%] animate-bubble-3" />
          <BubblesIcon1 className="absolute top-[40%] right-[90%] animate-bubble-4" />
        </div>
        <Separator />
        <div className="max-w-4xl mx-auto space-y-12 text-card-foreground">
          {/* Company Details */}
          <section className="space-y-4">
            <p className="text-lg font-semibold">Snatch Day GmbH</p>
            <p className="text-lg">Tetramundweg 6</p>
            <p className="text-lg">D-12167 Berlin</p>

            <div className="pt-4">
              <p className="text-lg">Managing Director: Sven Hofrichter</p>
              <p className="text-lg">
                Business owners: Sven Hofrichter, Marco Lorenz
              </p>
            </div>

            <div className="pt-4">
              <p className="text-lg">
                District Court: Berlin Charlottenburg HRB 188665
              </p>
              <p className="text-lg">Tax number: 29/536/30828</p>
              <p className="text-lg">VAT ID number: DE313211165</p>
              <p className="text-lg">
                Email:{" "}
                <Link
                  href="mailto:info@snatchday.de"
                  className="text-primary hover:underline"
                >
                  info@snatchday.de
                </Link>
              </p>
            </div>
          </section>

          {/* Bank Details */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold uppercase">Bank Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-lg">Bank: Deutsche Bank</p>
                <p className="text-lg">IBAN: DE14 1007 0124 0128 1054 00</p>
                <p className="text-lg">BIC/SWIFT: DEUTDEB101</p>
              </div>
              <div>
                <p className="text-lg">Account: 128 1054 00</p>
                <p className="text-lg">Bank code: 100 701 24</p>
              </div>
            </div>
          </section>

          {/* Important Note */}
          <section className="bg-gray-50 p-6 rounded-lg">
            <p className="text-lg">
              Please note that Snatch Day operates an online shop and does not
              have a brick-and-mortar store at the specified location. It is
              therefore not possible to collect or return goods on site.
              However, you can simply contact us at info@snatchday.de or by
              phone. We will be happy to help you.
            </p>
          </section>

          {/* Dispute Resolution */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold uppercase">
              Information on Online Dispute Resolution:
            </h2>
            <p className="text-lg">
              The EU Commission provides a platform for online dispute
              resolution on the Internet at the following link:{" "}
              <Link
                href="http://ec.europa.eu/consumers/odr"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                http://ec.europa.eu/consumers/odr
              </Link>
            </p>
            <p className="text-lg">
              This platform serves as a contact point for the out-of-court
              settlement of disputes arising from online sales or service
              contracts involving a consumer.
            </p>
            <p className="text-lg">
              Of course, you can also contact us directly:{" "}
              <Link
                href="mailto:beschwerde@snatchday.de"
                className="text-primary hover:underline"
              >
                beschwerde@snatchday.de
              </Link>
            </p>
          </section>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ImprintPage;
