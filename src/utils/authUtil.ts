import { Request } from "express";
import { Secret } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();
import JWT from "jsonwebtoken";
import { PayloadInterface } from "../interfaces.td";
export const createToken = (id:number,email:string) => {
  const payload:PayloadInterface = {
    id: id,
    email:email
  };
  const token = JWT.sign(payload, process.env.SECRET as Secret);
  return token;
};

export const validateToken = async (req:Request) => {
  const token = req.get("authorization")?.split(" ")[1];
  const secretKey: Secret = process.env.SECRET as Secret;
  if (!token) {
    throw new Error('Token is not defined');
  }
  const payload = JWT.verify(token, secretKey);
  return payload;
};
  