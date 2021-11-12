import { User, UserRole } from "../../src/model/User";

export const normalUserMock = new User(
    'id_user_1',
    'normal_user',
    'user1@email.com',
    '123456',
    UserRole.NORMAL
)

export const adminUserMock = new User(
    'id_user_2',
    'admin_user',
    'user2@email.com',
    '123456',
    UserRole.ADMIN
)