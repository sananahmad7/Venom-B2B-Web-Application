import Product from "../models/product.model.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      sku,
      description,
      category,
      packageInfo,
      availableStock,
      image,
      isFeatured,
    } = req.body;

    // Check if SKU already exists
    const existingProduct = await Product.findOne({ sku });
    if (existingProduct) {
      return res.status(400).json({ message: "SKU already exists" });
    }

    let cloudinaryResponse = null;

    // if (image) {
    //   cloudinaryResponse = await cloudinary.uploader.upload(image, {
    //     folder: "products",
    //   });
    // }

    const newProduct = new Product({
      name,
      sku,
      description,
      category,
      packageInfo,
      availableStock,
      image: cloudinaryResponse?.secure_url || "",
      isFeatured: isFeatured || false,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.log("Error in createProduct Controller", error.message);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
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

export const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({
      isFeatured: true,
    }).sort({ createdAt: -1 });

    res.status(200).json(featuredProducts);
  } catch (error) {
    console.log("Error in getFeaturedProducts Controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
