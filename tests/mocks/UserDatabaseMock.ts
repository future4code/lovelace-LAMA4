import { User } from "../../src/model/User";
import { adminUserMock, normalUserMock } from "./userMock";

export class UserDatabaseMock {
    public async createUser(user: User): Promise<void> {
    }

    public async getUserByEmail(email: string): Promise<User | undefined> {
        switch (email) {
            case "user1@email.com":
                return normalUserMock
            case "user2@email.com":
                return adminUserMock
            default:
                return undefined
        }
    }
}