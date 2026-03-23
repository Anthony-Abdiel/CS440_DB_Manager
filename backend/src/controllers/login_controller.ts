//backend/src/controllers/login_controller.ts

import { UserModel } from "../models/user_model";
import type {Request, Response} from  "express";


export class LoginController {
    constructor(private userModel: UserModel){}

    validate = (req: Request, res: Response) => {
        const {username, password} = req.body;

        if(!username  || !password ) {
            return res.status(401).json({error: "Missing Credentials!"});
        }

        const valid = this.userModel.validateCredentials(username, password);

        if(!valid) {
            return res.status(401).json({ok: false});
        }

        return res.status(200).json({ok: true});
    }
}