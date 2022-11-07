import NextAuth from "next-auth";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email address",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}api/v1/users/login`,
            credentials
          );
          const user = data.data.user;
          user.token = data.data.token;

          return user;
        } catch (e: any) {
          throw new Error(e.response.data);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        delete user.token;
        token.user = user;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
