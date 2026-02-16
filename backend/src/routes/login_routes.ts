import {Router} from "express";
import type {LoginController} from "../controllers/login_controller";

export function loginRoutes(controller: LoginController) {
    const router = Router();

    router.post("/", controller.validate);
    
    return router;
}
