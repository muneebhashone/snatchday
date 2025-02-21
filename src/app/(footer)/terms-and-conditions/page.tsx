import ClientLayout from "@/components/landing-page/ClientLayout";
import React from "react";
import Link from "next/link";

const TermsAndConditions = () => {
  return (
    <ClientLayout>
      <div className="container max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 pt-28 pb-32">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 mt-12">
          General Terms and Conditions of Business
        </h1>

        <div className="max-w-[1440px] mx-auto space-y-8 text-card-foreground">
          {/* Preamble */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Preamble</h2>
            <p className="text-lg">
              The company Snatch Day GmbH operates an online shop at
              http://www.snatchday.de with a platform for skill games with the
              possibility of winning. Players can win access to discounted
              products by participating in tournaments. If the player does not
              take advantage of an offer they have won, it expires after 24
              hours. Participants who were unable to win a tournament can still
              redeem their credit in the online shop at the respective purchase
              prices. The credit is therefore retained, but can no longer be
              paid out; it can be used in the online shop instead.
            </p>
            <p className="text-lg">
              All games at Snatch Day are games of skill, meaning that the skill
              of the individual players alone determines victory or defeat.
              These games are not subject to the gambling law, which requires a
              license.
            </p>
          </section>

          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§ 1 Scope, Contract Language</h2>
            <div className="space-y-2">
              <p className="text-lg">
                1.1 These terms and conditions (GTC) apply to the contracts
                concluded between you and us, Snatch Day GmbH (Telramundweg 6,
                12167 Berlin, AG Charlottenburg HRB 188665, VAT ID DE313211165)
                represented by Sven Hofrichter (link: Legal notice) via this
                online shop and the skill games offered.
              </p>
              <p className="text-lg">
                1.2 The language available for concluding the contract is
                exclusively German. Translations of these terms and conditions
                into other languages are for your information only. In the event
                of any differences between the language versions, the German
                text takes precedence.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">
              § 2 Applicable law, mandatory consumer protection provisions
            </h2>
            <div className="space-y-2">
              <p className="text-lg">
                2.1 The law of the Federal Republic of Germany applies,
                excluding the UN Convention on Contracts for the International
                Sale of Goods, if
              </p>
              <p className="text-lg pl-6">
                (a) you have your habitual residence in Germany, or
                <br />
                (b) your habitual residence is in a State which is not a member
                of the European Union.
              </p>
              <p className="text-lg">
                2.2 In the event that you have your habitual residence in a
                member state of the European Union, German law shall also apply,
                without affecting any mandatory provisions of the state in which
                you have your habitual residence.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§ 3 Conclusion of Contract</h2>
            <div className="space-y-2">
              <p className="text-lg">
                3.1 The presentation of goods and services in our online shop
                does not constitute a legally binding offer, but rather an
                invitation to order (invitatio ad offerendum).
              </p>
              <p className="text-lg">
                3.2 By clicking the "Order with payment" button in the last step
                of the ordering process, you make a binding offer to purchase or
                book the goods and/or services displayed in the order overview.
                Immediately after submitting the order, you will receive an
                order confirmation, which does not, however, constitute
                acceptance of your contract offer. A contract between you and us
                is concluded as soon as we accept your order and/or booking by
                separate email or dispatch the goods. Please check the SPAM
                folder in your email inbox regularly.
              </p>
              <p className="text-lg">
                3.3 You can select goods for purchase in our online shop by
                placing them in a shopping cart by clicking on the corresponding
                button. If you want to complete the order, go to the shopping
                cart, where you will be guided through the rest of the ordering
                process. After selecting the item in the shopping cart and
                entering all the required order and address details in the next
                step, clicking on the "Continue" button opens a page in which
                the essential item details, including any costs incurred, are
                summarized again. Up to this point, you can correct your entries
                or withdraw from the contract declaration. Only when you then
                click on the "order with payment" button is a binding offer made
                within the meaning of paragraph 2.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§ 4 Correction notice</h2>
            <p className="text-lg">
              As part of the ordering process, you first place the desired goods
              or services in the shopping cart. There you can change the desired
              quantity at any time or remove selected goods or services
              entirely. If you have stored goods or services there, clicking on
              the "Continue" button will take you to a page where you can enter
              your data and then select the shipping and payment method.
              Finally, an overview page will open where you can check your
              details. You can correct any input errors (e.g. regarding payment
              method, data or the desired quantity) by clicking on "Edit" in the
              relevant field. If you want to cancel the ordering process
              completely, you can simply close your browser window. Otherwise,
              after clicking the confirmation button "Order with payment" your
              declaration becomes binding within the meaning of Section 3
              Paragraph 2 of these General Terms and Conditions.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">
              § 5 Storage of the contract text
            </h2>
            <p className="text-lg">
              The contractual provisions with information on the goods ordered
              and/or services booked, including these General Terms and
              Conditions and the cancellation policy, will be sent to you by
              email upon acceptance of the contract offer or upon notification
              of this. We do not store the contractual provisions.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">
              § 6 Registration, collection, storage and processing of your
              personal data, blocking
            </h2>
            <div className="space-y-2">
              <p className="text-lg">
                6.1 You can participate in skill games and order goods on our
                online platform as a registered user. As a registered user, you
                do not have to provide your personal data every time, but you
                can simply log into your customer account using your email
                address and the password you freely chose when registering.
              </p>
              <p className="text-lg">
                6.2 In order to participate in a game of skill and to carry out
                and process an order, we require the following data from you,
                which must be complete and correct:
                <br />
                First and last name – email address
                <br />
                postal address
                <br />
                birth date
                <br />a password of your choice – specification of a means of
                payment
              </p>
              <p className="text-lg">
                6.3 Only persons who have already reached the age of 18 are
                permitted to register.
              </p>
              <p className="text-lg">
                6.4 The player name may not consist of an email or internet
                address, may not infringe the rights of third parties and may
                not violate common decency.
              </p>
              <p className="text-lg">
                6.5 We use the data you provide without your separate consent to
                fulfil and process your order(s), for example to deliver goods
                to the address you have provided, and to process games in which
                you participate (tournaments, duels). When paying by bank
                transfer or instant transfer, we also use your bank details to
                process the payment. When paying by credit card, we also use
                your credit card details to process the payment. When paying by
                PayPal, we also use your PayPal account to process the payment.
                Any further use of your personal data for the purposes of
                advertising, market research or to tailor our offers to your
                needs requires your express consent. You have the option of
                giving this consent before placing your order. This declaration
                of consent is entirely voluntary and can be accessed on our
                website and revoked by you at any time.
              </p>
              <p className="text-lg">
                6.6 The data you provide will remain stored in your customer
                account until you delete it yourself. Beyond that, we only store
                your data within the scope of our tax and commercial law
                obligations.
              </p>
              <p className="text-lg">
                6.7 If your personal details change, you are responsible for
                updating them. All changes can be made online after logging in
                under "My Account".
              </p>
              <p className="text-lg">
                6.8 We are entitled to block your user account for good cause.
                Good cause exists in particular if:
                <br />
                1. You have culpably violated these Terms and Conditions,
                <br />
                2. you are under 18 years of age,
                <br />
                3. You have specified a payment method that is not covered or
                functional,
                <br />
                4. You have registered multiple times or with data that cannot
                be proven to be correct,
                <br />
                5. You have demonstrably attempted to manipulate the outcome of
                a game,
              </p>
              <p className="text-lg">
                6.9 If a user account is blocked, stakes will be refunded.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">
              § 7 Conducting tournaments, duels & games of skill and logic
            </h2>
            <div className="space-y-2">
              <p className="text-lg">
                7.1 Our platform gives you the opportunity to play skill and
                logic games against other players in the form of tournaments or
                duels. The number of possible players is limited in each
                tournament. Separate game rules apply for each game in addition
                to these Terms and Conditions.
              </p>
              <p className="text-lg">
                7.2 The tournaments begin at a predetermined time. At a given
                time, a countdown follows after which the skill and logic game
                starts, which must be successfully solved in order to unlock the
                purchase button or "Add to cart" button. A maximum of the number
                of players specified in the tournament announcement can take
                part at the same time. Up until the specified check-out time of
                a tournament, the player can withdraw his participation in the
                tournament at any time and withdraw free of charge. In this
                case, the respective sales price of the product increases
                accordingly and the participation fee is refunded to the stake
                account. The winner of the tournament is the participant who has
                won the game according to the given rules. The winner is
                notified of the outcome of the game and any possible winnings
                immediately after the game ends. The results and placements of
                all participants are displayed immediately after the end of a
                tournament. To ensure fairness, users can win a maximum of 3
                tournaments per month, so there is equal opportunity.
              </p>
              <p className="text-lg">
                7.3 Users have the opportunity to duel against other players. In
                duels, you can choose to play for discount or snap points, the
                latter requires a real money stake. The account must have the
                appropriate balance in advance, which can be topped up using
                various payment methods. The player who starts the duel sets the
                stake for the snap or discount points and immediately starts his
                personal game. The possible winnings are automatically
                determined from the amount of points staked. The winner receives
                all of the points from the opposing player and thus doubles his
                points. Each player is only allowed to take part in one game.
                The duel lasts until both participants have achieved a result,
                with a validity window of max. 1 day defined. As soon as a
                player accepts a duel, he or she must complete the game within
                24 hours, otherwise the game is considered lost.
              </p>
              <p className="text-lg">
                7.4 By participating in a duel, the player irrevocably confirms
                that he will debit the amount specified at the start of the duel
                ("snap or discount points") from the stake account and that he
                will pay or accept the game winnings ("snap or discount points")
                to the winner of the respective duel and credit them to the
                player account.
              </p>
              <p className="text-lg">
                7.5 The winner of a game is the player who has achieved the best
                result according to the given game rules. In the event of a tie,
                the winner is the player who achieved the same result faster or
                was better in other verifiable game content. Snatch Day reserves
                the right to determine the winner as referee in cases of doubt.
              </p>
              <p className="text-lg">
                7.6 If a game cannot be played due to a technical fault or if
                the game is interrupted, the game is deemed not to have been
                played. We reserve the right not to play, to cancel or to
                postpone games in the event of technical faults.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">
              § 8 Conditions of Participation
            </h2>
            <div className="space-y-2">
              <p className="text-lg">
                8.1 In order to participate in skill and/or logic games,
                registration on our website is required. Each user can only
                register once. Details of the registration process can be found
                in Section 6.
              </p>
              <p className="text-lg">
                8.2 If the player wishes to participate in paid games, a valid
                means of payment must be deposited. The deposit is free of
                charge.
              </p>
              <p className="text-lg">
                8.3 There is no right to conclude a user agreement with us. We
                may reject a registration request without giving reasons, and
                the user's data will be deleted immediately.
              </p>
              <p className="text-lg">
                8.4 Persons who are under 18 years of age or who otherwise have
                limited legal capacity will not be permitted to register on our
                website.
              </p>
              <p className="text-lg">
                8.5 Employees and staff of Snatch Day and their families are not
                entitled to participate in tournaments and duels and cannot win
                prizes for themselves or third parties.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§ 9 Prohibition of Abuse</h2>
            <div className="space-y-2">
              <p className="text-lg">
                9.1 The misuse of our website is prohibited. This includes in
                particular:
              </p>
              <p className="text-lg pl-6">
                (a) Agreements on the course of a game that disadvantage other
                players
                <br />
                (b) deception or other attempts to obtain an unlawful advantage
                <br />
                (c) Use of multiple user accounts
                <br />
                (d) Use, distribution or provision of software or other
                technical devices that impair the course of the game in an
                illegal manner
                <br />
                (e) Registration with false or not verifiably correct data
              </p>
              <p className="text-lg">
                9.2 In the event of a breach of paragraph 1, we may, at our own
                discretion, exclude users from individual games, completely
                block individual user accounts, stop crediting winnings and
                completely block payment transactions. If multiple user accounts
                are used, we may combine these. In the event of proven misuse,
                the game participant is liable to Snatch Day for the lost
                participation fees and the costs incurred in checking. Other
                claims, in particular claims for damages, remain unaffected.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§ 10 Prohibited Content</h2>
            <div className="space-y-2">
              <p className="text-lg">
                10.1 The following content is prohibited when communicating via
                our platform:
              </p>
              <p className="text-lg pl-6">
                (a) Sending of advertising
                <br />
                (b) Infringement of copyright and trademark rights
                <br />
                (c) Violation of personal rights
                <br />
                (d) Criminal content (e.g. child pornography or unconstitutional
                symbols)
                <br />
                (e) Surveys or data collection on user behavior
                <br />
                (f) Sending chain letters
              </p>
              <p className="text-lg">
                10.2 Section 9 paragraph 2 and Section 6 paragraph 7 apply
                accordingly. Content according to paragraph 1 may be deleted by
                us without prior notice.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">
              § 11 Payment transactions, withdrawal from the stake account
            </h2>
            <div className="space-y-2">
              <p className="text-lg">
                11.1 Each user receives a virtual betting account, which must be
                topped up with the corresponding participation fee before
                participating in a paid game. The minimum amount for a top-up is
                €5, regardless of the payment method.
              </p>
              <p className="text-lg">
                11.2 Products from our online shop can be purchased either with
                credit from the virtual account (taking into account the
                existing discount points) or with a specified means of payment.
              </p>
              <p className="text-lg">
                11.3 You can deposit funds into the virtual stake account by
                bank transfer, credit card, PayPal and Sofortüberweisung.
              </p>
              <p className="text-lg pl-6">
                (a) For payments by bank transfer, the amounts are immediately
                credited to the virtual stake account. In the event of a
                chargeback, this payment method will be blocked and you will
                have to reimburse us for any costs incurred.
                <br />
                (b) When paying by credit card or PayPal, the amounts are
                credited to the virtual stake account immediately. Deposits to
                the virtual stake account by credit card may not be transferred
                to another account. When depositing by PayPal, the user
                authorizes us to collect the corresponding amount from his
                PayPal account. In the event of a chargeback, this payment
                method will be blocked and you will have to reimburse us for any
                costs incurred.
                <br />
                (c) For payments made by direct bank transfer, the amounts are
                released for collection by direct debit and immediately credited
                to the virtual account. In the event of a direct debit return,
                this payment method will be blocked and you will have to
                reimburse us for any costs incurred.
              </p>
              <p className="text-lg">
                11.4 Users are entitled to have their credit or parts of this
                credit paid out at any time. After determining the game results,
                we transfer the winnings in the form of snap or discount points
                to the virtual stake account. You can use this credit for future
                stakes or to pay in our online shop. Deposited credit and snap
                points won can be debited to a domestic bank account or PayPal
                account at any time with debt-discharging effect for us. A fee
                of EUR 1.00 is due per withdrawal request. Deposited credit can
                only be debited to the originally used payment method. Granted
                bonuses (e.g. deposit bonuses) and promotions, raffles, bonus
                systems cannot be paid out.
              </p>
              <p className="text-lg">
                11.5 Snatch Day is not obliged to verify the eligibility of the
                account holder.
              </p>
              <p className="text-lg">
                11.6 When ordering from our online shop, the purchase price is
                due immediately upon ordering. Payment for the goods is made by
                bank transfer, credit card, PayPal or instant transfer. Our bank
                details are:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-2">
                <p className="text-lg">
                  Bank: Deutsche Bank
                  <br />
                  IBAN: DE 14 1007 0124 0128 1054 00
                  <br />
                  BIC/SWIFT: DEUTDEDB101
                </p>
              </div>
            </div>
          </section>

          {/* Section 12 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">
              § 12 Participation fees for skill and logic games
            </h2>
            <div className="space-y-2">
              <p className="text-lg">
                12.1 To participate in a tournament, the game fee specified in
                the announcement of the game must be paid in the form of an
                entry fee. This entry fee will be debited from the player's
                virtual stake account after registration, which must have funds
                in the amount of the participation fee.
              </p>
              <p className="text-lg">
                12.2 The participation fee entitles the players to take part
                without being linked to the chance of winning (chance of
                purchasing the product). With each additional participant, the
                price of the respective product drops until the final price is
                €1. The number of participants is limited in each tournament, so
                that there is a higher chance of success.
              </p>
              <p className="text-lg">
                12.3 With an immediate purchase after previous tournament
                participation, members - provided they were unable to win a
                tournament - can purchase products available in the online shop,
                taking into account the participation fees used or the discount
                points collected up to a maximum of €50 (= immediate purchase
                discount) on the respective purchase values. The exercise of the
                immediate purchase remains optional.
              </p>
            </div>
          </section>

          {/* Section 13 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§ 13 Training Center</h2>
            <p className="text-lg">
              To practice, registered users can play the individual skill and
              logic games free of charge in the training center. No credit is
              required in the virtual betting account.
            </p>
          </section>

          {/* Section 14 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§ 14 VIP Membership</h2>
            <p className="text-lg">
              We offer you the opportunity to take out a VIP membership for
              €9.99 per month. This offers you the following benefits:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-lg">
              <li>
                500 Snap Points package (worth €5) included every month (points
                expire at the end of the month)
              </li>
              <li>Accept/create unlimited duels</li>
              <li>Collect 50 discount points for tournaments you don't win</li>
              <li>Free shipping when purchasing a product in the tournament</li>
              <li>No contract term, can be canceled monthly at any time</li>
              <li>
                Free participation in the monthly competition worth 50 Schnapp
                points
              </li>
              <li>Exclusive access to the VIP Shop</li>
              <li>10% deposit bonus</li>
              <li>Exclusive tournaments</li>
            </ul>
            <p className="text-lg mt-4">
              The deposit bonus is limited to a maximum of €100 per month. As
              soon as you have wagered the full deposited amount, you can use
              the deposit bonus.
            </p>
          </section>

          {/* Section 15 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§ 15 VIP Shop</h2>
            <p className="text-lg">
              The VIP Shop offers VIP members the opportunity to purchase
              products in limited quantities at a preferential price. The shop
              opens at a previously undetermined time. VIP members are informed
              30 minutes beforehand by email or SMS.
            </p>
          </section>

          {/* Section 16 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§ 16 Points System</h2>
            <div className="space-y-2">
              <p className="text-lg">1 point equals 1 cent</p>
              <p className="text-lg">
                25 Snap Points for participating / accepting a duel
              </p>
              <p className="text-lg">
                It is possible to collect discount points through the following
                actions:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-lg">
                <li>50 points Facebook Like</li>
                <li>100 points Share page</li>
                <li>100 points refer a friend</li>
              </ul>
              <p className="text-lg">
                Deposited funds can be withdrawn at any time
              </p>
              <p className="text-lg">Discount points cannot be cashed out.</p>
            </div>
          </section>

          {/* Section 17 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">
              § 17 Buy Now/ Discount Points
            </h2>
            <div className="space-y-2">
              <p className="text-lg">
                17.1 In the online shop it is possible to purchase various
                products.
              </p>
              <p className="text-lg">
                17.2 Members who were unable to purchase a product at a
                tournament can have their points refunded in the form of a
                discount on an immediate purchase. For every €100 purchase
                value, customers can use 500 points/€5 and receive a discount.
                These are valid for 12 months. We also reserve the right to
                exclude individual products from redeeming discount points.
              </p>
              <p className="text-lg">
                17.3 A maximum of 5000 points/50€ can be used at the same time.
              </p>
              <p className="text-lg">17.4 The following grading applies:</p>
              <div className="bg-gray-50 p-4 rounded-lg mt-2 space-y-2">
                <p className="text-lg">
                  • 500 points 5 € from 99 € purchase value
                </p>
                <p className="text-lg">
                  • 1000 points 10 € from 199 € purchase value
                </p>
                <p className="text-lg">
                  • 1500 points 15 € from 299 € purchase value
                </p>
                <p className="text-lg">
                  • 2000 points 20 € from 399 € purchase value
                </p>
                <p className="text-lg">
                  • 2500 points 25 € from 499 € purchase value
                </p>
                <p className="text-lg">
                  • 3000 points 30 € from 599 € purchase value
                </p>
                <p className="text-lg">
                  • 3500 points 35 € from 699 € purchase value
                </p>
                <p className="text-lg">
                  • 4000 points 40 € from 799 € purchase value
                </p>
                <p className="text-lg">
                  • 4500 points 45 € from 899 € purchase value
                </p>
                <p className="text-lg">
                  • 5000 points 50 € from 999 € purchase value
                </p>
              </div>
            </div>
          </section>

          {/* Section 18 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§ 18 Retention of Title</h2>
            <p className="text-lg">
              The goods remain our property until full payment has been made. If
              you are more than 10 days late with payment, we have the right to
              withdraw from the contract and reclaim the goods.
            </p>
          </section>

          {/* Section 19 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§ 19 Delivery Conditions</h2>
            <p className="text-lg">
              We deliver the goods in accordance with the agreements made with
              you. Any shipping costs incurred are listed in the product
              description and are shown separately on the invoice.
            </p>
          </section>

          {/* Section 20 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§ 20 Right of Withdrawal</h2>
            <p className="text-lg">
              As a consumer, you have a right of withdrawal in accordance with
              the instructions provided in the appendix. A consumer is any
              natural person who concludes a legal transaction for purposes that
              can predominantly be attributed neither to their commercial nor to
              their independent professional activity.
            </p>
          </section>

          {/* Section 21 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">
              § 21 Warranty for purchases of goods
            </h2>
            <div className="space-y-2">
              <p className="text-lg">
                21.1 If the goods purchased and delivered in our online shop are
                defective, you are entitled, within the framework of the
                statutory provisions, to demand subsequent performance, to
                withdraw from the contract or to reduce the purchase price.
              </p>
              <p className="text-lg">
                21.2 The limitation period for warranty claims for the delivered
                goods is two years from receipt of the goods. Claims for defects
                that we have fraudulently concealed expire within the regular
                limitation period.
              </p>
              <p className="text-lg">
                21.3 You are also entitled to rights in respect of defects
                within the scope of a guarantee of quality and/or durability,
                provided that we have expressly given such a guarantee in the
                individual case with regard to the item sold.
              </p>
            </div>
          </section>

          {/* Section 22 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§ 22 Limitation of Liability</h2>
            <div className="space-y-2">
              <p className="text-lg">
                22.1 We are liable for intent and gross negligence. We are also
                liable for the negligent breach of obligations, the fulfillment
                of which enables the proper execution of the contract in the
                first place, the breach of which endangers the achievement of
                the purpose of the contract and on whose compliance you as a
                customer can regularly rely. In the latter case, however, we are
                only liable for foreseeable, contract-typical damage. We are not
                liable for the slightly negligent breach of obligations other
                than those mentioned in the preceding sentences.
              </p>
              <p className="text-lg">
                22.2 The above exclusions of liability do not apply in the event
                of injury to life, body or health. Liability under the Product
                Liability Act remains unaffected.
              </p>
              <p className="text-lg">
                22.3 Data communication via the Internet cannot be guaranteed to
                be error-free and/or available at all times given the current
                state of technology. We are therefore not liable for the
                constant and uninterrupted availability of our online trading
                system. Furthermore, we are not liable for winnings or potential
                winnings, including from a duel or tournament that ends
                prematurely. We are not responsible for third-party offers to
                which we merely provide access (e.g. via links).
              </p>
              <p className="text-lg">
                22.4 Players are responsible for ensuring that the hardware and
                software they use is up-to-date and suitable. The same applies
                to Internet access.
              </p>
              <p className="text-lg">
                22.5 We reserve the right to cancel a tournament or duel if we
                discover manipulation or if we act in accordance with § 9, even
                retrospectively. In this case, there is no entitlement to a
                prize.
              </p>
            </div>
          </section>

          {/* Section 23 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§ 23 Miscellaneous</h2>
            <div className="space-y-2">
              <p className="text-lg">
                23.1 Snatch Day assumes no liability for input, transmission
                and/or evaluation errors, as this is outside their sphere of
                influence.
              </p>
              <p className="text-lg">
                23.2 In order to comply with the requirements of child
                protection, Snatch Day reserves the right to carry out an age
                verification process. Age verification can be carried out
                automatically by means of a consistency check based on the data
                provided by the member.
              </p>
              <p className="text-lg">
                23.3 For security reasons, Snatch Day is entitled to make the
                payment of credit dependent on an identity check. In this case,
                the member is obliged to submit a copy of their identity card or
                passport together with the payment request and details of their
                bank/account details.
              </p>
              <p className="text-lg">
                23.4 Snatch Day reserves the right to check the creditworthiness
                of the member in an appropriate manner and to transmit personal
                data (name, address, date of birth, deposit amount including
                processing fees) to a credit agency, which will store this data
                and process it for the purposes of a credit check.
              </p>
            </div>
          </section>

          {/* Section 24 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">§ 24 Final Provisions</h2>
            <div className="space-y-2">
              <p className="text-lg">
                (1) The terms and conditions set out here are complete and
                final. Any changes or additions to these terms and conditions
                should be made in writing in order to avoid any confusion or
                dispute between the parties regarding the agreed contractual
                content.
              </p>
              <p className="text-lg">
                (2) If you had your place of residence or habitual abode in
                Germany at the time the contract was concluded and have either
                moved from Germany at the time we file suit or your place of
                residence or habitual abode is unknown at that time, the place
                of jurisdiction for all disputes shall be our company
                headquarters in Berlin.
              </p>
              <p className="text-lg">
                (3) We would like to point out that in addition to the ordinary
                legal process, you also have the option of an out-of-court
                settlement of disputes in accordance with Regulation (EU) No.
                524/2013. Details can be found in Regulation (EU) No. 524/2013
                and at the Internet address: http://ec.europa.eu/consumers/odr
              </p>
              <p className="text-lg">
                (4) Our email address is: info@snatchday.de. According to
                Section 36 VSBG, we would like to point out that we are not
                obliged to participate in an out-of-court dispute resolution
                procedure before a consumer arbitration board.
              </p>
              <p className="text-lg">
                (5) Should individual provisions of this contract be invalid,
                this shall not affect the remaining provisions of the contract.
              </p>
            </div>
          </section>

          {/* Attachment */}
          <section className="space-y-4 mt-16">
            <h2 className="text-3xl font-bold text-center mb-8">Attachment</h2>
            <h3 className="text-2xl font-bold mb-4">
              Consumer Information and Cancellation Policy
            </h3>
            <p className="text-lg">
              If you order goods when visiting our online shop, we would like to
              draw your attention to the following:
            </p>
            <div className="space-y-4 mt-4">
              <p className="text-lg">
                (1) The language available for concluding the contract is
                exclusively German. Translations into other languages are for
                information purposes only. In the event of any discrepancies,
                the German text shall prevail.
              </p>
              <p className="text-lg">
                (2) The essential characteristics of the goods and services we
                offer as well as the period of validity of limited offers can be
                found in the individual product descriptions on our website.
              </p>
              <p className="text-lg">
                (3) The presentation of our goods does not constitute a binding
                offer on our part. Only the order of goods by you is a binding
                offer according to § 145 BGB. If this offer is accepted, we will
                send you an order confirmation by email or dispatch the goods.
                This concludes the purchase contract between you and us.
              </p>
              <p className="text-lg">
                (4) You can identify any input errors when placing your order
                during the final confirmation before checkout and correct them
                at any time using the delete and change function before sending
                the order.
              </p>
              <p className="text-lg">
                (5) If the goods you have ordered are not available, we reserve
                the right not to provide the service, whereby we will inform you
                of this immediately before the conclusion of the contract.
              </p>
              <p className="text-lg">
                (6) The prices we quote are final prices including taxes.
                Shipping costs are shown separately for each product and in the
                order overview.
              </p>
              <p className="text-lg">
                (7) The purchase price is due immediately upon ordering. Payment
                for the goods is made by credit card (we use the "SSL" transfer
                method to encrypt your personal data), by bank transfer or via
                our payment service provider. Our bank details are:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-2">
                <p className="text-lg">
                  Bank: Deutsche Bank
                  <br />
                  IBAN: DE 14 1007 0124 0128 1054 00
                  <br />
                  BIC/SWIFT: DEUTDEDB101
                </p>
              </div>
              <p className="text-lg">
                (8) We would like to point out that in addition to the ordinary
                legal process, you also have the option of an out-of-court
                settlement of disputes in accordance with Regulation (EU) No.
                524/2013. Details can be found in Regulation (EU) No. 524/2013
                and at the Internet address: http://ec.europa.eu/consumers/odr
              </p>
              <p className="text-lg">
                (9) Our email address is: info@snatchday.de. According to
                Section 36 VSBG, we would like to point out that we are not
                obliged to participate in an out-of-court dispute resolution
                procedure before a consumer arbitration board.
              </p>
              <p className="text-lg">
                (10) The data required for the execution of the contract between
                you and us will be stored by us and will be accessible to you at
                any time. In this respect, we refer to the data protection
                regulations in our General Terms and Conditions.
              </p>
              <p className="text-lg">
                (11) For further information please refer to our General Terms
                and Conditions.
              </p>
              <p className="text-lg">
                (12) As a consumer, you have a right of withdrawal in accordance
                with the following instructions:
              </p>
            </div>

            {/* Cancellation Policy */}
            <div className="mt-8 space-y-4">
              <h3 className="text-2xl font-bold">CANCELLATION POLICY</h3>
              <h4 className="text-xl font-bold">RIGHT OF WITHDRAWAL</h4>
              <p className="text-lg">
                You have the right to withdraw from this contract within
                fourteen days without giving any reason.
              </p>
              <p className="text-lg">
                The cancellation period shall be fourteen days from the day on
                which you or a third party other than the carrier designated by
                you takes possession of the goods.
              </p>
              <p className="text-lg">
                To exercise your right of withdrawal, you must inform us (Snatch
                Day GmbH), Telramundweg 6, 12167 Berlin, AG Charlottenburg HRB
                188665, VAT ID DE313211165, represented by Sven Hofrichter,
                info@snatchday.de) of your decision to withdraw from this
                contract by means of a clear statement (e.g. a letter sent by
                post, fax or e-mail). You can use the attached sample withdrawal
                form for this purpose, but this is not mandatory.
              </p>
              <p className="text-lg">
                To meet the cancellation deadline, it is sufficient for you to
                send your communication concerning your exercise of the right of
                cancellation before the cancellation period has expired.
              </p>

              <h4 className="text-xl font-bold mt-6">
                CONSEQUENCES OF REVOCATION
              </h4>
              <p className="text-lg">
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

              <h4 className="text-xl font-bold mt-6">ADDITIONAL NOTES</h4>
              <p className="text-lg">
                In the event that you return the goods to us, we ask you to use
                the original packaging, if still available.
              </p>
              <p className="text-lg">
                You must return or hand over the goods to us promptly and in any
                event no later than fourteen days from the date on which you
                notify us that you have cancelled this contract. This deadline
                is met if you send the goods before the expiry of the
                fourteen-day period. You will bear the direct cost of returning
                the goods. You only have to pay for any loss of value of the
                goods if this loss of value is due to handling which is not
                necessary to check the quality, properties and functioning of
                the goods.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mt-8">
                <h4 className="text-xl font-bold mb-4">
                  Sample cancellation form according to Annex 2 to Article 246a
                  § 1 Paragraph 2 Sentence 1 No. 1 and § 2 Paragraph 2 No. 2
                  EGBGB
                </h4>
                <p className="text-lg italic mb-4">
                  (If you want to cancel the contract, please fill out this form
                  and send it back)
                </p>
                <div className="space-y-4">
                  <p className="text-lg">
                    To Snatch Day GmbH, Telramundweg 6, 12167 Berlin,
                    info@snatchday.de
                  </p>
                  <p className="text-lg">
                    I/we (*) hereby revoke the contract concluded by me/us (*)
                    for the purchase of the following goods (detailed
                    description so that it can be clearly determined which goods
                    the revocation refers to), the provision of the following
                    services (detailed description so that it can be clearly
                    determined which goods the revocation refers to) (*)
                  </p>
                  <p className="text-lg">
                    • ordered on: (*). . . . ./received on (*) . . . . .;
                  </p>
                  <p className="text-lg">• Name of the consumer(s);</p>
                  <p className="text-lg">• Address of the consumer(s);</p>
                  <p className="text-lg">
                    • Signature of the consumer(s); (only if notification is on
                    paper);
                  </p>
                  <p className="text-lg">• Date</p>
                  <p className="text-lg italic">
                    (*) Please delete if not applicable
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </ClientLayout>
  );
};

export default TermsAndConditions;
