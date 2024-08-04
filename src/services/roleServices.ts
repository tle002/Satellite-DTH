import { UserInterface } from "./../interfaces.td";
import { Request, Response } from "express";

import bcrypt from "bcryptjs";
import { User } from "../entity/User";
import { createToken } from "../utils/authUtil";
import { appDataSource } from "../dataSource";
const curr_User = appDataSource.getRepository(User);

export const registerService = async (req: Request, res: Response) => {
  const { name, email, password, cPassword, mobile_number, role, active } =
    req.body;
  try {
    if (password !== cPassword) {
      res
        .status(400)
        .send({ message: "Password and Confirm password does not match" });
    }

    const existingUserEmail = await curr_User.findOneBy({
      email,
    });
    if (existingUserEmail) {
      res.status(409).send({ message: "Email already register" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = curr_User.create({
      name,
      email,
      password: hashPassword,
      mobile_number,
      role,
      active,
    });

    const saveUser = await appDataSource.manager.save(user);

    if (!saveUser) {
      res.status(404).json({ message: "Not found" });
    }
    return saveUser;
  } catch (error) {
    console.error(error);
  }
};

export const loginService = async (
  email: string,
  password: string,
  res: Response
) => {
  const user = await curr_User.findOneBy({
    email,
  });

  if (!user) {
    return res.status(404).json({ message: "Not found" });
  }
  const result = bcrypt.compare(password, user.password);
  if (!result) {
    return res.status(404).json({ message: "Wrong password" });
  } else {
    const access_token = createToken(user.id, user.email);
    return access_token;
  }
};

export const get1Service = async (id: number) => {
  const user = await curr_User.findOneBy({
    id,
  });
  return user;
};
