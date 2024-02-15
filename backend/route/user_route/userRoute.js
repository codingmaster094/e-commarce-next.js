import express from 'express'
const router = express.Router()
import UserController from '../../controller/user_controller/user.controll.js'
import Authentication from '../../middleWare/Auth.js'

router.post("/create/user",UserController.create_user)
router.post("/login/user",UserController.login_user)
router.post("/get/user",UserController.get_user)
router.post("/Change/password" , UserController.Change_password)                                                                   
router.post("/forgot/password" , UserController.forgot_password)                                                     
router.post("/reset/password/:id/:token" , UserController.reset_password)                                               
router.post("/account/logout" ,Authentication , UserController.logout) 

export default router