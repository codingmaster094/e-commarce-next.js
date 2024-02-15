
import router from "express"
import UserRoute  from "./user_route/userRoute.js"
import productsRoute  from "./products_route/productsRoute.js"
const route = router.Router()

route.use('/user' , UserRoute)
route.use('/products' , productsRoute)

export default route