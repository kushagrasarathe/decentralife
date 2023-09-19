"use client";

import React from "react";
import AuthModal from "../auth/AuthModal";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className=" flex items-center justify-between w-8/12 mx-auto py-4">
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
      <div className=" flex items-center gap-x-3 ">
        <Link className="  text-base font-semibold" href={"/"}>Home</Link>
        <Link className="  text-base font-semibold" href={"/create"}>Create Profile</Link>
        <Link className="  text-base font-semibold" href={"/myprofile"}>My Profile</Link>
        <AuthModal />
      </div>
    </div>
  );
}
