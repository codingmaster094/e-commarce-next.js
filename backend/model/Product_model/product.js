import mongoose from "mongoose";


// Category Model***********************

const category_schema = new mongoose.Schema({
    main_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Main_categorys"
    },
    category_name: String
})


// Product Model***********************
const product_schema = new mongoose.Schema({
    Product_offer: {
        type: String
    },
    Product_name: {
        type: String
    },
    link: {
        type: String, // Add this line to include the "link" field
        required: true,
    },
    product_image: {
        type: String,
    },
    Product_price: {
        type: String
    },
    description: {
        type: String,
        required: true,
    },
     Oty: {
        type: Number, // Assuming Oty is a number, modify the type accordingly
        default: 0,
    },
    like:{
        type:Boolean,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products_category"
    },
      
}, { timestamps: true })

const Product_model = mongoose.model("products", product_schema)
const category_model = mongoose.model("products_category", category_schema)

export default { 
    Product_model, 
    category_model }