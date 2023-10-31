import { Router } from "express";
import { getAllProducts } from "../controllers/product.controller";
import { validateToken } from "./validate-token";

const router = Router();

router.get('/', validateToken, getAllProducts)

export default router;