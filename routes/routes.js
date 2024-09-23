import { Router } from "express";
import { checkEndpoint } from "../controller/controller_products.js";

import {
    AllProducts, DeleteProduct
} from "../controller/controller_products.js";

import {
    AllSuppliers, addSupplier, deleteSupplier, modidySupplier, AllProducts
  } from "../controller/controller_suppliers.js";
  //cambiar el nombre del endpoint
  

export const router = Router();
router.get("/allProducts", AllProducts);
router.delete("/product/:IDProduct", DeleteProduct);

//test
router.get("/check", checkEndpoint);

//suppliers
router.get("/suppliers/all", AllSuppliers);
router.post("/suppliers/add", addSupplier);
router.delete("/suppliers/delete/:id", deleteSupplier);
router.post("/suppliers/update/:id", modidySupplier);
router.get("/suppliers/allProducts", AllProducts);






