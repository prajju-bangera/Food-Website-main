import {Router} from 'express'
import {userLogin, userRegister} from "../controllers/userController.js"
import {storeAmount} from "../controllers/orderController.js"
import {submitFeedback} from "../controllers/feedbackController.js"
const authRouter = Router()

authRouter.post("/login", userLogin)
authRouter.post("/register", userRegister)
authRouter.post("/order", storeAmount)
authRouter.post("/feedback", submitFeedback)
// authRouter.get("/fetchuser", userFetch)

export default authRouter


