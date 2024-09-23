import { Router } from "express";
import { checkEndpoint } from "../controller/controller_products.js";

import {
    AllProducts, DeleteProduct
} from "../controller/controller_products.js";

import {
    AllSuppliers, addSupplier, deleteSupplier, modidySupplier,
  } from "../controller/controller_suppliers.js";
  //cambiar el nombre del endpoint
  

//products
export const router = Router();
router.get("/products/allProducts", AllProducts);
router.delete("/products/delete/:IDProduct", DeleteProduct);

//test
router.get("/suppliers/check", checkEndpoint);


//suppliers
router.get("/suppliers/all", AllSuppliers);
router.post("/suppliers/add", addSupplier);
router.delete("/suppliers/delete/:id", deleteSupplier);
router.post("/suppliers/update/:id", modidySupplier);







