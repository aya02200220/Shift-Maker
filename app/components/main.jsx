"use client";

import Image from "next/image";
import SignInBtn from "./SignInBtn";
import { useSession } from "next-auth/react";

export default function Main() {
  const { status, data: session } = useSession();

  if (status === "authenticated") {
    return (
      <div className="flex flex-col mt-4">
        <div>
          <div>hello</div>
        </div>

        <div className="mt-2 shadow-xl p-8 rounded-md flex flex-col gap-3 bg-yellow-200">
          <Image
            className="rounded-full"
            src={session?.user?.image}
            width={60}
            height={60}
          />
          <div>
            Name: <span className="font-bold">{session?.user?.name}</span>
          </div>
          <div>
            Email: <span className="font-bold">{session?.user?.email}</span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="text-[30px] font-semibold  text-stone-400">
          Login to Get to Work!!
        </div>
      </>
    );
  }
}
