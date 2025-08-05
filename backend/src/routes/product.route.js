import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  toggleFeatured,
  getFeaturedProducts,
} from "../controllers/product.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", protectRoute, createProduct);
router.get("/all", getAllProducts);
router.get("/featured", getFeaturedProducts);

router.get("/:id", getProductById);

router.delete("/:id", protectRoute, deleteProduct);

router.patch("/:id/featured", protectRoute, toggleFeatured);

export default router;
