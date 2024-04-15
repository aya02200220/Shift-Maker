"use client";

import Link from "next/link";
import Image from "next/image";

import { signIn, signOut, useSession } from "next-auth/react";
import SignInBtn from "./SigninBtn";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function Navbar() {
  const { status, data: session } = useSession();
  return (
    <div className="p-4 flex justify-between items-center shadow-md">
      <Link className="font-bold text-lg text-blue-700" href={"/"}>
        <Image
          className="rounded-full mr-2"
          src="/P7-logo.png"
          width={30}
          height={30}
        />
      </Link>
      {status === "authenticated" ? (
        <div className="flex justify-center items-center gap-2">
          <div>
            <div>
              Hello! <span className="font-bold">{session?.user?.name}</span>
            </div>
            <div className="text-[10px]">{session?.user?.email}</div>
          </div>
          <Image
            className="rounded-full mr-2"
            src={session?.user?.image}
            width={30}
            height={30}
          />
          <button
            onClick={() => signOut()}
            className="bg-slate-900 text-white px-3 py-1 rounded-md text-[12px]"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <SignInBtn />
      )}
    </div>
  );
}
