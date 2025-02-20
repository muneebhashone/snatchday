import ClientLayout from "@/components/landing-page/ClientLayout";
import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <ClientLayout>
      <div className="container max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 pt-28 pb-32">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 mt-12">
          Data Protection
        </h1>

        <div className="max-w-[1440px] mx-auto space-y-8 text-card-foreground">
          {/* Responsibility Information */}
          <section>
            <p className="text-lg">
              Responsible for the website www.snatchday.de is Snatch Day GmbH,
              represented by the managing director Sven Hofrichter, Telramundweg
              6, 12167 Berlin, email:{" "}
              <Link
                href="mailto:info@snatchday.de"
                className="text-primary hover:underline"
              >
                info@snatchday.de
              </Link>
              , (hereinafter: Snatch Day).
            </p>
            <p className="text-lg mt-4">
              To the extent that Snatch Day collects data, it does so in
              compliance with the relevant provisions of the Federal Data
              Protection Act (BDSG) and the Telemedia Act (TMG).
            </p>
          </section>

          {/* General Privacy Policy */}
          <section>
            <h2 className="text-2xl font-bold mb-4">General Privacy Policy</h2>
            <div className="space-y-4">
              <p className="text-lg">
                By using our website, you agree to the collection, processing
                and use of data in accordance with the following description.
                Our website can generally be visited without registration. Data
                such as pages accessed or the name of the file accessed, date
                and time are stored on the server for statistical purposes
                without this data being directly related to you. Personal data,
                in particular name, address or email address, are collected on a
                voluntary basis wherever possible. The data will not be passed
                on to third parties without your consent.
              </p>
              <p className="text-lg">
                Our website can be used without providing any personal data.
                Different rules may apply to the use of individual services on
                our website, which are explained separately below. We only
                process your personal data (e.g. name, address, email address,
                telephone number, etc.) in accordance with the provisions of
                German data protection law. Data is personal if it can be
                clearly assigned to a specific natural person. The legal basis
                for data protection can be found in the Federal Data Protection
                Act (BDSG) and the Telemedia Act (TMG).
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-50 p-6 rounded-lg">
            <div className="font-medium">
              <p>Snatch Day GmbH</p>
              <p>Telramundweg 6</p>
              <p>12167 Berlin</p>
              <p>
                <Link
                  href="mailto:Info@snatchday.de"
                  className="text-primary hover:underline"
                >
                  Info@snatchday.de
                </Link>
              </p>
            </div>
          </section>

          {/* Security Notice */}
          <section>
            <p className="text-lg italic">
              We would like to point out that internet-based data transmission
              has security gaps, meaning that complete protection against access
              by third parties is impossible.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Cookies</h2>
            <div className="space-y-4">
              <p className="text-lg">
                We use so-called cookies on our website to recognize repeated
                use of our services by the same user/internet connection owner.
                Cookies are small text files that your internet browser saves on
                your computer. They are used to optimize our website and our
                offers. These are mostly so-called "session cookies" that are
                deleted after the end of your visit.
              </p>
              <p className="text-lg">
                However, some of these cookies provide information to
                automatically recognize you. This recognition is based on the IP
                address stored in the cookies. The information obtained in this
                way is used to optimize our offers and to give you easier access
                to our website.
              </p>
              <p className="text-lg">
                You can prevent the installation of cookies by setting your
                browser accordingly; however, we would like to point out that in
                this case you may not be able to use all functions of our
                website to their full extent.
              </p>
            </div>
          </section>

          {/* Server Data */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Server Data</h2>
            <p className="text-lg mb-4">
              For technical reasons, the following data, which your Internet
              browser transmits to us or to our web space provider, is recorded
              (so-called server log files):
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg ml-4">
              <li>browser type and version</li>
              <li>operating system used</li>
              <li>website from which you visit us (referrer URL)</li>
              <li>website you visit</li>
              <li>date and time of your access</li>
              <li>your Internet Protocol (IP) address</li>
            </ul>
          </section>

          {/* Personal Data */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Personal Data</h2>
            <div className="space-y-4">
              <p className="text-lg">
                We offer you the opportunity to register on our website. In
                order for you to be able to use our services after opening a
                customer account, we require the following data from you, which
                is requested by the input mask when opening the account:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg ml-4">
                <li>your full name</li>
                <li>your username</li>
                <li>your date of birth</li>
                <li>your email address</li>
                <li>your complete and correct address</li>
                <li>optionally your landline phone number</li>
                <li>a password that you assign to yourself</li>
              </ul>
              <p className="text-lg">
                We need the data to process orders and, if necessary, to
                establish contact in case of problems.
              </p>
              <p className="text-lg">
                Your data is collected and stored solely for the use of our
                services. When you register on our site, we will also save your
                IP address and the date and time of your registration. This
                serves as a safeguard on our part in the event that a third
                party misuses your data and registers on our site using this
                data without your knowledge. The data is not passed on to third
                parties. The data collected in this way is also not compared
                with data that may be collected by other components of our site.
              </p>
            </div>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Security</h2>
            <p className="text-lg">
              Your data is electronically protected against unauthorized access
              and loss through a variety of measures. We use technical and
              organizational security measures to ensure that your personal data
              is protected against loss, incorrect changes or unauthorized
              access by third parties. The security measures are constantly
              being adapted to the improved technical possibilities. In
              particular, the communication between you and us for registration
              and for the entire data exchange up to deregistration is
              encrypted.
            </p>
          </section>

          {/* Newsletter */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Newsletter</h2>
            <p className="text-lg">
              We offer you the opportunity to subscribe to our newsletter on our
              website. With this newsletter we inform you about our offers at
              regular intervals. In order to receive our newsletter, you need a
              valid email address. We will check the email address you have
              entered to see whether you are actually the owner of the email
              address provided or whether the owner is authorized to receive the
              newsletter. When you subscribe to our newsletter, we will save
              your IP address and the date and time of your registration. This
              serves as a safeguard on our part in the event that a third party
              misuses your email address and subscribes to our newsletter
              without your knowledge. We do not collect any further data. The
              data collected in this way is used exclusively for the
              subscription to our newsletter. It is not passed on to third
              parties. The data collected in this way is also not compared with
              data that may be collected by other components of our website. You
              can cancel your subscription to this newsletter at any time. You
              can find details about this in the confirmation email and each
              individual newsletter.
            </p>
          </section>

          {/* Contact Option */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Option</h2>
            <p className="text-lg">
              On our website we offer you the opportunity to contact us by email
              and/or via a contact form. In this case, the information provided
              by the user is stored for the purpose of processing his or her
              contact request. It is not passed on to third parties. The data
              collected in this way is also not compared with data that may be
              collected by other components of our website.
            </p>
          </section>

          {/* Google Analytics */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              Google Analytics with Anonymization Function
            </h2>
            <div className="space-y-4">
              <p className="text-lg">
                We use Google Analytics, a web analysis service provided by
                Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043
                USA, hereinafter referred to as "Google". Google Analytics uses
                so-called "cookies", text files that are stored on your computer
                and enable an analysis of your use of the website.
              </p>
              <p className="text-lg">
                The information generated by these cookies, such as the time,
                location and frequency of your website visits, including your IP
                address, is transmitted to and stored by Google in the USA.
              </p>
              <p className="text-lg">
                We use Google Analytics with an IP anonymization function on our
                website. In this case, your IP address will be shortened and
                thus anonymized by Google within member states of the European
                Union or in other contracting states to the Agreement on the
                European Economic Area.
              </p>
              <p className="text-lg">
                Google will use this information to evaluate your use of our
                website, to compile reports on website activity for us and to
                provide other services related to website activity and internet
                usage. Google may also transfer this information to third
                parties where required to do so by law, or where third parties
                process the data on Google's behalf.
              </p>
              <p className="text-lg">
                According to Google, under no circumstances will your IP address
                be associated with other data held by Google. You may prevent
                the installation of cookies by setting your browser software
                accordingly; however, we would like to point out that in this
                case you may not be able to use all functions of our website to
                their full extent.
              </p>
              <p className="text-lg">
                Furthermore, Google offers a deactivation option for the most
                common browsers, which gives you more control over which data is
                collected and processed by Google. If you activate this option,
                no information about your website visit will be sent to Google
                Analytics. However, activation does not prevent information from
                being sent to us or to other web analysis services we may use.
                You can find more information about the deactivation option
                provided by Google and how to activate this option via the
                following link: https://tools.google.com/dlpage/gaoptout?hl=de
              </p>
            </div>
          </section>

          {/* reCAPTCHA */}
          <section>
            <h2 className="text-2xl font-bold mb-4">reCAPTCHA</h2>
            <div className="space-y-4">
              <p className="text-lg">
                To protect input forms on our website, we use the "reCAPTCHA"
                service provided by Google Inc., 1600 Amphitheatre Parkway,
                Mountain View, CA 94043 USA, hereinafter "Google". By using this
                service, it is possible to distinguish whether the corresponding
                input is of human origin or has been misused by automated
                machine processing.
              </p>
              <p className="text-lg">
                To the best of our knowledge, the referrer URL, the IP address,
                the behavior of website visitors, information about the
                operating system, browser and length of stay, cookies, display
                instructions and scripts, the user's input behavior and mouse
                movements in the area of ​​the "reCAPTCHA" checkbox are
                transmitted to "Google".
              </p>
              <p className="text-lg">
                Google uses the information obtained in this way, among other
                things, to digitize books and other printed matter and to
                optimize services such as Google Street View and Google Maps
                (e.g. house number and street name recognition).
              </p>
              <p className="text-lg">
                The IP address transmitted as part of "reCAPTCHA" will not be
                merged with other data from Google, unless you are logged into
                your Google account at the time you use the "reCAPTCHA" plug-in.
                If you want to prevent this transmission and storage of data
                about you and your behavior on our website by "Google", you must
                log out of "Google" before you visit our site or use the
                reCAPTCHA plug-in.
              </p>
              <p className="text-lg">
                The use of the information obtained through the "reCAPTCHA"
                service is subject to the Google Terms of Use:
                https://www.google.com/intl/de/policies/privacy/
              </p>
            </div>
          </section>

          {/* Social Plugins */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Use of Social Plugins</h2>

            {/* Facebook */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Facebook</h3>
              <div className="space-y-4">
                <p className="text-lg">
                  We use components from the provider facebook.com on our
                  website. Facebook is a service of facebook Inc., 1601 S.
                  California Ave, Palo Alto, CA 94304, USA. Every time you
                  access our website that is equipped with such a component,
                  this component causes the browser you are using to download a
                  corresponding representation of the component from facebook.
                  This process informs facebook which specific page of our
                  website you are currently visiting.
                </p>
                <p className="text-lg">
                  If you visit our page and are logged into facebook at the same
                  time, facebook recognizes which specific page you are visiting
                  through the information collected by the component and assigns
                  this information to your personal account on facebook. If, for
                  example, you click the "Like" button or make corresponding
                  comments, this information is sent to your personal user
                  account on facebook and saved there. In addition, the
                  information that you have visited our page is passed on to
                  facebook. This happens regardless of whether you click on the
                  component or not.
                </p>
                <p className="text-lg">
                  If you want to prevent Facebook from transmitting and storing
                  data about you and your behavior on our website, you must log
                  out of Facebook before visiting our site. Facebook's privacy
                  policy provides more information on this, in particular on the
                  collection and use of data by Facebook, your rights in this
                  regard, and the settings options for protecting your privacy:
                  https://de-de.facebook.com/about/privacy/
                </p>
                <p className="text-lg">
                  An overview of Facebook plugins can be found at:
                  https://developers.facebook.com/docs/plugins
                </p>
              </div>
            </div>

            {/* YouTube */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">
                YouTube with Extended Privacy Mode
              </h3>
              <div className="space-y-4">
                <p className="text-lg">
                  On our website we use components (videos) from YouTube, LLC
                  901 Cherry Ave., 94066 San Bruno, CA, USA, a company of Google
                  Inc., Amphitheatre Parkway, Mountain View, CA 94043, USA.
                </p>
                <p className="text-lg">
                  We use the option "- enhanced data protection mode -" provided
                  by YouTube.
                </p>
                <p className="text-lg">
                  When you visit a page that has an embedded video, a connection
                  is established to the YouTube servers and the content is
                  displayed on the website by communicating it to your browser.
                </p>
                <p className="text-lg">
                  According to YouTube, in "- enhanced data protection mode -"
                  only data is transmitted to the YouTube server, in particular
                  which of our websites you visited when you watch the video. If
                  you are logged in to YouTube at the same time, this
                  information is assigned to your YouTube member account. You
                  can prevent this by logging out of your member account before
                  visiting our website.
                </p>
                <p className="text-lg">
                  Further information on YouTube's privacy policy is provided by
                  Google at the following link:
                  https://www.google.de/intl/de/policies/privacy/
                </p>
              </div>
            </div>

            {/* Google+ */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Google+</h3>
              <div className="space-y-4">
                <p className="text-lg">
                  We use the "+1" button on our website provided by Google+, a
                  service provided by Google Inc., 1600 Amphitheatre Parkway,
                  Mountain View, CA 94043 USA, hereinafter referred to as
                  "Google". Each time you access our website that is equipped
                  with such a "+1" component, this component causes the browser
                  you are using to download a corresponding representation of
                  the component from Google.
                </p>
                <p className="text-lg">
                  If you visit our site while logged in to Google, Google can
                  collect information about your Google account, the website you
                  recommend, your IP address and other browser-related
                  information when you click the "+1" button.
                </p>
                <p className="text-lg">
                  This means that your "+1" recommendation can be saved and made
                  publicly available. Your Google "+1" recommendation can then
                  be displayed as a reference together with your account name
                  and, if applicable, with your photo stored with Google in
                  Google services, such as in search results or in your Google
                  account or elsewhere, such as on websites and advertisements
                  on the Internet.
                </p>
                <p className="text-lg">
                  You can find Google's privacy policy for the "+1" button with
                  all further information on the collection, transfer and use of
                  data by Google, your rights in this regard and your profile
                  setting options here:
                  https://developers.google.com/+/web/buttons-policy
                </p>
              </div>
            </div>

            {/* Instagram */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Instagram</h3>
              <div className="space-y-4">
                <p className="text-lg">
                  We use the Instagram service on our website. Instagram is a
                  service of Instagram Inc. Through the integrated "Insta"
                  button on our page, Instagram receives the information that
                  you have accessed the corresponding page of our website. If
                  you are logged in to Instagram, Instagram can assign this
                  visit to our page to your Instagram account and thus link the
                  data.
                </p>
                <p className="text-lg">
                  The data transmitted by clicking the "Insta" button is stored
                  by Instagram. You can find further information on the purpose
                  and scope of data collection, its processing and use, as well
                  as your related rights and setting options to protect your
                  privacy in the Instagram privacy policy, which you can access
                  at https://help.instagram.com/155833707900388
                </p>
                <p className="text-lg">
                  To prevent Instagram from associating your visit to our site
                  with your Instagram account, you must log out of your
                  Instagram account before visiting our site.
                </p>
              </div>
            </div>
          </section>

          {/* Payment Methods */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Payment Methods</h2>

            {/* PayPal */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">
                PayPal as a Payment Method
              </h3>
              <div className="space-y-4">
                <p className="text-lg">
                  If you decide to pay with the online payment service provider
                  PayPal during the ordering process, your contact details will
                  be sent to PayPal as part of the order placed in this way.
                  PayPal is an offer from PayPal (Europe) S.à.rl & Cie. SCA,
                  22-24 Boulevard Royal, L-2449 Luxembourg. PayPal acts as an
                  online payment service provider and a trustee and offers buyer
                  protection services.
                </p>
                <p className="text-lg">
                  The personal data transmitted to PayPal usually includes first
                  name, last name, address, telephone number, IP address, email
                  address, or other data required to process the order, as well
                  as data related to the order, such as number of items, item
                  number, invoice amount and taxes in percent, invoice
                  information, etc.
                </p>
                <p className="text-lg">
                  This transmission is necessary to process your order using the
                  payment method you have selected, in particular to confirm
                  your identity, to administer your payment and the customer
                  relationship.
                </p>
                <p className="text-lg">
                  Please note, however: PayPal may also pass on personal data to
                  service providers, subcontractors or other affiliated
                  companies if this is necessary to fulfil the contractual
                  obligations arising from your order or if the personal data is
                  to be processed on behalf of them.
                </p>
                <p className="text-lg">
                  Depending on the payment method selected via PayPal, e.g.
                  invoice or direct debit, the personal data transmitted to
                  PayPal will be transmitted by PayPal to credit agencies. This
                  transmission serves to check your identity and
                  creditworthiness in relation to the order you have placed. You
                  can find out which credit agencies these are and which data
                  PayPal generally collects, processes, stores and passes on in
                  PayPal's privacy policy at
                  https://www.paypal.com/de/webapps/mpp/ua/privacy-full
                </p>
              </div>
            </div>

            {/* Sofortüberweisung */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">
                Sofortüberweisung as a Payment Method
              </h3>
              <div className="space-y-4">
                <p className="text-lg">
                  If you decide to pay with the online payment service provider
                  Sofortüberweisung during the ordering process, your contact
                  details will be sent to Sofortüberweisung as part of the order
                  placed in this way. Sofortüberweisung is an offer from SOFORT
                  GmbH, Theresienhöhe 12, 80339 Munich, Germany.
                  Sofortüberweisung acts as an online payment service provider
                  that enables cashless payment for products and services on the
                  Internet.
                </p>
                <p className="text-lg">
                  The personal data transmitted to Sofortüberweisung usually
                  includes first name, last name, address, telephone number, IP
                  address, email address, or other data required to process the
                  order, as well as data related to the order, such as number of
                  items, item number, invoice amount and taxes in percent,
                  invoice information, etc.
                </p>
                <p className="text-lg">
                  This transmission is necessary to process your order using the
                  payment method you have selected, in particular to confirm
                  your identity, to administer your payment and the customer
                  relationship.
                </p>
                <p className="text-lg">
                  Please note, however: Sofortüberweisung may also pass on
                  personal data to service providers, subcontractors or other
                  affiliated companies if this is necessary to fulfil the
                  contractual obligations arising from your order or if the
                  personal data is to be processed on behalf of the latter.
                </p>
                <p className="text-lg">
                  Under certain circumstances, the personal data transmitted to
                  Sofortüberweisung may be transmitted by Sofortüberweisung to
                  credit reporting agencies. This transmission serves to check
                  your identity and creditworthiness in relation to the order
                  you have placed.
                </p>
                <p className="text-lg">
                  You can find out which data protection principles
                  Sofortüberweisung applies when processing your data in the
                  data protection information that is displayed to you during
                  the Sofortüberweisung payment process.
                </p>
                <p className="text-lg">
                  If you have any further questions about the use of your
                  personal data, you can contact Sofortüberweisung by email
                  (datenschutz@sofort.com) or in writing (SOFORT GmbH,
                  Datenschutz, Theresienhöhe 12, 80339 Munich).
                </p>
              </div>
            </div>
          </section>

          {/* Google AdWords and AdSense */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              Google AdWords and AdSense
            </h2>

            {/* Google AdWords */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Google AdWords</h3>
              <div className="space-y-4">
                <p className="text-lg">
                  We also use the Google advertising tool "Google Adwords" to
                  promote our website. As part of this, we use the analysis
                  service "Conversion Tracking" from Google Inc., 1600
                  Amphitheatre Parkway, Mountain View, CA 94043 USA, hereinafter
                  "Google". If you have reached our website via a Google ad, a
                  cookie will be stored on your computer. Cookies are small text
                  files that your Internet browser stores on your computer.
                  These so-called "conversion cookies" expire after 30 days and
                  are not used to personally identify you.
                </p>
                <p className="text-lg">
                  If you visit certain pages on our website and the cookie has
                  not yet expired, we and Google can recognize that you as a
                  user have clicked on one of our ads placed on Google and have
                  been redirected to our site.
                </p>
                <p className="text-lg">
                  The information obtained using "conversion cookies" is used by
                  Google to create visit statistics for our website. These
                  statistics tell us the total number of users who clicked on
                  our advert and which pages of our website were subsequently
                  accessed by the respective user. However, we and other
                  advertisers using "Google Adwords" do not receive any
                  information that could be used to personally identify users.
                </p>
                <p className="text-lg">
                  You can prevent the installation of "conversion cookies" by
                  setting your browser accordingly, for example by using a
                  browser setting that generally deactivates the automatic
                  setting of cookies or specifically blocks only cookies from
                  the domain "googleadservices.com".
                </p>
                <p className="text-lg">
                  You can find Google's privacy policy at the following link:
                  https://services.google.com/sitestats/de.html
                </p>
              </div>
            </div>

            {/* Google AdSense */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Google AdSense</h3>
              <div className="space-y-4">
                <p className="text-lg">
                  We use Google AdSense on our website. Google AdSense is a
                  service provided by Google Inc., 1600 Amphitheatre Parkway,
                  Mountain View, CA 94043 USA, for integrating advertisements.
                  Google AdSense uses so-called "cookies", i.e. text files that
                  are stored on your computer and enable an analysis of the use
                  of our website. Google AdSense also uses so-called web
                  beacons. These web beacons enable Google to evaluate
                  information, such as the flow of visitors to our site.
                </p>
                <p className="text-lg">
                  Along with your IP address and the recording of the
                  advertising formats displayed, this information is transmitted
                  to Google in the USA, stored there and may be passed on by
                  Google to contractual partners. However, Google does not
                  combine your IP address with other data stored by you. You can
                  prevent the installation of cookies by setting your browser
                  accordingly; however, we would like to point out that in this
                  case you may not be able to use all functions of our website
                  to their full extent. By using our website, you agree to the
                  processing of the data collected about you by Google in the
                  manner and for the purposes described above.
                </p>
              </div>
            </div>
          </section>

          {/* Revocation and Deletion of Data */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              Revocation and Deletion of Data
            </h2>
            <div className="space-y-4">
              <p className="text-lg">
                If you have given us your consent to process personal data, you
                can revoke this at any time. Please send a message to:
                widerruf@snacthday.de
              </p>
              <p className="text-lg">
                We will delete your personal data if it is no longer required or
                if you have requested deletion.
              </p>
              <p className="text-lg">
                Please note that data cannot be deleted if there are
                legal/official retention obligations or if we still need it to
                bill for services.
              </p>
            </div>
          </section>

          {/* Changes Notice */}
          <section className="bg-gray-50 p-6 rounded-lg mt-12">
            <h2 className="text-2xl font-bold mb-4">
              Changes to Our Privacy Policy
            </h2>
            <p className="text-lg">
              In order to ensure that our data protection declaration always
              complies with the current legal requirements, we reserve the right
              to make changes at any time. This also applies in the event that
              the data protection declaration has to be adjusted due to new or
              revised services, for example new services. The new data
              protection declaration will then take effect the next time you
              visit our website.
            </p>
          </section>
        </div>
      </div>
    </ClientLayout>
  );
};

export default page;
