//services/employee_service/src/server.ts

import { initSchema } from "./db/init_schema";
import express from "express";

import { SqliteEmployeeRepo } from "./repos/sqlite/employee_repo_sqlite";
import { EmployeeService } from "./services/employee_services";
import { EmployeesController } from "./controllers/employees_controller";
import {employeeRoutes} from "./routes/employee_routes";

import cors from "cors";

//creating the express app
const app = express();
app.use(express.json());

const PORT = 3002;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

//manually wiring dependencies
const employeeRepo = new SqliteEmployeeRepo();
const employeeService = new EmployeeService(employeeRepo);
const employeesController = new EmployeesController(employeeService);

//initializing the schema with employee information if not already initialized
initSchema();

//routes
app.use("/employees", employeeRoutes(employeesController));

//Begin listening on selected port
app.listen(PORT, () => {
    console.log(`Employee Service Running on: ${PORT}`);
});