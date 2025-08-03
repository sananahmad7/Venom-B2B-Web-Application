import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      sku,
      description,
      category,
      packageInfo,
      availableStock,
      images,
      isFeatured,
    } = req.body;

    // Check if SKU already exists
    const existingProduct = await Product.findOne({ sku });
    if (existingProduct) {
      return res.status(400).json({ message: "SKU already exists" });
    }

    const newProduct = new Product({
      name,
      sku,
      description,
      category,
      packageInfo,
      availableStock,
      images: images || [],
      isFeatured: isFeatured || false,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.log("Error in createProduct Controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.log("Error in getAllProducts Controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log("Error in getProductById Controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProduct Controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const toggleFeatured = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.isFeatured = !product.isFeatured;
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    console.log("Error in toggleFeatured Controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
