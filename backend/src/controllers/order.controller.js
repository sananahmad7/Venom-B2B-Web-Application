import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

// Create new B2B order
export const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      companyName,
      email,
      phone,
      products,
      businessType,
      notes,
    } = req.body;

    // Validate products and calculate total
    let totalAmount = 0;
    const validatedProducts = [];

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(400).json({
          message: `Product with ID ${item.productId} not found`,
        });
      }

      if (!product.isActive) {
        return res.status(400).json({
          message: `Product ${product.name} is not available`,
        });
      }

      if (product.availableStock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}. Available: ${product.availableStock}, Requested: ${item.quantity}`,
        });
      }

      const price = product.packageInfo.unitPrice;
      const itemTotal = price * item.quantity;
      totalAmount += itemTotal;

      validatedProducts.push({
        product: product._id,
        quantity: item.quantity,
        price: price,
      });
    }

    const newOrder = new Order({
      customerName,
      companyName,
      email,
      phone,
      products: validatedProducts,
      totalAmount,
      businessType,
      notes,
    });

    await newOrder.save();
    await newOrder.populate("products.product");

    res.status(201).json({
      message: "Order submitted successfully",
      order: newOrder,
    });
  } catch (error) {
    console.log("Error in createOrder Controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all orders (admin)
export const getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = {};
    if (status) query.status = status;

    const orders = await Order.find(query)
      .populate("products.product")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const totalOrders = await Order.countDocuments(query);

    res.status(200).json({
      orders,
      totalOrders,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalOrders / limit),
    });
  } catch (error) {
    console.log("Error in getAllOrders Controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get single order by ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id).populate("products.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.log("Error in getOrderById Controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update order status (admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { status, ...(notes && { notes }) },
      { new: true }
    ).populate("products.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.log("Error in updateOrderStatus Controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete order (admin)
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.log("Error in deleteOrder Controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Track order by order number (public)
export const trackOrder = async (req, res) => {
  try {
    const { orderNumber } = req.params;

    const order = await Order.findOne({ orderNumber })
      .populate("products.product")
      .select("-__v");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.log("Error in trackOrder Controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
