//services/auth_service/src/server.ts

import { initSchema } from "./db/init_schema";
import express from "express";

import { SqliteUserRepo } from "./repos/sqlite/users_repo_sqlite";
import { LoginService } from "./services/login_services";
import { LoginController } from "./controllers/login_controller";
import { loginRoutes } from "./routes/login_routes";

import cors from "cors";

//creating the express app
const app = express();
app.use(express.json());

const PORT = 3001;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

//manually wiring dependencies
const userRepo = new SqliteUserRepo();
const loginService = new LoginService(userRepo);
const loginController = new LoginController(loginService);

//initializing the schema with user information if not already initialized
initSchema();

//routes
app.use("/login", loginRoutes(loginController));

//Begin listening on selected port
app.listen(PORT, () => {
    console.log(`Auth Service Running on: ${PORT}`);
});