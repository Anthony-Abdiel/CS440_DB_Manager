import { initSchema } from "./db/initSchema";
import express from "express";

import { SqliteEmployeeRepo } from "./repos/sqlite/employee_repo_sqlite";
import { EmployeeService } from "./services/employee_services";
import { EmployeesController } from "./controllers/employees_controller";
import {employeeRoutes} from "./routes/employee_routes";

//creating the express app
const app = express();
app.use(express.json());

const PORT = 3000;

//manually wiring dependencies
const employeeRepo = new SqliteEmployeeRepo();
const employeeService = new EmployeeService(employeeRepo);
const employeesController = new EmployeesController(employeeService);


//setting up the database with the Users and Employees tables
initSchema();

//routes
app.use("/employees", employeeRoutes(employeesController));

//Begin listening on selected port
app.listen(PORT, () => {
    console.log(`Serer Running on: ${PORT}`);
});