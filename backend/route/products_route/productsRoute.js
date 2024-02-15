import express from 'express'
const router = express.Router()
import ProductsController from '../../controller/products_controller/products.js'
import order_product from '../../controller/products_controller/order_product.js'
import Authentication from '../../middleWare/Auth.js'

 router
.post("/man/get/category",ProductsController.man_Get_category)
.post("/WOman/get/category",ProductsController.WOman_Get_category)
.post("/Electroninc/get/category",ProductsController.Electroninc_category)

.post("/categoryId/products/:id",ProductsController.categoryIDWithProduct)
.post("/create/products",ProductsController.create_products)
.post("/get/products",ProductsController.Getproducts)
.post("/get/id/products/:id",ProductsController.getData_ID)
.post("/update/products/:id",ProductsController.update_Data_ID)
.post("/delete/products",ProductsController.delete_product)
.post("/search/products",ProductsController.Search_products)
.post("/get/products/brand/:id",ProductsController.getbrand)


.post("/order/place/products",order_product.order_place_data)
.post("/order/payment",order_product.order_payment)
.post("/My/order/products",order_product.MyOrder_Data)
.post("/Get/My/order/products/:id",order_product.GetMyOrder_Data)
.post("/cancle/order/products",order_product.Order_cancle)
.post("/Search/order/products",order_product.Search_order)


export default router