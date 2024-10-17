import { Request, Response } from "express";
import UserModel from "../models/user.model";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const auth = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const payload = {
        _id: user._id,
        role: user.role,
      };
  
      const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
     
      return res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };


  export const signup = async (req: Request, res: Response) => {
    try {
      const { email, password, role } = req.body;
  
      const validRoles = ['provider', 'payer'];
      if (!validRoles.includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
      }
  
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new UserModel({
        email,
        password: hashedPassword,
        role,
      });
  
      await newUser.save();
  
      const payload = {
        _id: newUser._id,
        role: newUser.role,
      };
  
      const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  
      return res.status(201).json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

