"use client";
import ClientLayout from "@/components/landing-page/ClientLayout";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <ClientLayout>
      <div className="container max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 pt-28 pb-32">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 mt-12">
          Become a partner
        </h1>

        <div className="max-w-[1440px] mx-auto space-y-8">
          {/* Introduction Text */}
          <div className="text-center space-y-4 mb-12">
            <p className="text-lg text-card-foreground uppercase font-medium">
              ARE YOU INTERESTED IN A COOPERATION AND WOULD YOU LIKE TO WORK
              WITH US?
            </p>
            <p className="text-lg text-card-foreground uppercase font-medium">
              DO YOU HAVE AN IDEA IN YOUR HEAD THAT COMBINES WELL WITH OUR
              CONCEPT?
            </p>
            <p className="text-lg text-card-foreground uppercase font-medium">
              THEN PLEASE CONTACT US AND WE WILL GET IN TOUCH WITH YOU
              IMMEDIATELY.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Please use this form for business purposes only
            </p>
          </div>

          {/* Contact Form */}
          <div className="max-w-[1440px] mx-auto">
            <form className="space-y-6">
              <Input
                type="text"
                placeholder="Company*"
                className="h-12 rounded-md"
                required
              />
              <Input
                type="text"
                placeholder="Legal form"
                className="h-12 rounded-md"
              />
              <Input
                type="text"
                placeholder="Contact person*"
                className="h-12 rounded-md"
                required
              />
              <Input
                type="email"
                placeholder="E-mail address*"
                className="h-12 rounded-md"
                required
              />
              <Input
                type="text"
                placeholder="Street"
                className="h-12 rounded-md"
              />
              <Input
                type="text"
                placeholder="No."
                className="h-12 rounded-md"
              />
              <Input
                type="text"
                placeholder="zip code"
                className="h-12 rounded-md"
              />
              <Input
                type="text"
                placeholder="Location"
                className="h-12 rounded-md"
              />
              <Input
                type="tel"
                placeholder="phone number"
                className="h-12 rounded-md"
              />
              <textarea
                placeholder="Your concern*"
                className="w-full h-32 p-3 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
              />

              {/* File Upload Button */}
              <div className="bg-[#4B5563] text-white p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <span>Attach files / documents</span>
                  <span className="text-sm">
                    Multiple selection by holding down the CTRL key
                  </span>
                </div>
                <div className="text-sm mt-2">Max. file size: 16 MB</div>
                <Input
                  type="file"
                  multiple
                  className="mt-4 bg-white text-gray-900 cursor-pointer file:cursor-pointer file:border-0 file:bg-gray-100 file:text-gray-600 file:px-4 file:py-2 hover:file:bg-gray-200"
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-8">
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white px-12 py-6 text-lg rounded-lg"
                >
                  SUBMIT
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default page;
