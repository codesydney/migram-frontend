// import pino from "pino";

// import { getUser, updateUser } from "@/backend/data/users";

// const logger = pino({ name: "Payments Webhook Handler" });

// if (!process.env.NEXT_PUBLIC_CALLS_INCREMENT_AMOUNT)
//   throw new Error("NEXT_PUBLIC_CALLS_INCREMENT_AMOUNT not set");

// const CALLS_INCREMENT_AMOUNT = parseInt(
//   process.env.NEXT_PUBLIC_CALLS_INCREMENT_AMOUNT
// );

// /**
//  * Stripped down version of the Clerk SDK's User type,
//  * so we don't expose sensitive user data.
//  */
// export type FilteredUpdateUserCalls = {
//   id: string;
//   email: string;
//   callsRemaining: number;
// };

// export type UpdateUserCallsResult =
//   | {
//       type: "success";
//       user: FilteredUpdateUserCalls;
//     }
//   | {
//       type: "error";
//       status: number;
//       error: Error;
//     };

// export async function updateUserCalls(
//   userId: string
// ): Promise<UpdateUserCallsResult> {
//   const existingUser = await getUser(userId);
//   if (!existingUser) {
//     const message = "User not found";
//     logger.error({ userId }, message);

//     return { type: "error", status: 404, error: new Error(message) };
//   }

//   const callsRemaining = existingUser.publicMetadata.callsRemaining as number;
//   const newBalance = callsRemaining + CALLS_INCREMENT_AMOUNT;

//   const user = await updateUser(userId, {
//     publicMetadata: {
//       callsRemaining: newBalance,
//     },
//   });

//   const filteredUser: FilteredUpdateUserCalls = {
//     id: user.id,
//     email: user.emailAddresses[0].emailAddress,
//     callsRemaining: user.publicMetadata.callsRemaining as number,
//   };

//   const result = {
//     type: "success" as const,
//     user: filteredUser,
//   };
//   logger.info({ result }, "User Successfully Updated");

//   return result;
// }
