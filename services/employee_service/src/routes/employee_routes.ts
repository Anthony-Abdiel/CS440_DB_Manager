import {Router} from "express";
import type {EmployeesController } from "../controllers/employees_controller";

export function employeeRoutes(controller: EmployeesController) {
    const router = Router();

    router.get("/", controller.list);
    router.post("/", controller.create);
    router.delete("/:id", controller.remove);

    return router;
}
