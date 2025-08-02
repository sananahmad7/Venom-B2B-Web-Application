import React, { useState } from 'react';
import { Search, Filter, Eye, Package, Truck, CheckCircle, XCircle, Clock, Calendar, User, CreditCard, MapPin } from 'lucide-react';

function AdminOrders() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Mock data - replace with actual API call
    const mockOrders = [
        {
            id: 'ORD-001',
            customerName: 'John Smith',
            email: 'john.smith@email.com',
            phone: '+1 234 567 8900',
            orderDate: '2024-08-01',
            status: 'delivered',
            total: 299.99,
            items: [
                { name: 'Combat Gloves Pro', quantity: 1, price: 89.99 },
                { name: 'Training Shorts Elite', quantity: 2, price: 105.00 }
            ],
            shippingAddress: {
                street: '123 Main St',
                city: 'New York',
                state: 'NY',
                zip: '10001',
                country: 'USA'
            },
            paymentMethod: 'Credit Card (**** 4532)'
        },
        {
            id: 'ORD-002',
            customerName: 'Sarah Johnson',
            email: 'sarah.j@email.com',
            phone: '+1 234 567 8901',
            orderDate: '2024-08-02',
            status: 'processing',
            total: 149.99,
            items: [
                { name: 'MMA Headgear', quantity: 1, price: 149.99 }
            ],
            shippingAddress: {
                street: '456 Oak Ave',
                city: 'Los Angeles',
                state: 'CA',
                zip: '90210',
                country: 'USA'
            },
            paymentMethod: 'PayPal'
        },
        {
            id: 'ORD-003',
            customerName: 'Mike Wilson',
            email: 'mike.wilson@email.com',
            phone: '+1 234 567 8902',
            orderDate: '2024-08-01',
            status: 'shipped',
            total: 449.97,
            items: [
                { name: 'Heavy Bag Pro', quantity: 1, price: 299.99 },
                { name: 'Hand Wraps Set', quantity: 3, price: 49.99 }
            ],
            shippingAddress: {
                street: '789 Pine St',
                city: 'Chicago',
                state: 'IL',
                zip: '60601',
                country: 'USA'
            },
            paymentMethod: 'Credit Card (**** 1234)'
        },
        {
            id: 'ORD-004',
            customerName: 'Emily Davis',
            email: 'emily.davis@email.com',
            phone: '+1 234 567 8903',
            orderDate: '2024-08-02',
            status: 'pending',
            total: 199.98,
            items: [
                { name: 'Combat Shorts', quantity: 2, price: 99.99 }
            ],
            shippingAddress: {
                street: '321 Elm St',
                city: 'Miami',
                state: 'FL',
                zip: '33101',
                country: 'USA'
            },
            paymentMethod: 'Credit Card (**** 9876)'
        }
    ];

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'processing':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'shipped':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'delivered':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return <Clock className="w-4 h-4" />;
            case 'processing':
                return <Package className="w-4 h-4" />;
            case 'shipped':
                return <Truck className="w-4 h-4" />;
            case 'delivered':
                return <CheckCircle className="w-4 h-4" />;
            case 'cancelled':
                return <XCircle className="w-4 h-4" />;
            default:
                return <Clock className="w-4 h-4" />;
        }
    };

    const filteredOrders = mockOrders.filter(order => {
        const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleStatusChange = (orderId, newStatus) => {
        // In real app, make API call to update order status
        console.log(`Updating order ${orderId} to status: ${newStatus}`);
    };

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
                                placeholder="Search by order ID, customer name, or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            />
                        </div>

                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-lg text-white">
                            <h3 className="text-sm font-medium">Total Orders</h3>
                            <p className="text-2xl font-bold">{mockOrders.length}</p>
                        </div>
                        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 rounded-lg text-white">
                            <h3 className="text-sm font-medium">Pending</h3>
                            <p className="text-2xl font-bold">{mockOrders.filter(o => o.status === 'pending').length}</p>
                        </div>
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
                            <h3 className="text-sm font-medium">Processing</h3>
                            <p className="text-2xl font-bold">{mockOrders.filter(o => o.status === 'processing').length}</p>
                        </div>
                        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
                            <h3 className="text-sm font-medium">Delivered</h3>
                            <p className="text-2xl font-bold">{mockOrders.filter(o => o.status === 'delivered').length}</p>
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{order.id}</div>
                                                <div className="text-sm text-gray-500">{order.items.length} item(s)</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                                                <div className="text-sm text-gray-500">{order.email}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                <span className="ml-1 capitalize">{order.status}</span>
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            ${order.total.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                {new Date(order.orderDate).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="text-red-600 hover:text-red-900 mr-3"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="processing">Processing</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Order Details Modal */}
                {selectedOrder && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold text-gray-900">Order Details - {selectedOrder.id}</h2>
                                    <button
                                        onClick={() => setSelectedOrder(null)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <XCircle className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Customer Information */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                                            <User className="w-5 h-5 mr-2" />
                                            Customer Information
                                        </h3>
                                        <div className="space-y-2">
                                            <p><span className="font-medium">Name:</span> {selectedOrder.customerName}</p>
                                            <p><span className="font-medium">Email:</span> {selectedOrder.email}</p>
                                            <p><span className="font-medium">Phone:</span> {selectedOrder.phone}</p>
                                        </div>
                                    </div>

                                    {/* Order Information */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                                            <Package className="w-5 h-5 mr-2" />
                                            Order Information
                                        </h3>
                                        <div className="space-y-2">
                                            <p><span className="font-medium">Order Date:</span> {new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
                                            <p><span className="font-medium">Status:</span>
                                                <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                                                    {getStatusIcon(selectedOrder.status)}
                                                    <span className="ml-1 capitalize">{selectedOrder.status}</span>
                                                </span>
                                            </p>
                                            <p><span className="font-medium">Total:</span> ${selectedOrder.total.toFixed(2)}</p>
                                        </div>
                                    </div>

                                    {/* Shipping Address */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                                            <MapPin className="w-5 h-5 mr-2" />
                                            Shipping Address
                                        </h3>
                                        <div className="space-y-1">
                                            <p>{selectedOrder.shippingAddress.street}</p>
                                            <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zip}</p>
                                            <p>{selectedOrder.shippingAddress.country}</p>
                                        </div>
                                    </div>

                                    {/* Payment Information */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                                            <CreditCard className="w-5 h-5 mr-2" />
                                            Payment Information
                                        </h3>
                                        <p><span className="font-medium">Method:</span> {selectedOrder.paymentMethod}</p>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="mt-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">Order Items</h3>
                                    <div className="bg-gray-50 rounded-lg overflow-hidden">
                                        <table className="min-w-full">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Item</th>
                                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Quantity</th>
                                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {selectedOrder.items.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="px-4 py-2 text-sm text-gray-900">{item.name}</td>
                                                        <td className="px-4 py-2 text-sm text-gray-900">{item.quantity}</td>
                                                        <td className="px-4 py-2 text-sm text-gray-900">${item.price.toFixed(2)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button
                                        onClick={() => setSelectedOrder(null)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminOrders;