//backend/src/controllers/employees_controller.ts

import { EmployeeModel } from "../models/employee_models";
import type {Request, Response} from "express";

export class EmployeesController {
    constructor(private employeeModel: EmployeeModel){}

    list = (req: Request, res: Response) => {
        const employees = this.employeeModel.getEmployees();
        res.json(employees);
    };

    create = (req: Request, res: Response) => {
        const {name, email} = req.body;
        const employee = this.employeeModel.addEmployee({name, email});

        res.status(201).json(employee);
    };

    remove = (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const success = this.employeeModel.removeEmployee(id);

        if(!success) {
            return res.status(404).json({error:"Employee not found"});
        }

        return res.status(204).send();
    }
}
