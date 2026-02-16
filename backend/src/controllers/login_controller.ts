import { LoginService } from "../services/login_services";
import type {Request, Response} from  "express";


export class LoginController {
    constructor(private loginService: LoginService){}

    validate = (req: Request, res: Response) => {
        const {username, password} = req.body;

        if(!username  || !password ) {
            return res.status(401).json({error: "Missing Credentials!"});
        }

        const valid = this.loginService.validateCredentials(username, password);

        if(!valid) {
            return res.status(401).json({ok: false});
        }

        return res.status(200).json({ok: true});
    }
}