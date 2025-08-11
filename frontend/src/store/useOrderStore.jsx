import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const useOrderStore = create((set, get) => ({
    // State
    orders: [],
    currentOrder: null,
    isLoading: false,
    isCreating: false,

    // Create Order
    createOrder: async (orderData) => {
        set({ isCreating: true });
        try {
            const response = await axiosInstance.post("orders/create", orderData);

            set((state) => ({
                orders: [response.data.order, ...state.orders],
            }));

            toast.success("Order submitted successfully!");
            return {
                success: true,
                order: response.data.order,
            };
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to submit order";
            toast.error(errorMessage);
            return {
                success: false,
                error: errorMessage,
            };
        } finally {
            set({ isCreating: false });
        }
    },

    // Get All Orders (Admin)
    fetchOrders: async (page = 1, status = "") => {
        set({ isLoading: true });
        try {
            const params = new URLSearchParams({ page: page.toString() });
            if (status) params.append("status", status);

            const response = await axiosInstance.get(`orders?${params}`);

            set({ orders: response.data.orders });
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch orders");
            return null;
        } finally {
            set({ isLoading: false });
        }
    },

    // Get Single Order
    fetchOrderById: async (orderId) => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get(`orders/${orderId}`);
            set({ currentOrder: response.data });
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch order");
            return null;
        } finally {
            set({ isLoading: false });
        }
    },

    // Track Order by Order Number (Public)
    trackOrder: async (orderNumber) => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get(`orders/track/${orderNumber}`);
            return {
                success: true,
                order: response.data,
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || "Order not found",
            };
        } finally {
            set({ isLoading: false });
        }
    },

    // Update Order Status (Admin)
    updateOrderStatus: async (orderId, status, notes = "") => {
        try {
            const response = await axiosInstance.put(`orders/${orderId}/status`, {
                status,
                notes,
            });

            set((state) => ({
                orders: state.orders.map((order) =>
                    order._id === orderId ? response.data.order : order
                ),
                currentOrder: state.currentOrder?._id === orderId ? response.data.order : state.currentOrder,
            }));

            toast.success("Order status updated successfully");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update order");
            return false;
        }
    },

    // Delete Order (Admin)
    deleteOrder: async (orderId) => {
        try {
            await axiosInstance.delete(`orders/${orderId}`);

            set((state) => ({
                orders: state.orders.filter((order) => order._id !== orderId),
            }));

            toast.success("Order deleted successfully");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete order");
            return false;
        }
    },

    // Clear Current Order
    clearCurrentOrder: () => {
        set({ currentOrder: null });
    },
}));

export default useOrderStore