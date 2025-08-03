import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    // Customer Information
    customerName: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    // Order Details
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    // Order Status
    status: {
      type: String,
      required: true,
      enum: [
        "Pending",
        "Approved",
        "Rejected",
        "Processing",
        "Shipped",
        "Delivered",
      ],
      default: "Pending",
    },

    // Optional fields for business requirements
    businessType: {
      type: String,
      enum: ["Retailer", "Distributor", "Gym", "Online Store", "Other"],
    },

    notes: {
      type: String,
      default: "",
    },

    // Order tracking
    orderNumber: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

// Generate order number before saving
orderSchema.pre("save", async function (next) {
  if (this.isNew && !this.orderNumber) {
    const count = await mongoose.model("Order").countDocuments();
    this.orderNumber = `B2B-${Date.now()}-${String(count + 1).padStart(
      4,
      "0"
    )}`;
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
