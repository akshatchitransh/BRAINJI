import express from "express";
import { signup } from "../controllers/auth.controller.js";
import { signin } from "../controllers/auth.controller.js";
import { authmiddleware } from "../middleware/auth.middleware.js";
import { content } from "../controllers/content.controller.js";
import { getcontent } from "../controllers/content.controller.js";
import { deletecontent } from "../controllers/content.controller.js";
import { sharing } from "../controllers/content.controller.js";
const router = express.Router()
router.post("/signup",signup)
router.get("/signin",signin)
router.post("/content",authmiddleware,content)
router.get("/content",authmiddleware,getcontent)
router.delete("/delete",deletecontent)
router.get("/brain/share",authmiddleware,sharing)

export default router;

//router.get("/signup",existing_doc)

//router.post("/signup",share)
