import { EmployeeService } from "../services/employee_services";
import type {Request, Response} from "express";

export class EmployeesController {
    constructor(private employeeService: EmployeeService){}

    list = (req: Request, res: Response) => {
        const employees = this.employeeService.getEmployees();
        res.json(employees);
    };

    create = (req: Request, res: Response) => {
        const {name, email} = req.body;
        const employee = this.employeeService.addEmployee({name, email});

        res.status(201).json(employee);
    };

    remove = (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const success = this.employeeService.removeEmployee(id);

        if(!success) {
            return res.status(404).json({error:"Employee not found"});
        }

        return res.status(204).send();
    }
}
