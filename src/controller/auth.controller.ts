 import { Request, Response } from 'express';
 import { authorize, signUp} from "../service/auth.service";
 
 
 
 export const loginController = async(req: Request, res: Response) => {
    try{
        const response = await authorize(req,res);
        return res.status(200).json(response);

    }catch(e){
        console.error("Error in authorizeController:", e);
        return res.status(401).json({
            message : "Authorization failed",
        })

    }
 }
 export const signupController = async(req: Request, res: Response) => {
    try{
    const response = await signUp(req,res);
    res.status(201).json({
        message : "User signed up successfully"
    }
    );
    }
    catch(e){
        console.error("Error in signupController:", e);
        return res.status(500).json({message : "Signup failed"})
    }
 }
 