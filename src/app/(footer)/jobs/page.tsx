import ClientLayout from "@/components/landing-page/ClientLayout";
import React from "react";

const JobsPage = () => {
  return (
    <ClientLayout>
      <div className="container max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 pt-28 pb-32">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 mt-12">
          Jobs & Career
        </h1>

        <div className="max-w-5xl mx-auto text-center">
          <p className="text-lg text-gray-600">
            There are currently no job openings available.
          </p>
        </div>
      </div>
    </ClientLayout>
  );
};

export default JobsPage;
