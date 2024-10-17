"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            res.status(401).json({ message: 'Access denied. No token provided.' });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await user_model_1.default.findOne({ _id: decoded._id, role: decoded.role });
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }
        next();
    }
    catch (error) {
        console.error('Authorization error:', error);
        res.status(400).json({ message: 'Invalid token.' });
    }
};
exports.default = authMiddleware;
