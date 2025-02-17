import { z } from "zod";
import { errorMessages } from "../data/messages";
//schema for signin
export const signin = z.object({
  email: z.string().email({ message: errorMessages.emailMessage }),
  password: z.string().min(8, { message: errorMessages.passwordMessage }),
  // rememverMe: z.boolean().optional(),
});
// Allowed email domains
const allowedEmailDomains = ["gmail.com", "yahoo.com", "outlook.com"];
//schema for signup
export const signup = z
  .object({
    email: z
      .string()
      .email({ message: errorMessages.emailMessage })
      .refine((email) => {
        const domain = email.split("@")[1]; // Extract the domain part of the email
        return allowedEmailDomains.includes(domain); // Check if the domain is allowed
      }, "Only Gmail, Yahoo, and Outlook emails are allowed"),
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
    .nonempty({ message: errorMessages.dateOfBirthMessage })
    .refine((date) => {
      const dob = new Date(date); // Parse the date string
      const today = new Date(); // Get today's date
      return dob <= today; // Ensure the date is not in the future
    }, "Date of birth cannot be in the future")
    .refine((date) => {
      const dob = new Date(date); // Parse the date string
      const today = new Date(); // Get today's date
      const minAgeDate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      ); // Calculate the date 18 years ago
      return dob <= minAgeDate; // Ensure the user is at least 18 years old
    }, "You must be at least 18 years old"),
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
