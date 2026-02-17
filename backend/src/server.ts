import { initSchema } from "./db/initSchema";
import express from "express";

import { SqliteEmployeeRepo } from "./repos/sqlite/employee_repo_sqlite";
import { EmployeeService } from "./services/employee_services";
import { EmployeesController } from "./controllers/employees_controller";
import {employeeRoutes} from "./routes/employee_routes";

import { SqliteUserRepo } from "./repos/sqlite/users_repo_sqlite";
import { LoginService } from "./services/login_services";
import { LoginController } from "./controllers/login_controller";
import { loginRoutes } from "./routes/login_routes";

import cors from "cors";

//creating the express app
const app = express();
app.use(express.json());

const PORT = 3000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));


//manually wiring dependencies
const employeeRepo = new SqliteEmployeeRepo();
const employeeService = new EmployeeService(employeeRepo);
const employeesController = new EmployeesController(employeeService);

const userRepo = new SqliteUserRepo();
const loginService = new LoginService(userRepo);
const loginController = new LoginController(loginService);

//setting up the database with the Users and Employees tables
initSchema();

//routes
app.use("/employees", employeeRoutes(employeesController));
app.use("/login", loginRoutes(loginController));

//Begin listening on selected port
app.listen(PORT, () => {
    console.log(`Server Running on: ${PORT}`);
});