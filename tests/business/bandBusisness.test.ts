import { BandBusiness } from '../../src/business/BandBusiness'
import { BandDatabase } from '../../src/data/BandDatabase'
import { Authenticator } from '../../src/services/Authenticator'
import { BandDatabaseMock } from '../mocks/BandDatabaseMock'
import { bandMock } from '../mocks/bandMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'

const bandBusiness = new BandBusiness(
    new IdGeneratorMock(),
    new Authenticator(),
    new BandDatabaseMock() as BandDatabase
)

describe('Testing BandBusiness create band', () => {

    test('Testing creating a band with a missing input, like name', async () => {
        expect.assertions(2)
        try {
            await bandBusiness.createBand({ name: '', musicGenre: 'rock', responsible: 'João' }, 'valid_token')
        } catch (error: any) {
            expect(error.message).toEqual('Missing input')
            expect(error.statusCode).toBe(422)
        }
    })
})