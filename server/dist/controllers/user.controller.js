"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const newToken = (user) => {
    const { password } = user, payload = __rest(user, ["password"]);
    return jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY || 'other', { expiresIn: '6h' });
};
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (yield user_model_1.User.findOne({ where: { username } }))
            return res.status(404).send('el usuario ya esta registrado');
        if (password.length <= 6)
            return res.status(404).send('la contraseña es muy corta');
        const user = {
            username,
            password: bcrypt_1.default.hashSync(password, 10)
        };
        yield user_model_1.User.create(user);
        res.json({ data: `User ${username} Created! ` });
    }
    catch (error) {
        console.log(error);
        res.send('Ocurrio un error, por favor consulta con el administrador');
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const userFind = yield user_model_1.User.findOne({
            where: { username },
            attributes: ['username', 'password']
        });
        if (!userFind)
            return res.status(404).send('Invalid user');
        const user = userFind.toJSON();
        const pass = bcrypt_1.default.compareSync(password, user.password);
        if (!pass)
            return res.status(404).send('Invalid password');
        res.json({ token: newToken(user) });
    }
    catch (error) {
        console.log(error);
        res.send('Ocurrio un error, por favor consulta con el administrador');
    }
});
exports.loginUser = loginUser;
