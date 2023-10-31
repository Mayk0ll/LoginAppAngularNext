"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const validate_token_1 = require("./validate-token");
const router = (0, express_1.Router)();
router.get('/', validate_token_1.validateToken, product_controller_1.getAllProducts);
exports.default = router;
