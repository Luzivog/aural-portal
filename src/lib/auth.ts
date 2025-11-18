import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";

import { sendOtpEmail, sendPasswordResetEmail } from "./email";
import { mongoClient } from "./mongoClient";

const googleCloudId = process.env.GOOGLE_CLOUD_ID;
const googleCloudSecret = process.env.GOOGLE_CLOUD_SECRET;

if (!googleCloudId || !googleCloudSecret) {
  throw new Error("GOOGLE_CLOUD_ID and GOOGLE_CLOUD_SECRET must be set");
}

export const auth = betterAuth({
  database: mongodbAdapter(mongoClient.db("auth"), { client: mongoClient }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendPasswordResetEmail({ email: user.email, url });
    },
  },

  socialProviders: {
    google: {
      clientId: googleCloudId,
      clientSecret: googleCloudSecret
    },
  },

  emailVerification: {
    autoSignInAfterVerification: true,
  },

  plugins: [
    emailOTP({
      overrideDefaultEmailVerification: true,
      sendVerificationOTP: async ({ email, otp, type }) => {
        await sendOtpEmail({ email, otp, type });
      },
    }),

    // must be last plugin
    nextCookies(),
  ],
});
