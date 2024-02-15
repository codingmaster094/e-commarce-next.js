import mongoose from "mongoose";

const Order_product_schema = new mongoose.Schema({
    orderID: {
        type: Array 
      },
      userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      },
      address: {
        type: {
          name: String,
          street_no: String,
          contry_name: String,
          city_name: String,
          state: String,
          pinCode: String,
          mobile_no: String,
        },
        required: true,
      },
      finalPrice: {
        type: Number,
        required: true,
      },
      Package_date:{
        type:Date
      },
      Shipped_date:{
        type:Date
      },
      Out_for_Delivery_date:{
        type:Date
      },
      Delivered_date:{
        type:Date
      }

}, { timestamps: true })

const Order_Product_model = mongoose.model("order_place", Order_product_schema)

export default Order_Product_model
