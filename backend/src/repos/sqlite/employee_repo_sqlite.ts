import { db } from "../../db/sqlite";
import type { Employee, EmployeeRepo } from "../employee_repo";

export class SqliteEmployeeRepo implements EmployeeRepo {
  addEmployee(input: Omit<Employee, "id">): Employee {
    const stmt = db.query(`
            INSERT INTO employees (name, email) VALUES (?, ?)`);
    const info = stmt.run(input.name, input.email);

    return {
      id: Number(info.lastInsertRowid),
      name: input.name,
      email: input.email,
    };
  }

  removeEmployee(id: number): boolean {
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
