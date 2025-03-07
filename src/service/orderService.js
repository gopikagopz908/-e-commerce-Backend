import razorpayInstance from "../config/rayzorpay.js";
import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModels.js";
import CustomError from "../utils/customError.js";

export const addOrderService = async (name, address, paymentMethod, userId,items,date,total,phoneNumber,state,pincode) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart || cart.products.length === 0) {
    throw new CustomError(
      "your cart is empty . add items before placing an order"
    );
  }

  //initalize the total


  //create order
console.log(phoneNumber,"in service")
  const order = new Order({
    user: userId,
    items: [],
    date: new Date(),
    name,
    address,
    paymentMethod,
    total,
    phoneNumber,
    state,
    pincode,
  });
 
  for (let item of cart.products) {
    
    const product = await Product.findById(item.product);
    if (!product) {
      throw new CustomError(`insufficient quantity for ${product.name}`);
    }
    
    product.stock -= item.quantity;
    await product.save();

    //calculate the total for this item
    // const itemTotal = product.price * item.quantity;
    // total += itemTotal;
    order.items.push({ productId: item.product, quantity: item.quantity });
  }
  
  if (paymentMethod === "razorpay") {
    const options = {
      amount: total ,
      currency: "INR",
      receipt: `order_receipt_${order._id}`,
      payment_capture: 1,
    };
    
    //create order with rayzorpay
    try {
      const razorpayOrder = await razorpayInstance.orders.create(options);
      order.razorpayOrderId = razorpayOrder.id;
     
      await order.save();
      await Cart.findOneAndDelete({ user: userId });
    } catch (error) {
      console.log(error)
      throw new CustomError("Rayzorpay order creation failed");
    }
  }
  return { order,razorpayOrderId:order.razorpayOrderId };
  // console.log(`hii`)
  //now that total is calculated,save the order withthe correct total
  // order.total = total;
  // await order.save();
  // //clear the cart

  // cart.products = [];
  // await cart.save();
};
export const verifyPaymentService = async (paymentId, razorpayOrderId) => {
  const order = await Order.findOne({ razorpayOrderId });
  if (!order || order.razorpayOrderId != razorpayOrderId) {
    throw new CustomError("order is not found", 400);
  }
  try {
    const paymentDetails = await razorpayInstance.payments.fetch(paymentId);
    if (paymentDetails.status === "captured") {
      order.razorpayPaymentStatus = "paid";
      order.status = "placed";
      await order.save();

      return true;
    } else {
      throw new CustomError("Payment verification failed");
    }
  } catch (error) {
    console.error("Error during payment verification:", error);
    throw new CustomError("Payment verification failed", 500);
  }
};

export const showOrderService = async (userId, page = 1, limit = 10) => {
  if (!userId) {
    throw new CustomError("user ID is required to fetch orders");
  }

  const skip = (page - 1) * limit;
  const orders = await Order.find({ user: userId })
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit)
    .populate({
      path: "items.productId",
      model: "product",
    
    });
  if (!orders.length) {
    throw new CustomError("no orders found", 404);
  }
  const totalOrders = await Order.countDocuments({ user: userId }); //get total order count for pagination

  const pagination = {
    currentPage: page,
    totalPages: Math.ceil(totalOrders / limit),
    totalOrders,
  };

  return { orders, pagination };
};
  

