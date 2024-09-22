import { Router } from "express";
import { checkEndpoint } from "../controller/controller.js";

import {
    /* AllProducts, DeleteProduct */
} from "../controller/controller.js";


export const router = Router();
/* router.get("/allProducts", AllProducts);
router.delete("/product/:IDProduct", DeleteProduct); */

router.get("/check", checkEndpoint);


