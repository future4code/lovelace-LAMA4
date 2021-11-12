import { BandDatabase } from "../data/BandDatabase";
import { CustomError } from "../error/BaseError";
import { BandInputDTO } from "../model/Band";
import { UserRole } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class BandBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private bandDatabase: BandDatabase
        ){}

    public async createBand(band: BandInputDTO, token: string): Promise<void> {

        if (!band.name || !band.musicGenre || !band.responsible) {
            throw new CustomError("Missing input", 422)
        }

        const tokenData = this.authenticator.getData(token)

        if (tokenData.role !== UserRole.ADMIN) {
            throw new CustomError('You must be an admin to add a band', 403)
        }

        const id = this.idGenerator.generate()

        await this.bandDatabase.createBand(
            id,
            band.name,
            band.musicGenre,
            band.responsible
        )
    }



}