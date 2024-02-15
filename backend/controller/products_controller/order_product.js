import helper from "../../helper/helper.js";
import Order_Product_model from "../../model/Order_product/order_products.js";
import User_model from "../../model/user_model/user.js";
import Jwt from "jsonwebtoken";
import sha256Data from "crypto-js/sha256.js";
import users from "../../model/user_model/user.js";
import mongoose from "mongoose";
import product from "../../model/Product_model/product.js";
import axios from "axios";

const order_place_data = async (req, res) => {
  try {
    const { orderID, Address, Final_price } = req.body;
    const authHader = req.headers.authorization;
    const token = authHader.split(" ")[1];
    const verif = await Jwt.verify(token, process.env.SCRET_KEY);
    const admindata = await users.findOne({ _id: verif._id });

    const orderIDArray = JSON.parse(orderID);
    const addressObject = JSON.parse(Address);
    let Package_date;
    let Shipped_date;
    let Out_for_Delivery_date;
    let Delivered_date;

    orderIDArray.forEach((val) => {
      const quantity = val.Qty;

      if (quantity >= 1 && quantity <= 2) {
        Package_date = new Date();
        Shipped_date = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000);
        Out_for_Delivery_date = new Date(
          new Date().getTime() + 4 * 24 * 60 * 60 * 1000
        );
        Delivered_date = new Date(
          new Date().getTime() + 5 * 24 * 60 * 60 * 1000
        );
      } else if (quantity >= 3 && quantity <= 4) {
        Package_date = new Date();
        Shipped_date = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000);
        Out_for_Delivery_date = new Date(
          new Date().getTime() + 4 * 24 * 60 * 60 * 1000
        );
        Delivered_date = new Date(
          new Date().getTime() + 6 * 24 * 60 * 60 * 1000
        );
      } else if (quantity >= 5 && quantity <= 10) {
        Package_date = new Date();
        Shipped_date = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000);
        Out_for_Delivery_date = new Date(
          new Date().getTime() + 6 * 24 * 60 * 60 * 1000
        );
        Delivered_date = new Date(
          new Date().getTime() + 10 * 24 * 60 * 60 * 1000
        );
      }

      val.Package_date = Package_date;
      val.Shipped_date = Shipped_date;
      val.Out_for_Delivery_date = Out_for_Delivery_date;
      val.Delivered_date = Delivered_date;
    });

    const newOrder = new Order_Product_model({
      userID: admindata._id,
      orderID: orderIDArray,
      address: addressObject,
      finalPrice: parseFloat(Final_price),
    });

    await newOrder.save();
    if (newOrder) {
      res.send(await helper.successResponse("Order Place Successfuly...."));
    }
  } catch (error) {
    console.log(error);
  }
};

const MyOrder_Data = async (req, res) => {
  try {
    const authHader = req.headers.authorization;
    const token = authHader.split(" ")[1];
    const verif = await Jwt.verify(token, process.env.SCRET_KEY);
    const admindata = await User_model.findOne({ _id: verif._id });

    const GetData = await Order_Product_model.aggregate([
      {
        $match: { userID: new mongoose.Types.ObjectId(admindata._id) },
      },
      {
        $unwind: "$orderID",
      },
      {
        $lookup: {
          from: "users",
          localField: "userID",
          foreignField: "_id",
          as: "userID",
        },
      },
      {
        $unwind: "$userID",
      },
    ]);

    if (GetData.length != 0) {
      res.send(helper.findsuccess("Data found", GetData));
    } else {
      res.send(helper.findError("Data Not found", GetData));
    }
  } catch (error) {
    console.log(error);
  }
};

const GetMyOrder_Data = async (req, res) => {
  try {
    const OrderProduct = await Order_Product_model.aggregate([
      {
        $unwind: "$orderID",
      },
      {
        $match: {
          "orderID._id": req.params.id,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userID",
          foreignField: "_id",
          as: "userID",
        },
      },
      {
        $unwind: "$userID",
      },
    ]);

    if (OrderProduct.length !== 0) {
      res.send(helper.findsuccess("Data found", OrderProduct));
    } else {
      res.send(helper.findError("Data Not found"));
    }
  } catch (error) {
    console.log(error);
  }
};

const Order_cancle = async (req, res) => {
  try {
    const orderIDToRemove = req.body.id;

    const updatedOrders = await Order_Product_model.findOneAndUpdate(
      { "orderID._id": orderIDToRemove },
      { $pull: { orderID: { _id: orderIDToRemove } } },
      { new: true }
    );
    if (updatedOrders) {
      res.send(await helper.successResponse("order Cancle...."));
    } else {
      res.send(await helper.ErrorResponse(" ID Not Found...."));
    }
  } catch (error) {
    console.log();
  }
};

const Search_order = async (req, res) => {
  try {
    const { product_name } = req.body;
    console.log("product_name", product_name);
    const OrderProduct = await Order_Product_model.aggregate([
      {
        $unwind: "$orderID",
      },
      {
        $match: {
          "orderID.Product_name": product_name
            ? { $regex: new RegExp(product_name, "i") }
            : { $exists: true },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userID",
          foreignField: "_id",
          as: "userID",
        },
      },
      {
        $unwind: "$userID",
      },
    ]);

    if (OrderProduct.length !== 0) {
      res.send(helper.findsuccess("Data found", OrderProduct));
    } else {
      res.send(helper.findError("Data Not found"));
    }
  } catch (error) {
    console.log(error);
  }
};

const order_payment = async (req, res) => {
  try {
    const data = {
      merchantId: "PGTESTPAYUAT",
      merchantTransactionId: "MT7850590068188104",
      merchantUserId: req.body.MUID,
      amount: req.body.amount * 100,
      redirectUrl: "http://localhost:3000/api/status/payment-success",
      redirectMode: "POST",
      mobileNumber: "9999999999",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const payloadData = JSON.stringify(data);
    const PayloadMain = Buffer.from(payloadData).toString("base64");
    const keyIndex = 1;
    const String =
      PayloadMain + "/pg/v1/pay" + "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
    const sha256 = sha256Data(String);
    const checksum = sha256 + "###" + keyIndex;

    const UAT_PAY_API_URL =
      "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
    const response = await axios.post(
      UAT_PAY_API_URL,
      {
        request: PayloadMain,
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
        },
      }
    );

    const redirect = response.data.data.instrumentResponse.redirectInfo.url;
    res.send(redirect);
  } catch (error) {
    console.log(error);
  }
};

export default {
  order_place_data,
  GetMyOrder_Data,
  MyOrder_Data,
  Order_cancle,
  Search_order,
  order_payment,
};
