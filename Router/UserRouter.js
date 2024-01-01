import { Router } from "express";
import { createUser, getAllUser, getOneUser, login } from "../Controllers/userController.js";
import { decodeToken } from "../middlewares/security/JWT.js";
const router = Router()

router.post('/new',createUser)
router.post('/login',login)
router.get('/one/:id',getOneUser)
router.get('/all',decodeToken,getAllUser)

export default router