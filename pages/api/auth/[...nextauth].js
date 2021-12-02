import NextAuth from "next-auth";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import url from "url";
import { urlObjectKeys } from "next/dist/shared/lib/utils";

export default async function handler(req, res) {
  return NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: "Credentials",
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
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
        async authorize(credentials, req) {
          // Add logic here to look up the user from the credentials supplied
          try {
            const res = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}api/v1/users/login`,
              credentials
            );
            const user = res.data.data;
            console.log(res.data.data);

            if (user) {
              // Any object returned will be saved in `user` property of the JWT
              return user;
            }
          } catch (e) {
            // console.log(error);
            // If you return null or false then the credentials will be rejected
            // return null;
            // You can also Reject this callback with an Error or with a URL:
            throw new Error(e.response.data);
            // throw new Error('error message') // Redirect to error page
            // throw '/path/to/redirect'        // Redirect to a URL
          }
        },
      }),
    ],
    callbacks: {
      // Getting the JWT token from API response
      async jwt(token, user) {
        if (url.parse(req.url, true).query.update !== undefined) {
          console.log("token", token);
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}api/v1/users/${token.user.user.id}`,
            {
              headers: {
                Authorization: `Bearer ${token.user.token}`,
              },
            }
          );
          const updatedUser = response.data.data.user;
          console.log("TOKEN", token);
          console.log("UPDATED USER", updatedUser);
          token.user.user = updatedUser;
        }

        if (user) {
          token.accessToken = user.user.token;
          token.user = user;
        }

        // console.log(token);

        return token;
      },

      async session(session, token, user) {
        session.user = token.user.user;
        session.accessToken = token.user.token;
        return session;
      },
    },
    pages: {
      signIn: "/login",
    },
  });
}
