import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SIGN_IN, SIGN_UP } from "@graphql/queries";
import { apolloClient } from "@graphql/client";

export default NextAuth({
  secret: "randomString",
  providers: [
    CredentialsProvider({
      credentials: {
        name: { label: "Name", type: "text", placeholder: "Name" },
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async ({ email, password, name }: any, req) => {
        if (!name) {
          const res = await apolloClient.query({
            query: SIGN_IN,
            variables: {
              email,
              password,
            },
          });

          if (res.data.error) {
            return null;
          }

          if (res.data && res.data.signIn && !res.data.error) {
            return res.data.signIn;
          }
        }

        const res = await apolloClient.mutate({
          mutation: SIGN_UP,
          variables: {
            name,
            email,
            password,
          },
        });

        if (res.data.error) {
          return null;
        }

        return res.data.signUp;
      },
    }),
  ],
});
