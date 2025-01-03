import {Router} from 'express'
import {userLogin, userRegister} from "../controllers/userController.js"
import {storeAmount} from "../controllers/orderController.js"
const authRouter = Router()

authRouter.post("/login", userLogin)
authRouter.post("/register", userRegister)
authRouter.post("/order", storeAmount)
// authRouter.get("/fetchuser", userFetch)

export default authRouter


