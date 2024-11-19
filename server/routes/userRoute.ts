import express,{ Router } from "express";
import { UserController } from "../controllers";
const router: Router =express.Router();

const BASE_ROUTE = "/users";

router.get("/get", UserController.check);
//@ts-ignore
router.post("/add_user",UserController.add_user);
//@ts-ignore
router.post("/create_post", UserController.add_post);

const MODULE = {
  BASE_ROUTE,
  router
};


export default MODULE;
