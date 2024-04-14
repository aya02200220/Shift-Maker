"use client";
import { SessionProvider } from "next-auth/react";
import { NextAuth } from "next-auth/next";

export const NextAuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
