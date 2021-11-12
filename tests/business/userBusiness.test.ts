import { UserBusiness } from "../../src/business/UserBusiness"
import { UserDatabase } from "../../src/data/UserDatabase"
import { Authenticator } from "../../src/services/Authenticator"
import { AuthenticatorMock } from "../mocks/AuthenticatorMock"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"

const userBusiness = new UserBusiness(
    new IdGeneratorMock(),
    new HashManagerMock(),
    new UserDatabaseMock() as UserDatabase,
    new AuthenticatorMock() as Authenticator
)

describe('Testando o cadastro de novos usuários', () => {

    test('Testando missing input com nome vazio', async () => {
        expect.assertions(2)
        try {
            await userBusiness.signUp({ name: '', password: '123456', email: 'email@email.com', role: 'normal' })
        } catch (error: any) {
            expect(error.message).toEqual('Missing input')
            expect(error.statusCode).toBe(422)
        }
    })

    test('Email sem @ deve retornar como inválido', async () => {
        expect.assertions(2)
        try {
            await userBusiness.signUp({ name: 'Caique', password: '123456', email: 'email.email.com', role: 'normal' })
        } catch (error: any) {
            expect(error.message).toEqual('Invalid email')
            expect(error.statusCode).toBe(422)
        }
    })

    test('Senha com menos de 6 caracteres', async () => {
        expect.assertions(2)
        try {
            await userBusiness.signUp({ name: 'Caique', password: '12345', email: 'email@email.com', role: 'normal' })
        } catch (error: any) {
            expect(error.message).toEqual('Invalid password')
            expect(error.statusCode).toBe(422)
        }
    })

    test('User role diferente de "normal" ou "admin"', async () => {
        expect.assertions(2)
        try {
            await userBusiness.signUp({ name: 'Caique', password: '123456', email: 'email@email.com', role: 'guest' })
        } catch (error: any) {
            expect(error.message).toEqual('Invalid user role')
            expect(error.statusCode).toBe(400)
        }
    })

    test('Usuário cadastrado com sucesso', async () => {
        expect.assertions(1)
        try {

            const accessToken = await userBusiness.signUp({ 
                name: 'Caique', 
                password: '123456', 
                email: 'email@email.com', 
                role: 'normal'
            })

            expect(accessToken).toEqual('token_mock')
        } catch (error: any) {
            console.log(error)
        }
    })
})

describe('Testando o login dos usuários', () => {

    test('Email não é encontrado', async () => {
        expect.assertions(2)
        try {
            await userBusiness.login({ email: 'user3@email.com', password: '123456' })
        } catch (error: any) {
            expect(error.message).toEqual('Invalid credentials')
            expect(error.statusCode).toBe(401)
        }
    })

    test('Senha errada', async () => {
        expect.assertions(2)
        try {
            await userBusiness.login({ email: 'user1@email.com', password: '123457' })
        } catch (error: any) {
            expect(error.message).toEqual('Invalid credentials')
            expect(error.statusCode).toBe(401)
        }
    })

    test('Sucesso no login', async () => {
        try {
            const accessToken = await userBusiness.login({ email: 'user1@email.com', password: '123456' })
            expect(accessToken).toEqual('token_mock')
        } catch (error: any) {
            console.log(error)
        }
    })
})