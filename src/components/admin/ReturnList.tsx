"use client";
import React from "react";

import { ReturnListTable } from "./ReturnListTable";

export default function ReturnsList() {
  return (
    <div className="max-w-full p-4  bg-white mx-auto rounded-sm border">
      <h1 className="text-2xl font-bold mb-8">Returns</h1>
      <div className="my-5 ">
        <ReturnListTable />
      </div>
    </div>
  );
}
