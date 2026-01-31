import { z } from "zod";

const email = z.string().trim().toLowerCase().email();
const password = z.string().trim()
const role = z.string().trim().toLowerCase();
const username = z.string().trim()

export const signupSchema = z.object({
  email,
  password,
  role,
  username
});

export const loginSchema = z.object({
  email,
  password,
});



export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
