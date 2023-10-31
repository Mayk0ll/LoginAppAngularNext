import {Request, Response} from 'express';
import { Product } from '../models/product.model';


export const getAllProducts = async (req: Request, res: Response) => {
    const listProducts = await Product.findAll();
    res.json(listProducts)
}