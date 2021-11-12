import { Request, Response } from "express"
import { UserInputDTO, LoginInputDTO} from "../model/User"
import { UserBusiness } from "../business/UserBusiness"
import { BaseDatabase } from "../data/BaseDatabase"
import { UserDatabase } from "../data/UserDatabase"
import { IdGenerator } from "../services/IdGenerator"
import { HashManager } from "../services/HashManager"
import { Authenticator } from "../services/Authenticator"

const userBusiness = new UserBusiness(
    new IdGenerator(),
    new HashManager(),
    new UserDatabase(),
    new Authenticator()
)

export class UserController {
    async signup(req: Request, res: Response) {
        try {

            const input: UserInputDTO = {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                role: req.body.role
            }

            const token = await userBusiness.signUp(input);

            res.status(200).send({ token });

        } catch (error: any) {
            res.status(error.statusCode).send({ message: error.sqlMessage || error.message })
        }

        await BaseDatabase.destroyConnection();
    }

    async login(req: Request, res: Response) {

        try {

            const loginData: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            };

            const token = await userBusiness.login(loginData);

            res.status(200).send({ token });

        } catch (error: any) {
            res.status(error.statusCode).send({ message: error.sqlMessage || error.message })
        }

        await BaseDatabase.destroyConnection();
    }

}