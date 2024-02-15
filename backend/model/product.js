// import mongoose from "mongoose";

// const product_schema = new mongoose.Schema({
//     Product_offer: {
//         type: String
//     },
//     Product_name: {
//         type: String
//     },
//     link: {
//         type: String, // Add this line to include the "link" field
//         required: true,
//     },
//     product_image: {
//         type: String,
//     },
//     Product_price: {
//         type: String
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//      Oty: {
//         type: Number, // Assuming Oty is a number, modify the type accordingly
//         default: 0,
//     },
//     like: {
//         type: Boolean, // Assuming Oty is a number, modify the type accordingly
//         default: false,
//     },
//     category: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "products_category"
//     },

// }, { timestamps: true })

// const Product_model = mongoose.model("products", product_schema)
// export default  Product_model

