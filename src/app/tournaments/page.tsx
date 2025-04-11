"use client";
import ClientLayout from "@/components/landing-page/ClientLayout";
import SecondaryHeroSection from "@/components/SecondaryHeroSection";
import tournamenttrophy from "@/app/images/tournamenttrophy.png";
import React, { useState } from "react";
import TrainingCenter from "@/components/landing-page/TrainingCenter";
import TournamentFilter from "@/components/tournaments/TournamentFilter";
import { Button } from "@/components/ui/button";
import NextTournamentCard from "@/components/NextTournamentCard";
import headerbg from "@/app/images/tournamentbg.png";
import { useGetTournaments } from "@/hooks/api";
import { TournamentParams } from "@/lib/api";
import { useDebounce } from "@/hooks/useDebounce";
import { Loader2 } from "lucide-react";

const Page = () => {
  const [filters, setFilters] = useState<TournamentParams>({
    limit: "4",
    offset: "0",
  });

  const debouncedFilters = useDebounce(filters, 1000);

  const handleFilterChange = (key: keyof TournamentParams, value: string) => {
    let sortAttr = "";
    let sortOrder = "";

    switch (value) {
      case "latest":
        sortAttr = "createdAt";
        sortOrder = "desc";
        break;
      case "high":
        sortAttr = "startingPrice";
        sortOrder = "asc";
        break;
      case "low":
        sortAttr = "startingPrice";
        sortOrder = "desc";
        break;
      default:
        break;
    }

    setFilters((prev) => ({
      ...prev,
      sort_attr: sortAttr,
      sort: sortOrder,
    }));
  };

  const handlePeriodChange = (from: string, until: string) => {
    setFilters((prev) => ({ ...prev, from, until }));
  };

  const handlePriceChange = (priceRange: string) => {
    setFilters((prev) => ({
      ...prev,
      startingPrice: priceRange,
    }));
  };

  const handleFeeChange = (feeRange: string) => {
    setFilters((prev) => ({
      ...prev,
      participationFee: feeRange,
    }));
  };

  const handleProductChange = (productId: string) => {
    setFilters((prev) => ({
      ...prev,
      product: productId,
    }));
  };

  // const handleCategoryChange = (categoryId: string) => {

  //   setFilters(prev => ({
  //     ...prev,
  //     category: categoryId
  //   }));
  // };

  const handleCategoryChange = (categoryId: string) => {
    setFilters((prev) => {
      // Convert previous string "[id1,id2]" into real array
      const raw = prev.category || "[]";
      const prevCategories: string[] = JSON.parse(raw);

      const isSelected = prevCategories.includes(categoryId);
      const newCategories = isSelected
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId];

      if (newCategories.length === 0) {
        const { category, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        category: JSON.stringify(newCategories),
      };
    });
  };

  const handleVipChange = (vip: string) => {
    if (!vip) return;
    setFilters((prev) => ({
      ...prev,
      vip: vip === "yes" ? "true" : "false",
    }));
  };

  const handleGameChange = (game: string) => {
    setFilters((prev) => ({ ...prev, game }));
  };

  const { data: nextTournament, isLoading } =useGetTournaments(debouncedFilters) ;
  console.log(nextTournament,"nextTournament")

    const tournaments = nextTournament?.data?.tournaments;
    const totalCount =  nextTournament?.data?.total;
    const totalPages = Math.ceil(totalCount / parseInt(filters.limit));
    const currentPage = Math.floor(parseInt(filters.offset) / parseInt(filters.limit)) + 1;
   
    const handlePageChange = (page: number) => {
      setFilters(prev => ({
        ...prev,
        offset: ((page - 1) * parseInt(filters.limit)).toString()
      }));
    };

  return (
    <ClientLayout>
      <div className="mt-10">
        <SecondaryHeroSection
          title="Next tournaments"
          rightimage={tournamenttrophy}
          bg={headerbg}
        />

        <div className="container mx-auto max-w-[1920px] py-10 md:py-20 px-12">
          <div className="flex md:flex-row flex-col items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-4">
              <Button className="gradient-primary text-white rounded-full px-4 sm:px-6 py-1 sm:py-2">
                All TOURNAMENTS
              </Button>
              <p className="text-gray-600">Showing all tournaments</p>
            </div>
            <div className="flex items-center gap-4">
              <select
                onChange={(e) => handleFilterChange("sort", e.target.value)}
                className="h-12 px-2 sm:px-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="" selected disabled>
                  Sort by
                </option>
                <option value={"latest"}>Sort by: Latest</option>
                <option value={"high"}>Sort by: Price Low to High</option>
                <option value={"low"}>Sort by: Price High to Low</option>
              </select>
              {filters.sort && (
                <Button
                  variant="link"
                  onClick={() => {
                    setFilters((prev) => ({
                      ...prev,
                      sort: undefined,
                      sort_attr: undefined,
                    }));
                    const selectElement = document.querySelector(
                      "select"
                    ) as HTMLSelectElement;
                    if (selectElement) {
                      selectElement.selectedIndex = 0;
                    }
                  }}
                  className="text-red-500 hover:text-red-600"
                >
                  Clear
                </Button>
              )}
            </div>
          </div>

          <div className="mb-8">
            <TournamentFilter
              onPeriodChange={handlePeriodChange}
              onPriceChange={handlePriceChange}
              onGameChange={handleGameChange}
              onProductChange={handleProductChange}
              setFilters={setFilters}
              onFeeChange={handleFeeChange}
              onVipChange={handleVipChange}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          {isLoading ? (
            <div className="col-span-full flex justify-center items-center">
              <Loader2 className="animate-spin h-8 w-8" />
            </div>
          ) : tournaments?.length === 0 ? (
            <p className="text-xl text-center">Tournaments not found</p>
          ) : (
            
            <div className="py-5  sm:py-10 md:py-20 rounded-3xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {tournaments?.map((tournament, index) => (
                <NextTournamentCard
                  key={index}
                  {...tournament}
                  game={tournament?.game.title}
                  gameImage={tournament?.game?.image}
                />
              ))}
            </div>
            

            
          )}

          {totalCount > 0 && (
            <div className="flex items-center justify-between px-4 py-4 border-t">
              <div className="text-sm text-gray-500">
                Showing {parseInt(filters.offset) + 1} to {Math.min(parseInt(filters.offset) + parseInt(filters.limit), totalCount)} of {totalCount} entries
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="pb-60 pt-10">
          <TrainingCenter />
        </div>
      </div>
    </ClientLayout>
  );
};

export default Page;
