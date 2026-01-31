import { Request, Response } from "express";
import { createUser, findUserByEmail } from "../respository/user.repository";
import { comparePassword, hashPassword } from "../utils/password";
import { signAccessToken } from "../utils/jwt";
import { safeParse } from "zod";
import { loginSchema, signupSchema } from "../schemas/auth.schema";
import { parse } from "dotenv";



export const authorize = async(req : Request,res:Response) => {
  const parsedBody = loginSchema.safeParse(req.body)
  console.log(parsedBody)
  if (!parsedBody.success) {
    throw new Error("INVALID_CREDINTIALS");
  }
  const { email , password }    = parsedBody.data;
  const user = await findUserByEmail(email);
 
  if(!user){
    throw new Error("INVALID_CREDINTIALS");
  }
  const isPasswordValid = await comparePassword(password , user?.password)
  console.log(isPasswordValid)
  if(!isPasswordValid){
    throw new Error("INVALID_CREDINTIALS");
  }
  const accessToken = signAccessToken({
    userId: user.id,
    role: user.role,
  });

  return {
    accessToken,
  };

}

export const signUp = async(req:Request,res:Response) => {
  const parsedBody = signupSchema.safeParse(req.body)
  if (!parsedBody.success) {
    throw new Error("INVALID_CREDINTIALS");
  }
  const { username , password , role , email} = parsedBody.data;
  try{
  const hashedPassword =  await hashPassword(password);
  console.log(hashedPassword , password)
  const user = await createUser(username , hashedPassword , role , email);
  return user;
}
  catch(e){
    console.log("Error in signUp service:", e);
    throw new Error("PASSWORD_HASHING_FAILED");
  }

}