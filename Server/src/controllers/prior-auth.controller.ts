import { Request, Response } from "express";
import PriorAuthorization from "../models/prior-auth.model";

export const createPriorAuthorization = async (req:Request, res:Response) => {
  try {
    const newAuthorization = new PriorAuthorization(req.body);
    const savedAuthorization = await newAuthorization.save();
    res.status(201).json(savedAuthorization);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getAllPriorAuthorizations = async (req:Request, res:Response) => {
  try {
    const authorizations = await PriorAuthorization.find();
    res.status(200).json(authorizations);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updatePriorAuthorizationStatus = async (req:Request, res:Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log(status)
    
    if (!['pending', 'approved', 'denied'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updatedAuthorization = await PriorAuthorization.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedAuthorization) {
      return res.status(404).json({ message: 'Authorization not found' });
    }

    res.status(200).json(updatedAuthorization);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};