import { z } from "zod";
import { errorMessages } from "@/data/messages";
export const signin = z.object({
  email: z.string().email({ message: errorMessages.emailMessage }),
  password: z.string().min(8, { message: errorMessages.passwordMessage }),
  rememverMe: z.boolean().optional(),
});
export const signup=z.object({
  email: z.string().email({ message: errorMessages.emailMessage }),
  password: z.string().min(8, { message: errorMessages.passwordMessage }),
  confirmPassword:z.string().min(8,{message:errorMessages.confirmPasswordMessage}),
})
export type Signin = z.infer<typeof signin>;
export type Signup = z.infer<typeof signup>;
