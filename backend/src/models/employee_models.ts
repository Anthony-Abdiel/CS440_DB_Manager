//backend/src/models/employee_models.ts

import { db } from "../db/sqlite";

export class EmployeeModel {
  addEmployee(input: Omit<Employee, "id">): Employee {

    //validate name and email
    if(!input.name?.trim()) {
        throw new Error("Name is required");
    }
    if(!input.email?.trim()) {
        throw new Error("Email is required");
    }

    const stmt = db.query(`
            INSERT INTO employees (name, email) VALUES (?, ?)`);
    const info = stmt.run(input.name.trim(), input.email.trim().toLowerCase());

    return {
      id: Number(info.lastInsertRowid),
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
    };
  }

  removeEmployee(id: number): boolean {
    //validate proper Id
    if(!Number.isInteger(id) || id <= 0) {
        throw new Error("Invalid employee id");
    }

    const stmt = db.query(`
            DELETE FROM employees WHERE id = ?`);
    const info = stmt.run(id);

    return info.changes > 0;
  }

  getEmployees(): Employee[] {
    const stmt = db.query(`
            SELECT * FROM employees`);
    const rows = stmt.all() as Employee[];

    return rows;
  }
}

export type Employee = {
    id: number;
    name: string;
    email: string;
};
