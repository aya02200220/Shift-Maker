// import { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/user";
// import NextAuth from "next-auth/next";
// import GoogleProvider from "next-auth/providers/google";

// const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account }) {
//       if (account.provider === "google") {
//         const { name, email } = user;
//         try {
//           await connectMongoDB();
//           const userExists = await User.findOne({ email });

//           if (!userExists) {
//             const res = await fetch("http://localhost:3000/api/user", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({
//                 name,
//                 email,
//               }),
//             });

//             if (res.ok) {
//               return user;
//             }
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       }

//       return user;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      console.log("Sign in callback triggered");
      if (account.provider === "google") {
        const { name, email } = user;
        try {
          console.log("Connecting to MongoDB...");
          await connectMongoDB();
          console.log("Checking if user exists...");
          const userExists = await User.findOne({ email });

          if (!userExists) {
            console.log("User does not exist. Creating new user...");
            const res = await fetch("http://localhost:3000/api/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
              }),
            });

            if (res.ok) {
              console.log("User created successfully.");
              return user;
            } else {
              console.log("Failed to create user.");
            }
          } else {
            console.log("User already exists.");
          }
        } catch (error) {
          console.error("Error during sign-in process:", error);
        }
      } else {
        console.log("Account provider is not Google.");
      }

      return user;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
