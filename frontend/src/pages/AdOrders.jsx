import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Package, Truck, CheckCircle, XCircle, Clock, Calendar, User, CreditCard, MapPin, Trash2 } from 'lucide-react';
import useOrderStore from '../store/useOrderStore';

function AdminOrders() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const {
        orders,
        isLoading,
        fetchOrders,
        updateOrderStatus,
        deleteOrder,
        fetchOrderById,
        clearCurrentOrder
    } = useOrderStore();

    // Fetch orders on component mount
    useEffect(() => {
        fetchOrders(currentPage, statusFilter === 'all' ? '' : statusFilter);
    }, [currentPage, statusFilter, fetchOrders]);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'approved':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'rejected':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'processing':
                return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            case 'shipped':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'delivered':
                return 'bg-green-100 text-green-800 border-green-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return <Clock className="w-4 h-4" />;
            case 'approved':
                return <CheckCircle className="w-4 h-4" />;
            case 'rejected':
                return <XCircle className="w-4 h-4" />;
            case 'processing':
                return <Package className="w-4 h-4" />;
            case 'shipped':
                return <Truck className="w-4 h-4" />;
            case 'delivered':
                return <CheckCircle className="w-4 h-4" />;
            default:
                return <Clock className="w-4 h-4" />;
        }
    };

    const filteredOrders = orders.filter(order => {
        if (!order) return false;

        const matchesSearch =
            order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.companyName?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || order.status?.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    const handleStatusChange = async (orderId, newStatus) => {
        const success = await updateOrderStatus(orderId, newStatus);
        if (success) {
            // Refresh orders after successful update
            fetchOrders(currentPage, statusFilter === 'all' ? '' : statusFilter);
        }
    };

    const handleDeleteOrder = async (orderId) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            const success = await deleteOrder(orderId);
            if (success) {
                // Refresh orders after successful deletion
                fetchOrders(currentPage, statusFilter === 'all' ? '' : statusFilter);
                setSelectedOrder(null);
            }
        }
    };

    const handleViewOrder = async (order) => {
        // If we have full order details, use them; otherwise fetch full details
        if (order.products && order.products.length > 0 && order.products[0].product) {
            setSelectedOrder(order);
        } else {
            const fullOrder = await fetchOrderById(order._id);
            if (fullOrder) {
                setSelectedOrder(fullOrder);
            }
        }
    };

    const getOrderStats = () => {
        return {
            total: orders.length,
            pending: orders.filter(o => o.status?.toLowerCase() === 'pending').length,
            processing: orders.filter(o => o.status?.toLowerCase() === 'processing').length,
            delivered: orders.filter(o => o.status?.toLowerCase() === 'delivered').length,
            approved: orders.filter(o => o.status?.toLowerCase() === 'approved').length,
            shipped: orders.filter(o => o.status?.toLowerCase() === 'shipped').length
        };
    };

    const stats = getOrderStats();

    const handleStatusFilterChange = (newStatus) => {
        setStatusFilter(newStatus);
        setCurrentPage(1); // Reset to first page when changing filter
    };

    if (isLoading && orders.length === 0) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading orders...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md mb-6 p-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Management</h1>

                    {/* Search and Filter */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by order number, customer name, email, or company..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            />
                        </div>

                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                value={statusFilter}
                                onChange={(e) => handleStatusFilterChange(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                            </select>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                        <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-lg text-white">
                            <h3 className="text-sm font-medium">Total Orders</h3>
                            <p className="text-2xl font-bold">{stats.total}</p>
                        </div>
                        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 rounded-lg text-white">
                            <h3 className="text-sm font-medium">Pending</h3>
                            <p className="text-2xl font-bold">{stats.pending}</p>
                        </div>
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
                            <h3 className="text-sm font-medium">Approved</h3>
                            <p className="text-2xl font-bold">{stats.approved}</p>
                        </div>
                        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-4 rounded-lg text-white">
                            <h3 className="text-sm font-medium">Processing</h3>
                            <p className="text-2xl font-bold">{stats.processing}</p>
                        </div>
                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white">
                            <h3 className="text-sm font-medium">Shipped</h3>
                            <p className="text-2xl font-bold">{stats.shipped}</p>
                        </div>
                        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
                            <h3 className="text-sm font-medium">Delivered</h3>
                            <p className="text-2xl font-bold">{stats.delivered}</p>
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {filteredOrders.length === 0 ? (
                        <div className="p-8 text-center">
                            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg">No orders found</p>
                            {searchTerm && (
                                <p className="text-gray-400 text-sm mt-2">
                                    Try adjusting your search terms or filters
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Order Details
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Customer
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredOrders.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{order.orderNumber}</div>
                                                    <div className="text-sm text-gray-500">{order.products?.length || 0} item(s)</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                                                    <div className="text-sm text-gray-500">{order.companyName}</div>
                                                    <div className="text-sm text-gray-400">{order.email}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                                    {getStatusIcon(order.status)}
                                                    <span className="ml-1 capitalize">{order.status}</span>
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                ${order.totalAmount?.toFixed(2) || '0.00'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex items-center">
                                                    <Calendar className="w-4 h-4 mr-1" />
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => handleViewOrder(order)}
                                                        className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                                                        title="View Order"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                        className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-red-500 focus:border-red-500 min-w-[100px]"
                                                        disabled={isLoading}
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Approved">Approved</option>
                                                        <option value="Rejected">Rejected</option>
                                                        <option value="Processing">Processing</option>
                                                        <option value="Shipped">Shipped</option>
                                                        <option value="Delivered">Delivered</option>
                                                    </select>
                                                    <button
                                                        onClick={() => handleDeleteOrder(order._id)}
                                                        className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                                                        title="Delete Order"
                                                        disabled={isLoading}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Order Details Modal */}
                {selectedOrder && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold text-gray-900">Order Details - {selectedOrder.orderNumber}</h2>
                                    <button
                                        onClick={() => setSelectedOrder(null)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <XCircle className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    {/* Customer Information */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                                            <User className="w-5 h-5 mr-2" />
                                            Customer Information
                                        </h3>
                                        <div className="space-y-2">
                                            <p><span className="font-medium">Name:</span> {selectedOrder.customerName}</p>
                                            <p><span className="font-medium">Company:</span> {selectedOrder.companyName}</p>
                                            <p><span className="font-medium">Email:</span> {selectedOrder.email}</p>
                                            <p><span className="font-medium">Phone:</span> {selectedOrder.phone}</p>
                                            {selectedOrder.businessType && (
                                                <p><span className="font-medium">Business Type:</span> {selectedOrder.businessType}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Order Information */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                                            <Package className="w-5 h-5 mr-2" />
                                            Order Information
                                        </h3>
                                        <div className="space-y-2">
                                            <p><span className="font-medium">Order Number:</span> {selectedOrder.orderNumber}</p>
                                            <p><span className="font-medium">Order Date:</span> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                                            <p><span className="font-medium">Status:</span>
                                                <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                                                    {getStatusIcon(selectedOrder.status)}
                                                    <span className="ml-1 capitalize">{selectedOrder.status}</span>
                                                </span>
                                            </p>
                                            <p><span className="font-medium">Total:</span> ${selectedOrder.totalAmount?.toFixed(2) || '0.00'}</p>
                                            {selectedOrder.notes && (
                                                <p><span className="font-medium">Notes:</span> {selectedOrder.notes}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="mt-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">Order Items</h3>
                                    <div className="bg-gray-50 rounded-lg overflow-hidden">
                                        <table className="min-w-full">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Product</th>
                                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Quantity</th>
                                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Price</th>
                                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {selectedOrder.products?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="px-4 py-2 text-sm text-gray-900">
                                                            {item.product?.name || 'Product Name Not Available'}
                                                        </td>
                                                        <td className="px-4 py-2 text-sm text-gray-900">{item.quantity}</td>
                                                        <td className="px-4 py-2 text-sm text-gray-900">${item.price?.toFixed(2) || '0.00'}</td>
                                                        <td className="px-4 py-2 text-sm text-gray-900 font-medium">
                                                            ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                                                        </td>
                                                    </tr>
                                                ))}
                                                <tr className="bg-gray-100 font-medium">
                                                    <td colSpan="3" className="px-4 py-2 text-sm text-gray-900 text-right">Total Amount:</td>
                                                    <td className="px-4 py-2 text-sm text-gray-900">${selectedOrder.totalAmount?.toFixed(2) || '0.00'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-between">
                                    <button
                                        onClick={() => handleDeleteOrder(selectedOrder._id)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center"
                                        disabled={isLoading}
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete Order
                                    </button>
                                    <button
                                        onClick={() => setSelectedOrder(null)}
                                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Loading Overlay */}
                {isLoading && (
                    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500"></div>
                            <span className="text-gray-700">Processing...</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminOrders;