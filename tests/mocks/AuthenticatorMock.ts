
interface AuthenticationData {
    id: string
    role?: string
}
export class AuthenticatorMock {
    public generateToken(input: AuthenticationData,
        expiresIn: string = process.env.ACCESS_TOKEN_EXPIRES_IN!): string {
        return "token_mock"
    }

    // public getData(token: string): AuthenticationData {
    //     return {
    //         id: 'id_mock',
    //         role: 
    //     }
    // }
}