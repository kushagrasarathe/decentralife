"use client";

import React from "react";
import AuthModal from "../auth/AuthModal";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className=" flex items-center justify-around py-4">
      <Link href={"/"}>
        <h1 className="  cursor-pointer font-bold sm:text-3xl text-gray-300 text-2xl leading-none text-center ">
          {/* block */}
          decentra
          <span
            className="!bg-clip-text text-transparent "
            style={{
              background:
                "linear-gradient(73.59deg, #C339AC 42.64%, #CD4CB5 54%, #E173C7 77.46%)",
            }}
          >
            {/* Book */}
            Life
          </span>
        </h1>
      </Link>
      <AuthModal />
    </div>
  );
}
