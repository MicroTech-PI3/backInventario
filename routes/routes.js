import { Router } from "express";

import {
    AllProducts,
} from "../controller/controller.js";


export const router = Router();
router.get("/allProducts", AllProducts);


