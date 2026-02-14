import type {Employee, EmployeeRepo} from "../repos/employee_repo";

export type CreateEmployeeInput = Omit<Employee, "id">;

export class EmployeeService {
    constructor(private repo: EmployeeRepo) {}

    addEmployee(input: CreateEmployeeInput): Employee {
        //validate name and email
        if(!input.name?.trim()) {
            throw new Error("Name is required");
        }
        if(!input.email?.trim()) {
            throw new Error("Email is required");
        }

        return this.repo.addEmployee({
            name: input.name.trim(),
            email: input.email.trim().toLowerCase(),
        })
    }

    removeEmployee(id: number): boolean {
        //validate proper Id
        if(!Number.isInteger(id) || id <= 0) {
            throw new Error("Invalid employee id");
        }

        return this.repo.removeEmployee(id);
    }

    getEmployees():Employee[]{
        return this.repo.getEmployees();
    }
}