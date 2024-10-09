import { Router } from "express";
import { checkEndpoint } from "../controller/controller_products.js";
import {
    AllProducts, DeleteProduct, addProduct, modifyProduct
} from "../controller/controller_products.js";
import {
    AllSuppliers, addSupplier, deleteSupplier, modidySupplier,
  } from "../controller/controller_suppliers.js";
import { addCategory, AllCategories, deleteCategory, modifyCategory } from "../controller/controller_categories.js";
import { Allcustomers, addCustomer, modifyCustomer, deleteCustomer } from "../controller/controller_customer.js";
  

//products
export const router = Router();
router.get("/products/allProducts", AllProducts);
router.delete("/products/delete/:IdProduct", DeleteProduct);
router.post("/products/addProduct", addProduct);
router.post("/products/update/:id", modifyProduct);

//test
router.get("/suppliers/check", checkEndpoint);


//suppliers
router.get("/suppliers/all", AllSuppliers);
router.post("/suppliers/add", addSupplier);
router.delete("/suppliers/delete/:id", deleteSupplier);
router.post("/suppliers/update/:id", modidySupplier);

//categories
router.get("/categories/all", AllCategories);
router.post("/categories/add", addCategory);
router.delete("/categories/delete/:id", deleteCategory);
router.post("/categories/update/:id", modifyCategory);

//customers
router.get("/customers/all", Allcustomers);
router.post("/customers/add", addCustomer);
router.put("/customers/update/:id", modifyCustomer);
router.delete("/customers/delete/:id", deleteCustomer);






