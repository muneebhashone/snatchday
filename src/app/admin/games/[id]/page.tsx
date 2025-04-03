"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { useGetGameById } from "@/hooks/api";
import { Calendar, Gamepad2, Info, Plus, RefreshCcw, User } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const params = useParams();
  const paramsId = params.id;
  const { data: game } = useGetGameById(paramsId);
  console.log(game);

  return (
    <AdminLayout>
      <div>
        <div className="grid grid-cols-3 gap-4">
          {/* game details */}
          <Card className="py-2 px-4 flex flex-col gap-2 shadow-md">
            <div className="flex gap-4 items-center pb-1 border-b">
              <Info />
              <h1 className="font-bold text-primary">Game details</h1>
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-primary p-2 rounded-sm">
                <Gamepad2 className="text-white" size={15} />
              </div>
              <p className="text-primary">{game?.data.title}</p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-primary p-2 rounded-sm">
                <Calendar className="text-white" size={15} />
              </div>
              <p>{game?.data.releaseDate?.split("T")[0]}</p>
            </div>
          </Card>

          {/* developer details */}
          <Card className="py-2 px-4 flex flex-col gap-2 shadow-md">
            <div className="flex gap-4 items-center pb-1 border-b">
              <User />
              <h1 className="font-bold text-primary">Developer details</h1>
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-primary p-2 rounded-sm">
                <User className="text-white" size={15} />
              </div>
              <p className="text-primary">{game?.data.developer}</p>
            </div>
          </Card>

          {/* options */}
          <Card className="py-2 px-4 flex flex-col gap-2 shadow-md">
            <div className="flex gap-4 items-center pb-1 border-b">
              <Info />
              <h1 className="font-bold text-primary">Options</h1>
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-primary p-2 rounded-sm">
                <RefreshCcw className="text-white" size={15} />
              </div>
              <p>Update Game</p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-primary p-2 rounded-sm">
                <Plus className="text-white" size={15} />
              </div>
              <p>Add DLC</p>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Page;
