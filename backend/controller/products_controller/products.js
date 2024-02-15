import mongoose from "mongoose";
import products from "../../model/Product_model/product.js";
import helper from "../../helper/helper.js";
import { readFile } from 'fs/promises';
import { join } from 'path';
import fs from 'fs/promises';

const man_Get_category = async (req, res) => {
    try {
        const GetData = await products.category_model.find({ main_category: new mongoose.Types.ObjectId("6583d636bfeb0fec0768b38c") })
        if (GetData.length != 0) {
            res.send(helper.findsuccess("Data found", GetData))
        } else {
            res.send(helper.findError("Data Not found", GetData))
        }
    } catch (error) {
        console.log(error)
    }
}

const WOman_Get_category = async (req, res) => {
    try {
        const GetData = await products.category_model.find({ main_category: new mongoose.Types.ObjectId("6583d661bfeb0fec0768b38d") })
        if (GetData.length != 0) {
            res.send(helper.findsuccess("Data found", GetData))
        } else {
            res.send(helper.findError("Data Not found", GetData))
        }
    } catch (error) {
        console.log(error)
    }
}

const Electroninc_category = async (req, res) => {
    try {
        const GetData = await products.category_model.find({ main_category: new mongoose.Types.ObjectId("658548a829fd0925ff549506") })
        if (GetData.length != 0) {
            res.send(helper.findsuccess("Data found", GetData))
        } else {
            res.send(helper.findError("Data Not found", GetData))
        }
    } catch (error) {
        console.log(error)
    }
}

const categoryIDWithProduct = async (req, res) => {
    try {
        const GetData = await products.Product_model.aggregate([
            {
                $match: { category: new mongoose.Types.ObjectId(req.params.id) }
            },
            {
                $lookup: {
                    from: "products_categories",
                    localField: "category",
                    foreignField: "_id",
                    pipeline: [{ $project: { _id: 1, category_name: 1 } }],
                    as: "category"
                }
            },
            {
                $unwind: "$category"
            }
        ])
        if (GetData.length != 0) {
            res.send(helper.findsuccess("Data found", GetData))
        } else {
            res.send(helper.findError("Data Not found", GetData))
        }
    } catch (error) {
        console.log(error)
    }
}

// jeans complate ===
// const filePath = join('men-watch.json');
// const data = await readFile(filePath, 'utf8');
// const productData = JSON.parse(data);

const create_products = async (req, res) => {
    try {
        //     let Result
        //     await Promise.all(productData.map(async (val) => {
        //         if (typeof val.product_image !== 'string') {
        //             console.error(`Invalid product_image value: ${val.product_image}`);
        //             return;
        //         }

        //         Result = await products.Product_model.create({
        //             Product_name: val.Product_name,
        //             Product_price: val.Product_price,
        //             Product_offer: val.Product_offer,
        //             description: val.description,
        //             category: "658910fb5b9958a1aef5c48a",
        //             product_image: val.product_image,
        //             link:val.link
        //     });

        //     console.log('Result', Result)
        //   })).then((respnse)=>{
        //     res.send(Result)
        //     return
        //   });


        const { Product_name, Product_price, Product_offer, description, category } = req.body
        const { products_image } = req.files
        let url

        const filename = Date.now() + "_" + products_image.name;
        const file = products_image;
        url = process.env.link + "Upload/products_image/" + filename;
        file.mv("public/Upload/products_image/" + filename, async (err) => {
            if (err) {
                console.log(err)
            }
        });

        const created = await products.Product_model.create({
            Product_name: Product_name,
            Product_price: Product_price,
            Product_offer: Product_offer,
            description: description,
            category: category,
            product_image: url
        })

        if (created) {
            res.send(await helper.successResponse("product created...."))
        } else {
            res.send(await helper.ErrorResponse("somthing went wrong...."))
        }
    } catch (error) {
        console.log(error)
    }
}

const Getproducts = async (req, res) => {
    try {

        const GetData = await products.Product_model.aggregate([
            {
                $lookup: {
                    from: "products_categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $unwind: "$category"
            }
        ])
        if (GetData.length != 0) {
            res.send(helper.findsuccess("Data found", GetData))
        } else {
            res.send(helper.findError("Data Not found", GetData))
        }
    } catch (error) {
        console.log(error)
    }
}

const getData_ID = async (req, res) => {
    try {
        const GetData = await products.Product_model.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(req.params.id) }
            },
            {
                $lookup: {
                    from: "products_categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $unwind: "$category"
            }
        ])

        if (GetData.length != 0) {
            res.send(helper.findsuccess("Data found", GetData))
        } else {
            res.send(helper.findError("Data Not found", GetData))
        }

    } catch (error) {
        console.log(error)
    }
}

const update_Data_ID = async (req, res) => {
    try {

        const { Product_name, Product_price, Product_offer, description, category, like } = req.body
        let url

        if (req.files) {
            const { products_image } = req.files
            const filename = Date.now() + "_" + products_image.name;
            const file = products_image;
            url = process.env.link + "Upload/products_image/" + filename;
            file.mv("public/Upload/products_image/" + filename, async (err) => {
                if (err) {
                    console.log(err)
                }
            });
        }

        const updateData = {
            Product_name: Product_name,
            Product_price: Product_price,
            Product_offer: Product_offer,
            category: category,
            description: description,
            product_image: url,
            like: like
        }

        const result = await products.Product_model.findByIdAndUpdate({ _id: req.params.id }, updateData, { new: true })
        if (result) {
            res.send(helper.successResponse("Data Updated..."))
        } else {
            res.send(helper.ErrorResponse("ID not found"))
        }
    } catch (error) {
        console.log(error)
    }
}

const delete_product = async (req, res) => {
    try {
        const delete_data = await products.Product_model.findByIdAndDelete(req.body.id)
        if (delete_data) {
            res.send(await helper.successResponse("product Deleted...."))
        } else {
            res.send(await helper.ErrorResponse(" ID Not Found...."))
        }
    } catch (error) {
        console.log(error)
    }
}



const Search_products = async (req, res) => {
    try {
        let GetData
        const { main_id, product_name } = req.body;
        const productPrice = parseFloat(req.body.Product_range);
        if(!isNaN(productPrice)){
             GetData = await products.Product_model.aggregate([
                {
                    $lookup: {
                        from: "products_categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category",
                    }
                },
                {
                    $unwind: "$category"
                },
                {
                    $match: {
                        "category._id": main_id ? new mongoose.Types.ObjectId(main_id) : { $exists: true },
                         "Product_name": product_name ? { $regex: new RegExp(product_name, "i") } : { $exists: true },
                    }
                },
                {
                    $addFields: {
                        numericPrice: {
                            $toDouble: {
                                $trim: {
                                    input: {
                                        $replaceAll: {
                                            input: {
                                                $replaceAll: {
                                                    input: "$Product_price",
                                                    find: "₹",
                                                    replacement: ""
                                                }
                                            },
                                            find: ",",
                                            replacement: ""
                                        }
                                    },
                                    chars: " "
                                }
                            }
                        }
                    }
                },
                {
                    
                    $match: {
                        "numericPrice": {
                            $lte: productPrice
                        }
                    }
                }
            ]);
        }else{
            GetData = await products.Product_model.aggregate([
                {
                    $lookup: {
                        from: "products_categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category",
                    }
                },
                {
                    $unwind: "$category"
                },
                {
                    $match: {
                        "category._id": main_id ? new mongoose.Types.ObjectId(main_id) : { $exists: true },
                         "Product_name": product_name ? { $regex: new RegExp(product_name, "i") } : { $exists: true },
                    }
                },
            ]);
        }

        
 
        if (GetData.length !== 0) {
            res.send(helper.findsuccess("Data found", GetData))
        } else {
            res.send(helper.findError("Data Not found", GetData))
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};


const getbrand = async (req, res) => {
    try {
        const maxWords = 10;
        const GetData = await products.Product_model.aggregate([
            {
                $match: { category: new mongoose.Types.ObjectId(req.params.id) }
            },
            {
                $lookup: {
                    from: "products_categories",
                    localField: "category",
                    foreignField: "_id",
                    pipeline: [{ $project: { _id: 1, category_name: 1 } }],
                    as: "category"
                }
            },
            {
                $unwind: "$category"
            }
        ])
        const uniqueProducts = [];
        const encounteredNames = new Set();
        for (const product of GetData) {
            if (!encounteredNames.has(product.Product_name)) {
                uniqueProducts.push(product);
                encounteredNames.add(product.Product_name);
            }
        }

        if (GetData.length != 0) {
            res.send(helper.findsuccess("Data found", uniqueProducts))
        } else {
            res.send(helper.findError("Data Not found", GetData))
        }
    } catch (error) {
        console.log(error)
    }
}

export default {
    man_Get_category,
    WOman_Get_category,
    Electroninc_category,
    categoryIDWithProduct,
    create_products,
    Getproducts,
    getData_ID,
    update_Data_ID,
    delete_product,
    Search_products,
    getbrand
}