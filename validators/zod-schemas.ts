import { z } from "zod";
import { errorMessages } from "@/data/messages";
export const signin = z.object({
  email: z.string().email({ message: errorMessages.emailMessage }),
  password: z.string().min(8, { message: errorMessages.passwordMessage }),
  rememverMe: z.boolean().optional(),
});
export const signup = z
  .object({
    email: z.string().email({ message: errorMessages.emailMessage }),
    password: z.string().min(8, { message: errorMessages.passwordMessage }),
    confirmPassword: z
      .string()
      .min(8, { message: errorMessages.confirmPasswordMessage }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: errorMessages.confirmPasswordMessage,
    path: ["confirmPassword"],
  });
  export const forget = z.object({
    email: z.string().email({ message: errorMessages.emailMessage }),
    pinCode:z.string().min(1,{message:errorMessages.pinCodeMessage}),
  });
export type Forget=z.infer<typeof forget>;
export type Signin = z.infer<typeof signin>;
export type Signup = z.infer<typeof signup>;
