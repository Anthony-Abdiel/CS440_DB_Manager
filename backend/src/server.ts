//backend/src/server.ts

import { initSchema } from "./db/initSchema";
import express from "express";

import { EmployeesController } from "./controllers/employees_controller";
import {employeeRoutes} from "./routes/employee_routes";

import { LoginController } from "./controllers/login_controller";
import { loginRoutes } from "./routes/login_routes";

import { EmployeeModel } from "./models/employee_models";
import { UserModel } from "./models/user_model";

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
const employeeModel = new EmployeeModel();
const userModel = new UserModel();

const loginController = new LoginController(userModel);
const employeesController = new EmployeesController(employeeModel);

//setting up the database with the Users and Employees tables
initSchema();

//routes
app.use("/employees", employeeRoutes(employeesController));
app.use("/login", loginRoutes(loginController));

//Begin listening on selected port
app.listen(PORT, () => {
    console.log(`Server Running on: ${PORT}`);
});