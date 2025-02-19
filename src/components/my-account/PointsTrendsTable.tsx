import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,

  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PointsTrend {
  id: number;
  date: string;
  use: string;
  snapPoints: {
    change: string;
    total: string;
  };
  discountPoints: {
    change: string;
    total: string;
  };
}

const pointsTrends: PointsTrend[] = [
  {
    id: 25,
    date: "February 7, 2025",
    use: "Participation Competition ID: 84",
    snapPoints: {
      change: "-50",
      total: "4875",
    },
    discountPoints: {
      change: "0",
      total: "750",
    },
  },
  {
    id: 24,
    date: "February 4, 2025",
    use: "Participation Tournament ID: 1651 - Leave Tournament",
    snapPoints: {
      change: "+500",
      total: "4925",
    },
    discountPoints: {
      change: "-500",
      total: "750",
    },
  },
  {
    id: 23,
    date: "February 4, 2025",
    use: "Participation Tournament ID: 1651",
    snapPoints: {
      change: "-500",
      total: "4425",
    },
    discountPoints: {
      change: "+500",
      total: "1250",
    },
  },
  {
    id: 22,
    date: "January 30, 2025",
    use: "",
    snapPoints: {
      change: "+500",
      total: "4925",
    },
    discountPoints: {
      change: "0",
      total: "750",
    },
  },
  {
    id: 21,
    date: "January 28, 2025",
    use: "Participation Tournament ID: 1637",
    snapPoints: {
      change: "-250",
      total: "4425",
    },
    discountPoints: {
      change: "+250",
      total: "750",
    },
  },
  {
    id: 20,
    date: "January 23, 2025",
    use: "Participation Tournament ID: 1629",
    snapPoints: {
      change: "-500",
      total: "4675",
    },
    discountPoints: {
      change: "+500",
      total: "500",
    },
  },
  {
    id: 19,
    date: "July 10, 2024",
    use: "Duel Fee ID: 1465",
    snapPoints: {
      change: "-25",
      total: "5175",
    },
    discountPoints: {
      change: "0",
      total: "0",
    },
  },
  {
    id: 18,
    date: "July 10, 2024",
    use: "Duel completed ID: 1465 - Win/Loss of Points",
    snapPoints: {
      change: "+100",
      total: "5200",
    },
    discountPoints: {
      change: "0",
      total: "0",
    },
  },
  {
    id: 17,
    date: "July 10, 2024",
    use: "Duel closed ID: 1465 - Duel ended",
    snapPoints: {
      change: "+25",
      total: "5100",
    },
    discountPoints: {
      change: "0",
      total: "0",
    },
  },
  {
    id: 16,
    date: "July 10, 2024",
    use: "Duel closed ID: 1465 - Credit points",
    snapPoints: {
      change: "+100",
      total: "5075",
    },
    discountPoints: {
      change: "0",
      total: "0",
    },
  },
];

const PointsTrendsTable = () => {
  return (
    <div className="p-20">
      <h2 className="text-2xl font-bold mb-10">Points Trends</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>use</TableHead>
              <TableHead className="text-right">snap points</TableHead>
              <TableHead className="text-right">discount points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pointsTrends.map((trend) => (
              <TableRow key={trend.id}>
                <TableCell>{trend.id}</TableCell>
                <TableCell>{trend.date}</TableCell>
                <TableCell>
                  <span className="text-foreground">{trend.use}</span>
                </TableCell>
                <TableCell>
                  <div className="text-right">
                    <span
                      className={
                        trend.snapPoints.change.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {trend.snapPoints.change}
                    </span>
                    <br />
                    <span className="text-foreground">
                      {trend.snapPoints.total}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-right">
                    <span
                      className={
                        trend.discountPoints.change === "0"
                          ? "text-foreground"
                          : trend.discountPoints.change.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {trend.discountPoints.change}
                    </span>
                    <br />
                    <span className="text-foreground">
                      {trend.discountPoints.total}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="p-4 border-t flex items-center justify-between">
          <p className="text-sm text-foreground">
            Showing 1 to 10 of 10 (1 page(s))
          </p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default PointsTrendsTable;
