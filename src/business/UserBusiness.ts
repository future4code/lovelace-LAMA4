import { UserInputDTO, LoginInputDTO, User } from "../model/User"
import { UserDatabase } from "../data/UserDatabase"
import { IdGenerator } from "../services/IdGenerator"
import { HashManager } from "../services/HashManager"
import { Authenticator } from "../services/Authenticator"
import { CustomError } from "../error/BaseError"

export class UserBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private userDatabase: UserDatabase,
        private authenticator: Authenticator
    ) { }

    public async signUp(user: UserInputDTO): Promise<string> {

        if (!user.name || !user.email || !user.password || !user.role) {
            throw new CustomError("Missing input", 422)
        }

        if (user.email.indexOf("@") === -1) {
            throw new CustomError("Invalid email", 422)
        }

        if (user.password.length < 6) {
            throw new CustomError("Invalid password", 422)
        }

        const id = this.idGenerator.generate()

        const hashPassword = await this.hashManager.hash(user.password)

        await this.userDatabase.createUser(
            id,
            user.email,
            user.name,
            hashPassword,
            User.stringToUserRole(user.role)
        )

        const accessToken = this.authenticator.generateToken({ id, role: user.role })

        return accessToken
    }

    public async login(user: LoginInputDTO): Promise<string> {

        const userFromDB = await this.userDatabase.getUserByEmail(user.email)

        if (!userFromDB) {
            throw new CustomError('Invalid credentials', 401)
        }

        const hashCompare = await this.hashManager.compare(user.password, userFromDB.getPassword())

        if (!hashCompare) {
            throw new CustomError("Invalid credentials", 401)
        }
            
        const accessToken = this.authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() })

        return accessToken
    }
}