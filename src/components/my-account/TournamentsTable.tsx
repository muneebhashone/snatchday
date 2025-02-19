import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image, { StaticImageData } from "next/image";
import laptop from "@/app/images/laptop.png";
import iphone from "@/app/images/iphone.png";

interface Tournament {
  id: string;
  icon: string;
  title: string;
  date: string;
  round: number;
  attempts: number;
  time: string;
  product: {
    image: StaticImageData;
    name: string;
  };
  originalPrice: string;
  discount: string;
  finalPrice: string;
  status: "Won" | "Loss";
}

const tournaments: Tournament[] = [
  {
    id: "1637",
    icon: "purple",
    title: "Acer Aspire 3 A315-35 - Intel Pentium Silver N6000",
    date: "2025-01-28 18:31:00",
    round: 0,
    attempts: 0,
    time: "00:00:00.000",
    product: {
      image: laptop,
      name: 'Acer Aspire 3 A315-35 - Intel Pentium Silver N6000 / 1.1 GHz - Win 11 Home - UHD Graphics - 8 GB RAM - 512 GB SSD QLC - 39.62 cm (15.6") - (4710886785170)',
    },
    originalPrice: "535.00€",
    discount: "-10.00€",
    finalPrice: "525.00€",
    status: "Loss",
  },
  {
    id: "1629",
    icon: "green",
    title: "Apple iPhone 13 - Smartphone - Dual-SIM / Internal Storage",
    date: "2025-01-23 15:00:00",
    round: 0,
    attempts: 0,
    time: "00:00:00.000",
    product: {
      image: iphone,
      name: "Apple iPhone 13 - 5G Smartphone - Dual SIM / Internal Memory 128 GB - (019425312901)",
    },
    originalPrice: "982.00€",
    discount: "-5.00€",
    finalPrice: "977.00€",
    status: "Loss",
  },
  {
    id: "1256",
    icon: "purple",
    title: "Acer Aspire 3 A315-35 - Intel Pentium Silver N6000",
    date: "2024-07-03 19:52:00",
    round: 2,
    attempts: 8,
    time: "00:02:49.906",
    product: {
      image: laptop,
      name: 'Acer Aspire 3 A315-35 - Intel Pentium Silver N6000 / 1.1 GHz - Win 11 Home - UHD Graphics - 8 GB RAM - 512 GB SSD QLC - 39.62 cm (15.6") - (4710886785170)',
    },
    originalPrice: "535.00€",
    discount: "-10.00€",
    finalPrice: "525.00€",
    status: "Won",
  },
  {
    id: "316",
    icon: "green",
    title: "Huawei Matebook E Dirac-W3831T - Tablet - Intel Core i3",
    date: "2023-09-28 13:50:00",
    round: 2,
    attempts: 52,
    time: "00:02:18.257",
    product: {
      image: laptop,
      name: 'Huawei Matebook E Dirac-W3831T - Tablet - Intel Core i3 1110G4 - Win 11 Home - UHD Graphics - 8 GB RAM - 128 GB SSD NVMe - 32 cm (12.6") - (6941487245482)',
    },
    originalPrice: "840.75€",
    discount: "-10.00€",
    finalPrice: "830.75€",
    status: "Won",
  },
];

const TournamentsTable = () => {
  return (
    <div className="p-20">
      <h2 className="text-2xl font-bold mb-10">My Tournaments</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Opinion</TableHead>
              <TableHead>Description / Date</TableHead>
              <TableHead>your result</TableHead>
              <TableHead>product</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-center">status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tournaments.map((tournament) => (
              <TableRow key={tournament.id}>
                <TableCell>{tournament.id}</TableCell>
                <TableCell>
                  <div
                    className={`w-16 h-16 rounded-lg ${
                      tournament.icon === "purple"
                        ? "bg-purple-200"
                        : "bg-green-200"
                    } flex items-center justify-center`}
                  >
                    <Image
                      src={tournament.product.image}
                      alt={tournament.title}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-primary mb-1">
                    {tournament.title}
                  </div>
                  <div className="text-sm text-foreground">
                    {new Date(tournament.date).toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div>Round: {tournament.round}</div>
                  <div>Attempts: {tournament.attempts}</div>
                  <div>Time: {tournament.time}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Image
                      src={tournament.product.image}
                      alt={tournament.product.name}
                      width={50}
                      height={50}
                      className="object-contain"
                    />
                    <div className="max-w-[400px]">
                      {tournament.product.name}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="text-foreground line-through">
                    {tournament.originalPrice}
                  </div>
                  <div className="text-red-500">{tournament.discount}</div>
                  <div className="font-medium">{tournament.finalPrice}</div>
                </TableCell>
                <TableCell>
                  <div
                    className={`text-center rounded-md py-1 px-4 
                    ${
                      tournament.status === "Won"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {tournament.status}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="p-4 border-t">
          <p className="text-sm text-foreground">
            Showing 1 to 4 of 4 (1 page(s))
          </p>
        </div>
      </div>
    </div>
  );
};

export default TournamentsTable;
