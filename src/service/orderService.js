
import Cart from '../models/cartModel.js'
import Order from '../models/orderModel.js'
import Product from '../models/productModels.js'
import CustomError from '../utils/customError.js'

export const addOrderService=async(name,address,paymentMethod,userId)=>{
    const cart=await Cart.findOne({user:userId})

    if(!cart||cart.products.length===0){
        throw new CustomError("your cart is empty.add items before placing an order")

    }
//initalize the total 

let total=0;

//create order

const order=new Order({
    user:userId,
    items:[],
    date:new Date(),
    name,
    address,
    paymentMethod,
    total
})
for(let item of cart.products){
    const product=await Product.findById(item.product)
    if(!product){
        throw new CustomError(`insufficient quantity for ${product.name}`)

    }
    product.quantity-=item.quantity;
    await product.save()

    //calculate the total for this item
    const itemTotal=product.price*item.quantity;
    total+=itemTotal;
    order.items.push({productId:item.product,quantity:item.quantity})
}
    //now that total is calculated,save the order withthe correct total
    order.total=total;
    await order.save()
    //clear the cart
    cart.products=[]
    await cart.save()
}

export const showOrderService=async(userId,page=1,limit=10)=>{
    if(!userId){
        throw new CustomError("user ID is required to fetch orders")
    }

    const skip=(page-1)*limit;
    const orders=await Order.find({user:userId})
        .sort({date:-1})
        .skip(skip)
        .limit(limit)
        .populate({
            path:"items.productId",
            model:"product"
        })
        if(!orders.length){
            throw new CustomError("no orders found",404)
        }
        const totalOrders=await Order.countDocuments({user:userId}) //get total order count for pagination
        
    const pagination={
        currentPage:page,
        totalPages:Math.ceil(totalOrders/limit),
        totalOrders
    };

    return {orders,pagination}
        
    } 
