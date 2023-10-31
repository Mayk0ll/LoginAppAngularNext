"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./models/server");
// import dotenv from 'dotenv';
// dotenv.config()
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const server = new server_1.Server();
