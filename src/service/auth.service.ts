import { Request, Response } from "express";
import { createUser, findUserByEmail } from "../respository/user.repository";
import { comparePassword, hashPassword } from "../utils/password";
import { signAccessToken } from "../utils/jwt";



export const authorize = async(req : Request,res:Response) => {
  const { email , password }    = req.body;
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
  const { username , password , role , email} = req.body;
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