export type Employee = {
    id: number;
    name: string;
    email: string;
};

export interface EmployeeRepo {
    addEmployee(input: Omit<Employee, "id">) : Employee;
    removeEmployee(id: number):boolean;
    getEmployees():Employee[];
}