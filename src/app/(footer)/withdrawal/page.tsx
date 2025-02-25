"use client";

import ClientLayout from "@/components/landing-page/ClientLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Page = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <ClientLayout>
      <div className="container max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 pt-28 pb-32">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 mt-12">
          Right of Withdrawal
        </h1>

        <div className="max-w-[1440px] mx-auto">
          {/* Address Information */}
          <div className="text-lg mb-8">
            <p className="mb-4">
              You can cancel the contract by completing the online form or
              downloading it and sending us the completed cancellation form to
              the following address:
            </p>
            <div className="font-medium">
              <p>Snatch Day GmbH</p>
              <p>Tetramundweg 6</p>
              <p>12167 Berlin</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              variant="default"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-lg text-lg"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Hide Form" : "Fill Out Online"}
            </Button>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 px-8 py-6 rounded-lg text-lg"
            >
              Download Form
            </Button>
          </div>

          {/* Withdrawal Form */}
          {showForm && (
            <form className="space-y-6 mb-12">
              <div className="space-y-4">
                <label className="block text-gray-600">
                  I/we hereby revoke the contract concluded by me/us for the
                  purchase of the following goods/the provision of the following
                  service:
                </label>
                <Input className="w-full h-32 rounded-lg bg-gray-50" />
                <p className="text-sm text-gray-500">
                  (Name of the product, if applicable order number and price)
                </p>
              </div>

              <div className="space-y-4">
                <label className="block text-gray-600">Goods ordered on:</label>
                <Input className="w-full rounded-lg bg-gray-50" />
              </div>

              <div className="space-y-4">
                <label className="block text-gray-600">
                  Date of goods received on:
                </label>
                <Input className="w-full rounded-lg bg-gray-50" />
              </div>

              <div className="space-y-4">
                <label className="block text-gray-600">
                  Date Name and address of the consumer:
                </label>
                <Input className="w-full h-32 rounded-lg bg-gray-50" />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-lg text-lg"
              >
                SUBMIT
              </Button>
            </form>
          )}

          {/* Policy Information */}
          <div className="space-y-6 text-card-foreground">
            <h2 className="text-2xl font-bold mb-4">
              When does which cancellation policy apply?
            </h2>

            <p>
              If you are ordering as a consumer and your order involves the
              delivery of goods, the following &quot;Cancellation policy for the
              delivery of goods&quot; applies to you.
            </p>

            <p>
              If you are ordering as a consumer and your order involves the
              purchase of digital content that is not delivered on a physical
              data carrier (e.g. downloading software), the following
              &quot;Cancellation policy for the purchase of digital content that is
              not delivered on a physical data carrier&quot; applies to you. If you
              are ordering as a consumer and your order involves a service (e.g.
              arranging a mobile phone contract), the following &quot;Cancellation
              policy for services&quot; applies to you.
            </p>

            <p>
              If you, as a consumer, order a package of services and goods in
              which both services are economically linked in such a way that one
              component cannot be ordered without the other part or can only be
              ordered under different conditions (e.g. purchase of a mobile
              phone with a mobile phone tariff), the cancellation of one part
              always extends to the entire package.
            </p>

            <div className="space-y-4 mt-8">
              <h3 className="text-2xl font-bold">
                Cancellation policy for the delivery of goods
              </h3>
            </div>

            <div className="space-y-4 mt-8">
              <h3 className="text-xl font-bold">Right of withdrawal</h3>
              <p>
                You have the right to withdraw from this contract within
                fourteen days without giving any reason.
              </p>
              <p>
                The cancellation period is fourteen days from the day of the
                conclusion of the contract. To exercise your right of
                cancellation, you must inform us (Snatch Day GmbH, Telramundweg
                6, 12167 Berlin, email: widerruf@snatchday.de) of your decision
                to cancel this contract by means of an unambiguous declaration
                (e.g. a letter sent by post, fax or email). You can use the
                attached model cancellation form for this purpose, but this is
                not mandatory. You can also electronically fill out and submit
                the model cancellation form or another clear declaration on our
                website. If you make use of this option, we will immediately
                send you a confirmation of receipt of such a cancellation (e.g.
                by email).
              </p>
              <p>
                To meet the cancellation deadline, it is sufficient for you to
                send your communication concerning your exercise of the right of
                cancellation before the cancellation period has expired.
              </p>
            </div>

            <div className="space-y-4 mt-8">
              <h3 className="text-xl font-bold">Consequences of revocation</h3>
              <p>
                If you cancel this contract, we will refund all payments that we
                have received from you, including delivery costs (with the
                exception of additional costs resulting from your choice of a
                type of delivery other than the cheapest standard delivery
                offered by us), promptly and at the latest within fourteen days
                from the day on which we received notification of your
                cancellation of this contract. For this refund, we will use the
                same means of payment that you used for the original
                transaction, unless something else was expressly agreed with
                you; under no circumstances will you be charged any fees for
                this refund.
              </p>
            </div>

            <div className="space-y-4 mt-8">
              <h3 className="text-xl font-bold">Special Notes</h3>
              <p>
                Your right of withdrawal expires prematurely if we have begun to
                execute the contract after you have expressly agreed that we may
                begin to execute the contract before the expiry of the
                withdrawal period and you have confirmed your knowledge that by
                giving your consent you will lose your right of withdrawal when
                the contract begins to be executed.
              </p>
              <p>
                If you finance this contract with a loan and later revoke it,
                you are no longer bound to the loan agreement, provided that
                both contracts form an economic unit. This is particularly the
                case if we are also your lender or if your lender uses our
                cooperation to finance it. If the loan has already been paid to
                us when the revocation takes effect, your lender will assume our
                rights and obligations from the financed contract in relation to
                you with regard to the legal consequences of the revocation.
              </p>
            </div>

            <div className="space-y-4 mt-8">
              <h3 className="text-xl font-bold">
                Cancellation policy for contracts for services
              </h3>
              <h4 className="text-lg font-bold">Right of cancellation</h4>
              <p>
                You have the right to withdraw from this contract within
                fourteen days without giving any reason.
              </p>
              <p>
                The cancellation period is fourteen days from the day the
                contract is concluded. To exercise your right of cancellation,
                you must notify (Snatch Day GmbH, Telramundweg 6, 12167 Berlin,
                email: widerruf@snatchday.de) of your decision to cancel this
                contract by means of an unambiguous declaration (e.g. a letter
                sent by post, fax or email). You can use the attached model
                cancellation form for this purpose, but this is not mandatory.
                You can also electronically fill out and submit the model
                cancellation form or another unambiguous declaration on our
                website. If you make use of this option, we will immediately
                send you (e.g. by email) a confirmation of receipt of such a
                cancellation. To meet the cancellation period, it is sufficient
                that you send the notification of the exercise of the right of
                cancellation before the cancellation period has expired.
              </p>
            </div>

            <div className="space-y-4 mt-8">
              <h3 className="text-xl font-bold">Consequences of revocation</h3>
              <p>
                If you cancel this contract, we will refund all payments that we
                have received from you, including delivery costs (with the
                exception of additional costs resulting from your choice of a
                type of delivery other than the cheapest standard delivery
                offered by us), promptly and at the latest within fourteen days
                from the day on which we received notification of your
                cancellation of this contract. For this refund, we will use the
                same means of payment that you used for the original
                transaction, unless something else was expressly agreed with
                you; under no circumstances will you be charged any fees for
                this refund.
              </p>
              <p>
                If you have requested that the services begin during the
                cancellation period, you must pay us an appropriate amount
                corresponding to the proportion of the services already provided
                up to the point at which you notify us of the exercise of the
                right of cancellation with regard to this contract compared to
                the total scope of the services provided for in the contract.
              </p>
            </div>

            <div className="space-y-4 mt-8">
              <h3 className="text-xl font-bold">Special Notes</h3>
              <p>
                Your right of withdrawal expires prematurely if we have fully
                provided the service owed and have only started to perform the
                service after you have given your express consent and at the
                same time confirmed your knowledge that you will lose your right
                of withdrawal if we fully fulfill the contract.
              </p>
              <p>
                If you finance this contract with a loan and later revoke it,
                you are no longer bound to the loan agreement, provided that
                both contracts form an economic unit. This is particularly the
                case if we are also your lender or if your lender uses our
                cooperation to finance it. If the loan has already been paid to
                us when the revocation takes effect, your lender will assume our
                rights and obligations from the financed contract in relation to
                you with regard to the legal consequences of the revocation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default Page;
