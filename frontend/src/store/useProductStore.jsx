import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";

const useProductStore = create((set, get) => ({
    products: [],
    isLoading: false,
    isCreating: false,

    // Create Product
    createProduct: async (productData) => {
        set({ isCreating: true });
        try {
            const response = await axiosInstance.post("products/create", productData);
            set((state) => ({
                products: [response.data, ...state.products],
            }));
            toast.success("Product created successfully");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create product");
            return false;
        } finally {
            set({ isCreating: false });
        }
    },

    // Get All Products
    getAllProducts: async () => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get("products/all");
            set({ products: response.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch products");
        } finally {
            set({ isLoading: false });
        }
    },

    // Delete Product
    deleteProduct: async (productId) => {
        try {
            await axiosInstance.delete(`products/${productId}`);
            set((state) => ({
                products: state.products.filter((product) => product._id !== productId),
            }));
            toast.success("Product deleted successfully");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete product");
            return false;
        }
    },

    // Toggle Featured
    toggleFeatured: async (productId) => {
        try {
            const response = await axiosInstance.patch(`products/${productId}/featured`);
            set((state) => ({
                products: state.products.map((product) =>
                    product._id === productId ? response.data : product
                ),
            }));
            toast.success("Product updated successfully");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update product");
            return false;
        }
    },
}));

export default useProductStore;