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
    <div className="px-4 py-2 flex justify-between items-center shadow-md">
      <Link className="font-bold text-lg text-blue-600" href={"/"}>
        <Image
          className="rounded-full mr-2"
          src="/P7-logo.png"
          width={30}
          height={30}
        />
      </Link>
      {status === "authenticated" ? (
        <div className="flex justify-center items-center gap-2">
          <Image
            className="rounded-full "
            src={session?.user?.image}
            width={30}
            height={30}
          />
          <div className="mr-2">
            <div>
              Hello! <span className="font-bold">{session?.user?.name}</span>
            </div>
            <div className="text-[10px]">{session?.user?.email}</div>
          </div>

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
