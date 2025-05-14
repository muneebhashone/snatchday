"use client";
import ClientLayout from "@/components/landing-page/ClientLayout";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/userContext";
import { useGetTournamentById } from "@/hooks/api";
import { formatCurrency } from "@/lib/utils";
import Breadcrumb from "antd/es/breadcrumb";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const { id } = useParams();
  const { data: tournament } = useGetTournamentById(id as string);
  const { user } = useUserContext();
  const userResubmissions = tournament?.data?.results.filter(
    (result) => result.user._id === user?.user?._id
  ).length;
  const resubmissions = tournament?.data?.resubmissions;

  const userPreviousResults = tournament?.data?.results.filter(
    (result) => result.user._id === user?.user?._id
  );
  console.log(userPreviousResults, "previousResults");
  //   console.log(user?.user?._id, "user");
  //   console.log(userResubmissions, "tournament");
  // const hasParticipated =
  //   tournament?.data?.results?.filter(
  //     (participant) => participant._id === user?.user?._id
  //   ) < tournament?.data?.resubmissions;
  // console.log(hasParticipated, "hasParticipated");

  return (
    <ClientLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 pb-56">
          <div className="mb-8">
            <Breadcrumb
              items={[
                {
                  title: "Home",
                  href: "/",
                },
                {
                  title: "Tournaments",
                  href: "/tournaments",
                },
                {
                  title: tournament?.data?.game?.title,
                },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Tournament Info */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="flex-shrink-0">
                    <div className="relative w-48 h-48 rounded-xl overflow-hidden shadow-md">
                      <Image
                        src={tournament?.data?.game?.logo}
                        alt={tournament?.data?.game?.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-grow">
                    <div className="space-y-6">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">
                          {tournament?.data?.game?.title}
                        </h1>
                        <p className="text-gray-600 leading-relaxed italic text-sm">
                          {tournament?.data?.game?.content}
                        </p>
                      </div>
                      {tournament?.data?.status !== "inactive" && (
                        <div className="flex items-center gap-4">
                          <div className="bg-blue-50 rounded-lg px-4 py-2">
                            <p className="text-sm font-medium text-blue-700">
                              Resubmissions:{" "}
                              <span className="font-bold">
                                {userResubmissions}
                              </span>{" "}
                              /{" "}
                              <span className="text-blue-500">
                                {resubmissions}
                              </span>
                            </p>
                          </div>

                          {userResubmissions < resubmissions ? (
                            <Link href={`/tournament/play/${id}`}>
                              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg">
                                {Number(userResubmissions) < 1
                                  ? "Play Now"
                                  : "Play Again"}
                              </Button>
                            </Link>
                          ) : (
                            <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg">
                              <p className="text-sm font-medium">
                                Your Resubmissions are over
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top 3 Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="mr-2">🏆</span> Top 3
                </h2>
                <div className="space-y-4">
                  {tournament?.data?.results
                    .slice(0, 3)
                    .map((result, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-blue-100 transition-colors"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Image
                              src={result.user.image}
                              alt={result.user.name}
                              width={32}
                              height={32}
                              className="w-6 h-6 object-cover rounded-full"
                            />
                            <div>
                              <p className="text-sm text-gray-600 font-bold">
                                {result.user.name}
                              </p>
                              <p className="text-sm text-gray-600 font-medium">
                                Rank #{index + 1}
                              </p>
                              <p className="text-lg font-bold text-gray-900">
                                Score: {result.score}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Time</p>
                            <p className="text-lg font-bold text-gray-900">
                              {result.time}s
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Your Performance Section */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="mr-2">📊</span> Your Previous Resubmissions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userPreviousResults && userPreviousResults.length > 0 ? (
                    userPreviousResults.map((result, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-blue-100 transition-colors"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-600 font-medium">
                              Attempt {index + 1}
                            </p>
                            <p className="text-lg font-bold text-gray-900">
                              Score: {result.score}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Time</p>
                            <p className="text-lg font-bold text-gray-900">
                              {result.time}s
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8">
                      <p className="text-gray-500">No attempts yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Product Won Section */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="mr-2">🎁</span> Your Prize
                </h2>
                {tournament?.data?.winner &&
                tournament?.data?.winner?._id === user?.user?._id ? (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="">
                        <Image
                          src={tournament?.data?.article?.images[0]}
                          alt={tournament?.data?.article?.title}
                          className="object-contain"
                          width={200}
                          height={200}
                        />
                      </div>
                      <div className="flex-grow text-center md:text-left">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          Congratulations! You won:
                        </h3>
                        <p className="text-lg font-semibold text-emerald-600 mb-2">
                          {tournament?.data?.article?.title}
                        </p>
                        <p className="text-gray-600 text-sm italic">
                          {tournament?.data?.article?.description}
                        </p>
                        <div className="flex items-end gap-10 w-full justify-between">
                          <div className="mt-4">
                            <p className="text-md font-bold text-gray-500">
                              Original Price:{" "}
                              {formatCurrency(
                                tournament?.data?.article?.calculatedPrice
                              )}
                            </p>
                            <p className="text-md font-bold text-emerald-600 ">
                              Price Reduction:{" "}
                              {formatCurrency(
                                tournament?.data?.priceReduction >
                                  tournament?.data?.fee *
                                    tournament?.data?.participants?.length
                                  ? tournament?.data?.fee *
                                      tournament?.data?.participants?.length
                                  : tournament?.data?.priceReduction
                              )}
                            </p>
                            <p className="text-lg font-bold text-emerald-600">
                              Your Price:{" "}
                              {formatCurrency(
                                tournament?.data?.article?.calculatedPrice -
                                  (tournament?.data?.priceReduction >
                                  tournament?.data?.fee *
                                    tournament?.data?.participants?.length
                                    ? tournament?.data?.fee *
                                      tournament?.data?.participants?.length
                                    : tournament?.data?.priceReduction)
                              )}
                            </p>
                          </div>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg">
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      {tournament?.data?.status === "completed"
                        ? "This tournament has ended. Better luck next time!"
                        : "Keep playing to win amazing prizes!"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default Page;
