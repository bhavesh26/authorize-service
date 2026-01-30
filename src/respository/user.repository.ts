import sql from "../config/dbConfig";

export interface User {
    id: string;
    userName: string;
    password: string;
    role: string;
  }
  
  export const findUserByEmail = async (
    email: string
  ):Promise<User | null> => {
    try {
        const user = await sql`SELECT * FROM "User" where email = ${email} LIMIT 1` as  User[];
        return user[0] ?? null
    }catch(e){
        throw new Error(e as unknown as string);

    }
    
  };

  export const createUser = async (username:string , hashedPassword:string , role:string , email:string) => {
    try {
        const user  = sql`INSERT INTO "User" (username, password, role, email) VALUES (${username}, ${hashedPassword}, ${role}, ${email})`;
        return user;

    }catch(e){
       
        throw new Error(e as unknown as string);
    }
  }