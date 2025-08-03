import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  trackOrder,
} from "../controllers/order.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes (no authentication required)
router.post("/create", createOrder); // B2B customers can create orders
router.get("/track/:orderNumber", trackOrder); // Public order tracking

// Protected routes (admin only)
router.get("/", protectRoute, getAllOrders); // Get all orders for admin
router.get("/:id", protectRoute, getOrderById); // Get specific order by ID
router.put("/:id/status", protectRoute, updateOrderStatus); // Update order status
router.delete("/:id", protectRoute, deleteOrder); // Delete order

export default router;
