"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.auth = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const payload = {
            _id: user._id,
            role: user.role,
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ token });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.auth = auth;
const signup = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const validRoles = ['provider', 'payer'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }
        const existingUser = await user_model_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const newUser = new user_model_1.default({
            email,
            password: hashedPassword,
            role,
        });
        await newUser.save();
        const payload = {
            _id: newUser._id,
            role: newUser.role,
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(201).json({ token });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.signup = signup;
