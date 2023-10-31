"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    if (!headerToken && !(headerToken === null || headerToken === void 0 ? void 0 : headerToken.startsWith('Bearer')))
        return res.status(401).json({ data: 'Token invalid!' });
    try {
        jsonwebtoken_1.default.verify(headerToken.slice(7), process.env.SECRET_KEY || 'other');
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ data: 'Token invalid!' });
    }
};
exports.validateToken = validateToken;
