// this file content signinschema

import { z } from "zod";

export const SigninSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be contain atleast 8 charecter" }),
});

export type SigninType = z.infer<typeof SigninSchema>;
