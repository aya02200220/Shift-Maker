"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import SignInBtn from "./SigninBtn";

export default function Navbar() {
  const { status, data: session } = useSession();
  return (
    <div className="p-4 flex justify-between items-center shadow-md">
      <Link className="font-bold text-lg text-blue-700" href={"/"}>
        P7
      </Link>
      {status === "authenticated" ? (
        <div className="flex justify-center items-center gap-3">
          <div>
            Hello! <span className="font-bold">{session?.user?.name}</span>
          </div>
          <button
            onClick={() => signOut()}
            className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm"
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
