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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express = require("express");
const product_1 = __importDefault(require("../routes/product"));
const user_1 = __importDefault(require("../routes/user"));
const product_model_1 = require("./product.model");
const user_model_1 = require("./user.model");
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.dbConnect();
        this.midlewares();
        this.routes();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server habilitado ${this.port}`);
        });
    }
    routes() {
        this.app.use('/api/products', product_1.default);
        this.app.use('/api/user', user_1.default);
    }
    midlewares() {
        this.app.use(express.json());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield product_model_1.Product.sync();
                yield user_model_1.User.sync();
                console.log('Connection complete');
            }
            catch (error) {
                console.log('Connection Error ' + error);
            }
        });
    }
}
exports.Server = Server;
