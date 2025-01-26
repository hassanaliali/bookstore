const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Reference to the Product model
    required: [true, "Product ID is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [1, "Quantity must be at least 1"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"],
  },
});

const cartSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: [true, "User ID is required"],
      unique: true, // Ensure one cart per user
    },
    items: [cartItemSchema], // Array of cart items
    total: {
      type: Number,
      default: 0, // Default total is 0
      min: [0, "Total cannot be negative"],
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Calculate total before saving
cartSchema.pre("save", function (next) {
  this.total = this.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  next();
});

// Create the Cart model
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
