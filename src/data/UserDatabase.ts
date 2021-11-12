import { BaseDatabase } from "./BaseDatabase"
import { User } from "../model/User"

export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME = "lama_users"

  public async createUser(user: User): Promise<void> {
    await this.getConnection()
      .insert(user)
      .into(UserDatabase.TABLE_NAME)
  }

  public async getUserByEmail(email: string): Promise<User> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email })

    return User.toUserModel(result[0])

  }
}