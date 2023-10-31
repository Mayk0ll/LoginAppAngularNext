import { Server } from './models/server';
// import dotenv from 'dotenv';
// dotenv.config()

import {config} from 'dotenv';
config();

const server = new Server()