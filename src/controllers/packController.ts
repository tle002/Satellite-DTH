import { Request, Response } from "express";
import { appDataSource } from "../dataSource";

import { deletePackageServices, get1PackageServices, addPackageServices } from "../services/packServices";
import { Package } from "../entity/Package";
const curr_Package = appDataSource.getRepository(Package);

export const addPackage = async (req:Request, res:Response) => {
  try{
    const Package= await addPackageServices(req);
    return res.status(201).json({ message: "Package Added Successfully",Package });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getSinglePackage = async (req:Request, res:Response) => {
 try{ 
  const {id}=req.params;
  const Package=await get1PackageServices(+id);

    return res
      .status(200)
      .json({ message: "Package Retreive Sucessfully", Package });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getAllPackage = async (req:Request, res:Response) => {
  try {
    const Packages = await curr_Package.find();
    if (!Packages) {
      return res.status(404).json({ message: "Package not found " });
    }
    return res
      .status(200)
      .json({ message: "Packages Retreive Sucessfully", Packages });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const deletePackage = async (req:Request, res:Response) => {
  try {
    const {id}=req.params;
    const Package=await deletePackageServices(+id);
    return res
      .status(200)
      .json({ message: "Packages Deleted Sucessfully", Package });
  } catch (error) {
    console.error(error);
  }
};

