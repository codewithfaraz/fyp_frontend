import { z } from "zod";
import { errorMessages } from "../data/messages";
//schema for signin
export const signin = z.object({
  email: z.string().email({ message: errorMessages.emailMessage }),
  password: z.string().min(8, { message: errorMessages.passwordMessage }),
  // rememverMe: z.boolean().optional(),
});
//schema for signup
export const signup = z
  .object({
    email: z.string().email({ message: errorMessages.emailMessage }),
    username: z.string().nonempty({ message: errorMessages.usernameMessage }),
    password: z.string().min(8, { message: errorMessages.passwordMessage }),
    confirmPassword: z
      .string()
      .min(8, { message: errorMessages.confirmPasswordMessage }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: errorMessages.confirmPasswordMessage,
    path: ["confirmPassword"],
  });
//schema for user profile
export const userProfile = z.object({
  firstName: z.string().nonempty({ message: errorMessages.firstNameMessage }),
  shortBio: z.string().nonempty({ message: "Must enter short Bio" }),
  lastName: z.string().optional(),
  dateOfBirth: z
    .string()
    .nonempty({ message: errorMessages.dateOfBirthMessage }),
  // gender: z.enum(["Male", "Female"], { message: errorMessages.genderMessage }),
});
//schema for contact information
export const contactInformation = z.object({
  phoneNo: z
    .string()
    .nonempty({ message: errorMessages.phoneNumberErrorMessage }),
  country: z.string().nonempty({ message: errorMessages.countryErrorMessage }),
  city: z.string().nonempty({ message: errorMessages.cityErrorMessage }),
  // city: z.string().nonempty({ message: errorMessages.phoneNumberMessage }),
});
export const innovatorFinishForm = z.object({
  experties: z.string().nonempty({ message: errorMessages.expertiesMessage }),
  skills: z.string().nonempty({ message: errorMessages.skillsMessage }),
  experienceLevel: z
    .string()
    .nonempty({ message: errorMessages.experienceLevelMessage }),
});
//schema for profile page of innovator
export const innovatorFinishPage = z.object({
  experience: z.array(z.string()).nonempty("Select at least one expertise."),
  skills: z.array(z.string()).nonempty("Select at least one skill."),
  experienceLevel: z.string().nonempty("Experience level is required."),
});
//zod schema for first step of idea
export const ideaFirstStep = z.object({
  title: z.string().nonempty("Title is required."),
});
//zod schema for second step of idea
export const ideaSecondStep = z.object({
  problemDescription: z.string().nonempty("Required"),
  proposedSolution: z.string().nonempty("Required"),
  innovativeAspects: z.string().nonempty("Required"),
  marketNeeded: z.string().nonempty("Required"),
  targetedAudience: z.string().nonempty("Required"),
  competitiveAnalysis: z.string().nonempty("Required"),
});
//zod schema for final step of idea
export const ideaFinalStep = z.object({
  funds: z.string(),
});
//reset password Schema
export const resetPassword = z.object({
  currentPassword: z
    .string()
    .min(8, { message: errorMessages.passwordMessage }),
  newPassword: z.string().min(8, { message: errorMessages.passwordMessage }),
});
//export types
export type Signin = z.infer<typeof signin>;
export type Signup = z.infer<typeof signup>;
export type InnovatorFinishPage = z.infer<typeof innovatorFinishPage>;
export type UserProfile = z.infer<typeof userProfile>;
export type ContactInformation = z.infer<typeof contactInformation>;
export type IdeaFirstStep = z.infer<typeof ideaFirstStep>;
export type IdeaSecondStep = z.infer<typeof ideaSecondStep>;
export type IdeaFinalStep = z.infer<typeof ideaFinalStep>;
export type ResetPassword = z.infer<typeof resetPassword>;
